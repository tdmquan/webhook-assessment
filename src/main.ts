// main.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Webhook, WebhookInput } from './types';
import { storage } from './storage';
import { v4 } from 'uuid';
import { verifyWebhook } from './middlewares/verifyWebhook';
import { webhookSchema } from './validators/webhook.schema';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.post('/webhooks', verifyWebhook, (req: Request, res: Response) => {
    const parseResult = webhookSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            error: 'Invalid webhook payload'
        });
    }

    const input = parseResult.data;
    const id = v4();
    const webhook: Webhook = {
        id,
        source: input.source,
        event: input.event,
        payload: input.payload,
        receivedAt: new Date()
    };
    storage.save(webhook);
    res.json({
        id: webhook.id,
        message: 'Webhook received'
    });
});
app.get('/webhooks', verifyWebhook, (req: Request, res: Response) => {
    const allWebhooks = storage.getAll();
    res.json({
        webhooks: allWebhooks,
        count: allWebhooks.length
    });
});
app.get('/webhooks/:id', verifyWebhook, (req: Request, res: Response) => {
    const id = req.params.id as string;
    const webhook = storage.getById(id);
    if (!webhook) {
        return res.status(404).json({ error: 'Webhook not found' });
    }
    res.json(webhook);
});
app.use((err: Error, req: Request, res: Response, next: any) => {
    console.log('Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
});
app.listen(PORT, () => {
    console.log(`Webhook service running on port ${PORT}`);
});

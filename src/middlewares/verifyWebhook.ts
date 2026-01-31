import { Request, Response, NextFunction } from "express";

export function verifyWebhook(req: Request, res: Response, next: NextFunction) {
    const secret = req.headers['x-webhook-secret'];
    if (typeof secret !== 'string' || secret !== process.env.WEBHOOK_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}
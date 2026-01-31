import { z } from 'zod';

export const webhookSchema = z.object({
    source: z.string().min(1),
    event: z.string().min(1),
    payload: z.unknown()
});

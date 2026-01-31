// types.ts
export interface Webhook {
    id: string;
    source: string;
    event: string;
    payload: unknown;
    receivedAt: Date;
}
export interface WebhookInput {
    source: string;
    event: string;
    payload: unknown;
}
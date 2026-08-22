/** Tipos del webhook de WhatsApp Cloud API (sin lógica). */
export interface WebhookVerificationQuery {
  "hub.mode": string;
  "hub.verify_token": string;
  "hub.challenge": string;
}

export interface WhatsAppIncomingMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: { body: string };
  type: "text" | "image" | "audio" | "interactive" | string;
}

export interface WhatsAppWebhookPayload {
  object: "whatsapp_business_account";
  entry: Array<{
    id: string;
    changes: Array<{
      field: string;
      value: {
        messaging_product: "whatsapp";
        metadata: { display_phone_number: string; phone_number_id: string };
        contacts?: Array<{ profile: { name: string }; wa_id: string }>;
        messages?: WhatsAppIncomingMessage[];
      };
    }>;
  }>;
}

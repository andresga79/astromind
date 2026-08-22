# Integración futura: WhatsApp Cloud API

Estructura y tipos para una futura integración con WhatsApp Cloud API. **Sin lógica activa** — este directorio solo define tipos y documentación.

## Pasos de configuración

1. **Crear app en [Meta for Developers](https://developers.facebook.com/)** (tipo **Business**).
2. **Activar el producto WhatsApp** dentro de la app.
3. **Configurar el webhook** con un *verify token* propio.
4. **Variables de entorno futuras:**
   - `WHATSAPP_VERIFY_TOKEN`
   - `WHATSAPP_ACCESS_TOKEN`
   - `WHATSAPP_PHONE_NUMBER_ID`
5. **Comportamiento del webhook:**
   - El `GET` de verificación responde con `hub.challenge` **solo si** `hub.verify_token` coincide con el valor configurado.
   - El `POST` llega con un `WhatsAppWebhookPayload` (ver `tipos.ts`).
6. **Punto de montaje sugerido:** `app/api/webhooks/whatsapp/route.ts`.

## Tipos

Ver [`tipos.ts`](./tipos.ts):

- `WebhookVerificationQuery` — query params del GET de verificación.
- `WhatsAppIncomingMessage` — mensaje entrante individual.
- `WhatsAppWebhookPayload` — payload completo del POST del webhook.

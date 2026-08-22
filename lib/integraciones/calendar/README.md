# Integración futura: Google Calendar

Estructura y tipos para una futura integración con Google Calendar vía OAuth 2.0. **Sin lógica activa** — este directorio solo define tipos y documentación.

## Pasos de configuración

1. **Crear proyecto en [Google Cloud Console](https://console.cloud.google.com/)** y **habilitar la Calendar API**.
2. **Configurar la OAuth consent screen** (tipo *external*).
3. **Crear credenciales OAuth client** (tipo *web*) con redirect URI:
   `https://astromind.cl/api/integraciones/calendar/callback`
4. **Scopes:**
   - `https://www.googleapis.com/auth/calendar.events` (creación/edición de eventos)
   - `https://www.googleapis.com/auth/calendar.readonly` (si se necesita lectura)
5. **Guardar el refresh token** y credenciales — variables de entorno futuras:
   - `GOOGLE_REFRESH_TOKEN`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
6. **Punto de montaje sugerido:** `app/api/integraciones/calendar/`.

## Tipos

Ver [`tipos.ts`](./tipos.ts):

- `GoogleTokens` — respuesta del intercambio OAuth (access/refresh token).
- `CalendarEventInput` — entrada para crear un evento de calendario.

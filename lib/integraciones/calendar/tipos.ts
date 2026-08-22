/** Tipos del flujo OAuth 2.0 de Google Calendar (sin lógica). */
export interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: "Bearer";
}

export interface CalendarEventInput {
  summary: string;
  description?: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}

CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"email" text NOT NULL,
	"empresa" text,
	"mensaje" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

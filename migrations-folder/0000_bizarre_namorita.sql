CREATE TABLE IF NOT EXISTS "owners" (
	"id" integer PRIMARY KEY NOT NULL,
	"address" char(42) NOT NULL,
	"staked" boolean DEFAULT false NOT NULL,
	"staked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stakers" (
	"id" char(42) PRIMARY KEY NOT NULL,
	"amount" numeric(78, 0) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "address_idx" ON "owners" ("address");
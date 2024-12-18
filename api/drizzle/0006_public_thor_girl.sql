CREATE TABLE IF NOT EXISTS "orders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"status" varchar(50) DEFAULT 'New' NOT NULL,
	"userId" integer NOT NULL,
	"stripePaymentIntentId" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "orderId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "productId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "price" double precision NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN IF EXISTS "createdAt";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN IF EXISTS "stripePaymentIntentId";
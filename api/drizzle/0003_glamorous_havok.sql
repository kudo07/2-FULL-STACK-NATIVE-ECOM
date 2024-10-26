ALTER TABLE "products" RENAME COLUMN "prcie" TO "price";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image" DROP NOT NULL;
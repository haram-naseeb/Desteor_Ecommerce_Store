-- Preserve existing orders while aligning fulfilment names with the customer-facing workflow.
ALTER TYPE "OrderStatus" RENAME VALUE 'PROCESSING' TO 'CONFIRMED';
ALTER TYPE "OrderStatus" RENAME VALUE 'PACKED' TO 'PREPARING';

CREATE TYPE "PaymentMethod" AS ENUM ('COD', 'ONLINE');

ALTER TABLE "Order"
  ALTER COLUMN "userId" DROP NOT NULL,
  ADD COLUMN "customerName" TEXT,
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "address" TEXT,
  ADD COLUMN "city" TEXT,
  ADD COLUMN "postalCode" TEXT,
  ADD COLUMN "notes" TEXT,
  ADD COLUMN "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'COD';

UPDATE "Order" o
SET "customerName" = CONCAT(u."firstName", ' ', u."lastName"),
    "phone" = COALESCE(u."phone", ''),
    "address" = '',
    "city" = ''
FROM "User" u
WHERE o."userId" = u.id;

ALTER TABLE "Order"
  ALTER COLUMN "customerName" SET NOT NULL,
  ALTER COLUMN "phone" SET NOT NULL,
  ALTER COLUMN "address" SET NOT NULL,
  ALTER COLUMN "city" SET NOT NULL;

ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "OrderItem" ADD COLUMN "subtotal" INTEGER;
UPDATE "OrderItem" SET "subtotal" = "unitPrice" * quantity;
ALTER TABLE "OrderItem" ALTER COLUMN "subtotal" SET NOT NULL;

ALTER TABLE "Review" ADD COLUMN "orderId" TEXT;
-- Existing legacy reviews cannot be tied to a verified purchase and are removed deliberately.
DELETE FROM "Review";
ALTER TABLE "Review" ALTER COLUMN "orderId" SET NOT NULL;
DROP INDEX IF EXISTS "Review_userId_productId_key";
CREATE UNIQUE INDEX "Review_orderId_productId_key" ON "Review"("orderId", "productId");

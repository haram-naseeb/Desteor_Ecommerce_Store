CREATE TABLE "Wishlist" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WishlistItem" (
  "id" TEXT NOT NULL,
  "wishlistId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Review" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "comment" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");
CREATE UNIQUE INDEX "WishlistItem_wishlistId_productId_key" ON "WishlistItem"("wishlistId", "productId");
CREATE INDEX "WishlistItem_productId_idx" ON "WishlistItem"("productId");
CREATE UNIQUE INDEX "Review_userId_productId_key" ON "Review"("userId", "productId");
CREATE INDEX "Review_productId_createdAt_idx" ON "Review"("productId", "createdAt");
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

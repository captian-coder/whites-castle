-- CreateTable Category
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL
);

-- CreateTable Product
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "badge" TEXT,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable ProductVariant
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable Branch
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hours" TEXT NOT NULL
);

-- CreateTable Offer
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "copy" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateIndex Product_categoryId_idx
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex ProductVariant_productId_idx
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

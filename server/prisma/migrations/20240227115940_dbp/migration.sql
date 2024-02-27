-- CreateTable
CREATE TABLE "Category" (
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryImage" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "product" (
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "prductColor" TEXT NOT NULL,
    "productSize" TEXT NOT NULL,
    "productStock" INTEGER NOT NULL,
    "productDescription" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductQA" (
    "productQaId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "ProductQA_pkey" PRIMARY KEY ("productQaId")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "productReviewId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewImage" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("productReviewId")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQA" ADD CONSTRAINT "ProductQA_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

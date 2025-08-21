-- CreateEnum
CREATE TYPE "public"."PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'INACTIVE');

-- CreateTable
CREATE TABLE "public"."Church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "welcomeMessage" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "status" "public"."PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "userId" TEXT NOT NULL,
    "stepsCompleted" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChurchProfile" (
    "id" TEXT NOT NULL,
    "mission" TEXT,
    "vision" TEXT,
    "churchSize" INTEGER NOT NULL,
    "communionFrequency" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChurchProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChurchService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChurchService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ministry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Ministry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PublicService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PublicService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Confession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Confession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactInfo" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SocialLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChurchContact" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChurchContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pastor" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pastor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChurchMap" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "landmarks" TEXT[],
    "addressInMap" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChurchMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChurchMedia" (
    "id" TEXT NOT NULL,
    "gallery" TEXT[],
    "introVideoLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChurchMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChurchGallery" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "churchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChurchGallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Church_userId_idx" ON "public"."Church"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchProfile_churchId_key" ON "public"."ChurchProfile"("churchId");

-- CreateIndex
CREATE INDEX "ChurchProfile_churchId_idx" ON "public"."ChurchProfile"("churchId");

-- CreateIndex
CREATE INDEX "ChurchProfile_userId_idx" ON "public"."ChurchProfile"("userId");

-- CreateIndex
CREATE INDEX "ChurchService_churchId_idx" ON "public"."ChurchService"("churchId");

-- CreateIndex
CREATE INDEX "ChurchService_userId_idx" ON "public"."ChurchService"("userId");

-- CreateIndex
CREATE INDEX "Ministry_churchId_idx" ON "public"."Ministry"("churchId");

-- CreateIndex
CREATE INDEX "Ministry_userId_idx" ON "public"."Ministry"("userId");

-- CreateIndex
CREATE INDEX "PublicService_churchId_idx" ON "public"."PublicService"("churchId");

-- CreateIndex
CREATE INDEX "PublicService_userId_idx" ON "public"."PublicService"("userId");

-- CreateIndex
CREATE INDEX "Confession_churchId_idx" ON "public"."Confession"("churchId");

-- CreateIndex
CREATE INDEX "Confession_userId_idx" ON "public"."Confession"("userId");

-- CreateIndex
CREATE INDEX "ContactInfo_churchId_idx" ON "public"."ContactInfo"("churchId");

-- CreateIndex
CREATE INDEX "ContactInfo_userId_idx" ON "public"."ContactInfo"("userId");

-- CreateIndex
CREATE INDEX "SocialLink_churchId_idx" ON "public"."SocialLink"("churchId");

-- CreateIndex
CREATE INDEX "SocialLink_userId_idx" ON "public"."SocialLink"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchContact_churchId_key" ON "public"."ChurchContact"("churchId");

-- CreateIndex
CREATE INDEX "ChurchContact_churchId_idx" ON "public"."ChurchContact"("churchId");

-- CreateIndex
CREATE INDEX "ChurchContact_userId_idx" ON "public"."ChurchContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pastor_churchId_key" ON "public"."Pastor"("churchId");

-- CreateIndex
CREATE INDEX "Pastor_churchId_idx" ON "public"."Pastor"("churchId");

-- CreateIndex
CREATE INDEX "Pastor_userId_idx" ON "public"."Pastor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchMap_churchId_key" ON "public"."ChurchMap"("churchId");

-- CreateIndex
CREATE INDEX "ChurchMap_churchId_idx" ON "public"."ChurchMap"("churchId");

-- CreateIndex
CREATE INDEX "ChurchMap_userId_idx" ON "public"."ChurchMap"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchMedia_churchId_key" ON "public"."ChurchMedia"("churchId");

-- CreateIndex
CREATE INDEX "ChurchMedia_churchId_idx" ON "public"."ChurchMedia"("churchId");

-- CreateIndex
CREATE INDEX "ChurchMedia_userId_idx" ON "public"."ChurchMedia"("userId");

-- CreateIndex
CREATE INDEX "ChurchGallery_churchId_idx" ON "public"."ChurchGallery"("churchId");

-- CreateIndex
CREATE INDEX "ChurchGallery_userId_idx" ON "public"."ChurchGallery"("userId");

-- AddForeignKey
ALTER TABLE "public"."ChurchProfile" ADD CONSTRAINT "ChurchProfile_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChurchService" ADD CONSTRAINT "ChurchService_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ministry" ADD CONSTRAINT "Ministry_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PublicService" ADD CONSTRAINT "PublicService_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Confession" ADD CONSTRAINT "Confession_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactInfo" ADD CONSTRAINT "ContactInfo_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLink" ADD CONSTRAINT "SocialLink_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChurchContact" ADD CONSTRAINT "ChurchContact_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pastor" ADD CONSTRAINT "Pastor_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChurchMap" ADD CONSTRAINT "ChurchMap_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChurchMedia" ADD CONSTRAINT "ChurchMedia_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChurchGallery" ADD CONSTRAINT "ChurchGallery_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

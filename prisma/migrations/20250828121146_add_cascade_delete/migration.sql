-- DropForeignKey
ALTER TABLE "public"."ContactInfo" DROP CONSTRAINT "ContactInfo_churchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialLink" DROP CONSTRAINT "SocialLink_churchId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ContactInfo" ADD CONSTRAINT "ContactInfo_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLink" ADD CONSTRAINT "SocialLink_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

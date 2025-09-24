/*
  Warnings:

  - You are about to drop the column `maxArticles` on the `StandRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Stand" ADD COLUMN     "maxArticles" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "public"."StandRequest" DROP COLUMN "maxArticles";

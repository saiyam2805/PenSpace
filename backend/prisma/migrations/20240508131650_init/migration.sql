/*
  Warnings:

  - Added the required column `date` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Followers" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

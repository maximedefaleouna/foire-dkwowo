-- CreateTable
CREATE TABLE "public"."StandRequest" (
    "id" TEXT NOT NULL,
    "structureName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "activitySector" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "standId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StandRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Compte" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "standId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Compte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stand" (
    "id" TEXT NOT NULL,
    "structureName" TEXT NOT NULL,
    "activitySector" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Article" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "standId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StandRequest_standId_key" ON "public"."StandRequest"("standId");

-- CreateIndex
CREATE UNIQUE INDEX "Compte_username_key" ON "public"."Compte"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Compte_email_key" ON "public"."Compte"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Compte_standId_key" ON "public"."Compte"("standId");

-- AddForeignKey
ALTER TABLE "public"."StandRequest" ADD CONSTRAINT "StandRequest_standId_fkey" FOREIGN KEY ("standId") REFERENCES "public"."Stand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Compte" ADD CONSTRAINT "Compte_standId_fkey" FOREIGN KEY ("standId") REFERENCES "public"."Stand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_standId_fkey" FOREIGN KEY ("standId") REFERENCES "public"."Stand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

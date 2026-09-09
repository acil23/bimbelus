-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "achievement_type" AS ENUM ('COMPETITION', 'ADMISSION', 'ACADEMIC', 'OTHER');

-- CreateEnum
CREATE TYPE "price_unit" AS ENUM ('PER_SEMESTER', 'PER_PERIODE', 'PER_BULAN', 'PER_PERTEMUAN', 'SEKALI_BAYAR');

-- CreateEnum
CREATE TYPE "program_category" AS ENUM ('REGULER', 'OLIMPIADE', 'PROGRAM_TAHUNAN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "achievements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "student_name" VARCHAR(150) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "student_school" VARCHAR(255),
    "destination" VARCHAR(255),
    "subject" VARCHAR(150),
    "competition_name" VARCHAR(255),
    "competition_level" VARCHAR(150),
    "achievement_type" "achievement_type" NOT NULL,
    "year" INTEGER,
    "image_url" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(150) NOT NULL,
    "tagline" VARCHAR(255),
    "description" TEXT,
    "history" TEXT,
    "vision" TEXT,
    "mission" TEXT,
    "logo_url" TEXT,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_information" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255),
    "instagram_url" TEXT,
    "facebook_url" TEXT,
    "tiktok_url" TEXT,
    "youtube_url" TEXT,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_locations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contact_information_id" UUID NOT NULL,
    "label" VARCHAR(100),
    "address" TEXT NOT NULL,
    "phone" VARCHAR(30),
    "whatsapp" VARCHAR(30),
    "contact_person" VARCHAR(150),
    "google_maps_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_packages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "program_id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "price_unit" "price_unit" NOT NULL,
    "duration" VARCHAR(100),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(180) NOT NULL,
    "category" "program_category" NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_educations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tutor_id" UUID NOT NULL,
    "institution" VARCHAR(255) NOT NULL,
    "field_of_study" VARCHAR(255),
    "start_year" INTEGER,
    "end_year" INTEGER,
    "description" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tutor_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_experiences" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tutor_id" UUID NOT NULL,
    "organization" VARCHAR(255) NOT NULL,
    "position" VARCHAR(150),
    "start_year" INTEGER,
    "end_year" INTEGER,
    "description" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tutor_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(180) NOT NULL,
    "title" VARCHAR(100),
    "photo_url" TEXT,
    "specialization" VARCHAR(255),
    "bio" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tutors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_achievements_active" ON "achievements"("is_active");

-- CreateIndex
CREATE INDEX "idx_achievements_display_order" ON "achievements"("display_order");

-- CreateIndex
CREATE INDEX "idx_achievements_featured" ON "achievements"("is_featured");

-- CreateIndex
CREATE INDEX "idx_achievements_type" ON "achievements"("achievement_type");

-- CreateIndex
CREATE INDEX "idx_achievements_year" ON "achievements"("year");

-- CreateIndex
CREATE INDEX "idx_contact_locations_active" ON "contact_locations"("is_active");

-- CreateIndex
CREATE INDEX "idx_contact_locations_contact_information_id" ON "contact_locations"("contact_information_id");

-- CreateIndex
CREATE INDEX "idx_contact_locations_display_order" ON "contact_locations"("display_order");

-- CreateIndex
CREATE INDEX "idx_program_packages_display_order" ON "program_packages"("display_order");

-- CreateIndex
CREATE INDEX "idx_program_packages_is_active" ON "program_packages"("is_active");

-- CreateIndex
CREATE INDEX "idx_program_packages_program_id" ON "program_packages"("program_id");

-- CreateIndex
CREATE UNIQUE INDEX "programs_slug_key" ON "programs"("slug");

-- CreateIndex
CREATE INDEX "idx_tutor_educations_tutor_id" ON "tutor_educations"("tutor_id");

-- CreateIndex
CREATE INDEX "idx_tutor_experiences_tutor_id" ON "tutor_experiences"("tutor_id");

-- CreateIndex
CREATE UNIQUE INDEX "tutors_slug_key" ON "tutors"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "contact_locations" ADD CONSTRAINT "contact_locations_contact_information_fk" FOREIGN KEY ("contact_information_id") REFERENCES "contact_information"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "program_packages" ADD CONSTRAINT "program_packages_program_fk" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tutor_educations" ADD CONSTRAINT "tutor_educations_tutor_fk" FOREIGN KEY ("tutor_id") REFERENCES "tutors"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tutor_experiences" ADD CONSTRAINT "tutor_experiences_tutor_fk" FOREIGN KEY ("tutor_id") REFERENCES "tutors"("id") ON DELETE CASCADE ON UPDATE NO ACTION;


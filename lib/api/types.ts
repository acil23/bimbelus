export type ProgramCategory =
  | "REGULER"
  | "OLIMPIADE"
  | "PROGRAM_TAHUNAN"
  | "LAINNYA";

export type ProgramPriceUnit =
  | "PER_SEMESTER"
  | "PER_PERIODE"
  | "SEKALI_BAYAR"
  | "PER_BULAN";

export type ProgramPackage = {
  id: string;
  program_id: string;
  name: string;
  description: string | null;
  price: number;
  price_unit: ProgramPriceUnit;
  duration: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Program = {
  id: string;
  name: string;
  slug: string;
  category: ProgramCategory;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  program_packages: ProgramPackage[];
};

export type TutorEducation = {
  id: string;
  tutor_id: string;
  institution: string;
  field_of_study: string | null;
  start_year: number | null;
  end_year: number | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type TutorExperience = {
  id: string;
  tutor_id: string;
  organization: string;
  position: string | null;
  start_year: number | null;
  end_year: number | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Tutor = {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  photo_url: string | null;
  specialization: string | null;
  bio: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  tutor_educations: TutorEducation[];
  tutor_experiences: TutorExperience[];
};

export type AchievementType =
  | "ADMISSION"
  | "COMPETITION"
  | "OTHER";

export type Achievement = {
  id: string;
  student_name: string;
  title: string;
  student_school: string | null;
  destination: string | null;
  subject: string | null;
  achievement_type: AchievementType;
  year: number;
  image_url: string | null;
  is_featured: boolean;
  display_order: number;
};

export type AchievementDetail = Achievement & {
  description: string | null;
  competition_name: string | null;
  competition_level: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Company = {
  id: string;
  name: string;
  tagline: string;
  description: string | null;
  history: string | null;
  vision: string | null;
  mission: string | null;
  logo_url: string | null;
  updated_at: string;
};

export type ContactLocation = {
  id: string;
  contact_information_id: string;
  label: string;
  address: string;
  phone: string | null;
  whatsapp: string | null;
  contact_person: string | null;
  google_maps_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id: string;
  email: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  updated_at: string;
  contact_locations: ContactLocation[];
};

// Types for CRUD operations

export type ProgramMutationResult = {
  id: string;
  name: string;
  slug: string;
  category: ProgramCategory;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type CreateProgramInput = {
  name: string;
  slug: string;
  category: ProgramCategory;
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean;
  display_order?: number;
};

export type UpdateProgramInput = {
  name?: string;
  slug?: string;
  category?: ProgramCategory;
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean;
  display_order?: number;
};

export type CreateProgramPackageInput = {
  name: string;
  description?: string | null;
  price: number;
  price_unit: ProgramPriceUnit;
  duration: string;
  is_active?: boolean;
  display_order?: number;
};

export type UpdateProgramPackageInput = {
  name?: string;
  description?: string | null;
  price?: number;
  price_unit?: ProgramPriceUnit;
  duration?: string;
  is_active?: boolean;
  display_order?: number;
};

export type CreateTutorInput = {
  name: string;
  slug: string;
  title?: string | null;
  photo_url?: string | null;
  specialization?: string | null;
  bio?: string | null;
  is_active?: boolean;
  display_order?: number;
};

export type UpdateTutorInput = {
  name?: string;
  slug?: string;
  title?: string | null;
  photo_url?: string | null;
  specialization?: string | null;
  bio?: string | null;
  is_active?: boolean;
  display_order?: number;
};

export type CreateTutorEducationInput = {
  institution: string;
  field_of_study?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
};

export type UpdateTutorEducationInput = {
  institution?: string;
  field_of_study?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
};

export type CreateTutorExperienceInput = {
  organization: string;
  position?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
};

export type UpdateTutorExperienceInput = {
  organization?: string;
  position?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
};

export type TutorMutationResult = {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  photo_url: string | null;
  specialization: string | null;
  bio: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type CreateAchievementInput = {
  student_name: string;
  title: string;
  student_school?: string | null;
  destination?: string | null;
  subject?: string | null;
  achievement_type: AchievementType;
  year: number;
  image_url?: string | null;
  is_featured?: boolean;
  display_order?: number;
  description?: string | null;
  competition_name?: string | null;
  competition_level?: string | null;
  is_active?: boolean;
};

export type UpdateAchievementInput = {
  student_name?: string;
  title?: string;
  student_school?: string | null;
  destination?: string | null;
  subject?: string | null;
  achievement_type?: AchievementType;
  year?: number;
  image_url?: string | null;
  is_featured?: boolean;
  display_order?: number;
  description?: string | null;
  competition_name?: string | null;
  competition_level?: string | null;
  is_active?: boolean;
};

export type AchievementMutationResult = AchievementDetail;

export type UpdateCompanyInput = {
  name?: string;
  tagline?: string;
  description?: string | null;
  history?: string | null;
  vision?: string | null;
  mission?: string | null;
  logo_url?: string | null;
};

export type UpdateContactInput = {
  email?: string | null;
  instagram_url?: string | null;
  facebook_url?: string | null;
  tiktok_url?: string | null;
  youtube_url?: string | null;
};

export type CreateContactLocationInput = {
  label: string;
  address: string;
  phone?: string | null;
  whatsapp?: string | null;
  contact_person?: string | null;
  google_maps_url?: string | null;
  is_active?: boolean;
  display_order?: number;
};

export type UpdateContactLocationInput = {
  label?: string;
  address?: string;
  phone?: string | null;
  whatsapp?: string | null;
  contact_person?: string | null;
  google_maps_url?: string | null;
  is_active?: boolean;
  display_order?: number;
};
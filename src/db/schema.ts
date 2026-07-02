import { pgTable, text, serial, integer, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";

export const tenants = pgTable('tenants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  logoUrl: text('logo_url'),
  primaryColor: text('primary_color'),
  subscriptionTier: text('subscription_tier').default('basic'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique().notNull(), // If using Clerk for auth
  email: text('email').notNull(),
  role: text('role').notNull().default('student'), // admin, student
  tenantId: integer('tenant_id').references(() => tenants.id), // For admins
  createdAt: timestamp('created_at').defaultNow(),
});

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  matricYear: integer('matric_year'),
  grades: jsonb('grades'), // e.g., { "Mathematics": 75, "Physical Sciences": 80 }
  householdIncome: integer('household_income'),
  province: text('province'),
  intendedFieldOfStudy: text('intended_field_of_study'),
  specialCircumstances: jsonb('special_circumstances'), // array: ["orphan", "disability", "first-generation"]
  createdAt: timestamp('created_at').defaultNow(),
});

export const bursaries = pgTable('bursaries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  provider: text('provider').notNull(),
  description: text('description'),
  minAcademicAverage: integer('min_academic_average'),
  maxHouseholdIncome: integer('max_household_income'),
  eligibleProvinces: jsonb('eligible_provinces'), // array of provinces or null for all
  eligibleFieldsOfStudy: jsonb('eligible_fields_of_study'),
  specialCircumstances: jsonb('special_circumstances'), // required circumstances
  requiredDocuments: jsonb('required_documents'), // array of document names
  deadlineDate: timestamp('deadline_date'),
  applicationUrl: text('application_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const studentMatches = pgTable('student_matches', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').references(() => students.id).notNull(),
  bursaryId: integer('bursary_id').references(() => bursaries.id).notNull(),
  matchScore: integer('match_score'),
  matchReason: text('match_reason'),
  documentProgress: jsonb('document_progress'), // { "ID Copy": true, "Matric Results": false }
  letterDraft: text('letter_draft'),
  createdAt: timestamp('created_at').defaultNow(),
});

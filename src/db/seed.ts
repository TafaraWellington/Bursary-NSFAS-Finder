import { db } from './index';
import { bursaries } from './schema';

const SEED_BURSARIES = [
  {
    name: 'NSFAS',
    provider: 'National Student Financial Aid Scheme',
    description: 'Comprehensive funding for eligible students from poor and working-class backgrounds.',
    minAcademicAverage: 50,
    maxHouseholdIncome: 350000,
    eligibleProvinces: null, // all
    eligibleFieldsOfStudy: null, // all public university/TVET courses
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Proof of Income', 'Consent Form'],
    applicationUrl: 'https://www.nsfas.org.za'
  },
  {
    name: 'Sasol Foundation Bursary',
    provider: 'Sasol',
    description: 'Comprehensive bursary for STEM fields including Engineering, Science, and Data.',
    minAcademicAverage: 70,
    maxHouseholdIncome: 600000,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Engineering', 'Computer Science', 'Data Science', 'Chemistry', 'Metallurgy'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Income', 'Acceptance Letter'],
    applicationUrl: 'https://www.sasolbursaries.com'
  },
  {
    name: 'Allan Gray Orbis Foundation Fellowship',
    provider: 'Allan Gray',
    description: 'Bursary and fellowship for high-impact entrepreneurial students.',
    minAcademicAverage: 75, // Usually requires minimum 60% in Math and high overall
    maxHouseholdIncome: null, // Need-blind, but financial need is considered
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Commerce', 'Engineering', 'Science', 'Law', 'Humanities', 'Arts'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Motivational Letter', 'Reference Letter'],
    applicationUrl: 'https://www.allangrayorbis.org'
  },
  {
    name: 'Investec IT and Accounting Bursary',
    provider: 'Investec',
    description: 'Bursary for IT, Data, and Accounting students with strong academic merit.',
    minAcademicAverage: 70,
    maxHouseholdIncome: null,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Information Technology', 'Computer Science', 'Accounting', 'Actuarial Science'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Income'],
    applicationUrl: 'https://www.investec.com'
  },
  {
    name: 'Funza Lushaka Bursary',
    provider: 'Department of Basic Education',
    description: 'Bursary for students pursuing a teaching qualification in priority areas.',
    minAcademicAverage: 60,
    maxHouseholdIncome: null,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Education', 'Teaching'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'University Acceptance'],
    applicationUrl: 'http://www.funzalushaka.doe.gov.za'
  },
  {
    name: 'Thuthuka Bursary Fund',
    provider: 'SAICA',
    description: 'Bursary for disadvantaged students pursuing a career in Chartered Accountancy.',
    minAcademicAverage: 65, // Level 5 Math
    maxHouseholdIncome: 350000,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Accounting', 'BCom Accounting'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Income', 'Parent/Guardian ID'],
    applicationUrl: 'https://www.saica.org.za/thuthuka'
  },
  {
    name: 'Moshal Scholarship Program',
    provider: 'Moshal Program',
    description: 'Support for resilient students from challenging backgrounds.',
    minAcademicAverage: 65,
    maxHouseholdIncome: 350000,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Engineering', 'IT', 'Computer Science', 'Medicine', 'Pharmacy', 'Business'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Income', 'Motivational Letter'],
    applicationUrl: 'https://moshalscholarship.org'
  },
  {
    name: 'Tomorrow Trust',
    provider: 'Tomorrow Trust',
    description: 'Comprehensive support including psycho-social support for orphaned and vulnerable youth.',
    minAcademicAverage: 60,
    maxHouseholdIncome: null, // Focused on orphans/vulnerable
    eligibleProvinces: null,
    eligibleFieldsOfStudy: null,
    specialCircumstances: ['orphan', 'vulnerable'],
    requiredDocuments: ['ID Copy', 'Matric Results', 'Death Certificates (if applicable)'],
    applicationUrl: 'https://tomorrow.org.za'
  },
  {
    name: 'Dell Young Leaders',
    provider: 'Michael & Susan Dell Foundation',
    description: 'Wraparound support for university students demonstrating resilience and need.',
    minAcademicAverage: 65,
    maxHouseholdIncome: 400000,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: null, // Professional degrees
    specialCircumstances: ['first-generation'],
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Income'],
    applicationUrl: 'https://www.dellyoungleaders.org'
  },
  {
    name: 'Standard Bank CSI Bursary',
    provider: 'Standard Bank',
    description: 'Bursary for top academic performers from disadvantaged backgrounds.',
    minAcademicAverage: 75,
    maxHouseholdIncome: 600000,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Commerce', 'Science', 'Engineering', 'Mathematics', 'IT'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Income'],
    applicationUrl: 'https://www.standardbank.co.za'
  },
  {
    name: 'Absa Fellowship',
    provider: 'Absa',
    description: 'Developing young leaders for the future of Africa.',
    minAcademicAverage: 65,
    maxHouseholdIncome: null,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: ['Technology', 'Engineering', 'Mathematics', 'Creative Arts', 'Humanities'],
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Essay'],
    applicationUrl: 'https://www.absa.africa/absa-fellowship'
  },
  {
    name: 'FirstRand Laurie Dippenaar',
    provider: 'FirstRand',
    description: 'Postgraduate scholarship for study outside South Africa (added for variety, though mostly undergrad needed).',
    minAcademicAverage: 80,
    maxHouseholdIncome: null,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: null,
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Transcripts', 'Acceptance to Int. University'],
    applicationUrl: 'https://bursaries.firstrand.co.za'
  },
  {
    name: 'Cyril Ramaphosa Education Trust',
    provider: 'CRET',
    description: 'Bursary program focusing on students who demonstrate leadership and community service.',
    minAcademicAverage: 60,
    maxHouseholdIncome: null,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: null,
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Income', 'Community Service Evidence'],
    applicationUrl: 'https://www.cyrilramaphosafoundation.org/cret'
  },
  {
    name: 'REAP (Rural Education Access Programme)',
    provider: 'REAP',
    description: 'Bursary explicitly for students from deep rural areas.',
    minAcademicAverage: 55,
    maxHouseholdIncome: 350000,
    eligibleProvinces: null,
    eligibleFieldsOfStudy: null,
    specialCircumstances: ['rural'],
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Rural Residence', 'Proof of Income'],
    applicationUrl: 'http://www.reap.org.za'
  },
  {
    name: 'Gauteng City Region Academy (GCRA)',
    provider: 'Gauteng Provincial Government',
    description: 'Bursary for youth residing in Gauteng.',
    minAcademicAverage: 0, // Varies, Top 3 from township schools automatically qualify
    maxHouseholdIncome: null,
    eligibleProvinces: ['Gauteng'],
    eligibleFieldsOfStudy: null,
    specialCircumstances: null,
    requiredDocuments: ['ID Copy', 'Matric Results', 'Proof of Gauteng Residence', 'Proof of Income'],
    applicationUrl: 'https://gauteng.gov.za'
  }
];

async function seed() {
  console.log('Seeding bursaries...');
  for (const b of SEED_BURSARIES) {
    await db.insert(bursaries).values(b);
  }
  console.log('Done seeding bursaries.');
}

seed().catch(console.error);

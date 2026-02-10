export interface Client {
  id: string
  name: string
  share_token: string
  created_at: string
}

export interface OnboardingForm {
  id: string
  client_id: string
  form_data: FormData
  updated_at: string
  created_at: string
}

export interface FormData {
  // 1. Bedriftsinformasjon
  companyName: string
  orgNumber: string
  address: string
  contactName: string
  contactPhone: string
  contactEmail: string
  invoiceEmail: string
  ehf: string
  poReference: string
  website: string
  facebook: string
  instagram: string
  tiktok: string
  snapchat: string
  linkedin: string

  // 2. Mål & Prioriteringer
  mainGoals: string
  topProducts: string
  seasonalCampaigns: string

  // 3. Tilganger
  shopifyAccess: string
  shopifyStore: string
  googleAdsAccess: string
  googleMerchantAccess: string
  googleSearchConsoleAccess: string
  googleTagManagerAccess: string
  googleAnalyticsAccess: string
  googleBusinessAccess: string
  metaBusinessManagerId: string
  metaAccessNotes: string
  
  // Email & Newsletter
  hasNewsletterSoftware: string // 'yes', 'no'
  newsletterSoftwareType: string // 'klaviyo', 'mailchimp', 'convertkit', 'brevo', 'other', 'none'
  newsletterSoftwareOther: string
  emailMarketingToolAccess: string // Access details if they have existing software
  dnsProvider: string
  dnsAccessNotes: string

  // 4. Kreative ressurser
  imagesAvailable: string
  videoAvailable: string
  logoFiles: string
  brandColors: string
  fonts: string
  brandManual: string
  brandManual: string
  toneOfVoiceNotes: string

  // 5. Email Setup (flexible based on chosen software)
  senderName: string
  senderEmail: string
  supportEmail: string
  existingLists: string
  consentStatus: string
  emailDesignPreferences: string

  // 6. Sporing
  usingGTM: string
  metaPixelInstalled: string
  capiActive: string
  googleAdsConversions: string
  emailSoftwareTracking: string
  customTracking: string

  // 7. Budget
  metaBudget: string
  googleBudget: string
  linkedinBudget: string
  snapchatBudget: string
  tiktokBudget: string
  budgetDistribution: string

  // 8. Ekstra notater
  extraNotes: string
}

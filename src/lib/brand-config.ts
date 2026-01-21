/**
 * ANGELICA'S ORGANIC EVOO - BRAND SETTINGS
 * Use this file to maintain consistency across the Landing Page and Dashboard.
 */

export const BRAND_VOICE = {
  identity: {
    businessName: "Angelica's Organic Extra Virgin Olive Oil",
    productName: "Angelica's Organic EVOO",
    shortName: "Angelica's",
    tagline: "The best meals aren't just made — they're shared",
    secondaryTagline: "From our kitchen to yours — salud",
    persona: "Family-oriented artisan producer",
    productionScale: "60 bottles per harvest",
    oliveVariety: "100% Arbequina olives",
    origin: "Sustainably grown in the USA",
    heritage: "Inspired by our grandmother Angelica, who believed that food was love and olive oil was its soul",
    varietyBackground: "Arbequina olives originated in Spain. Known for their smooth, fruity flavor and golden hue, they bring a delicate richness to every dish",
    missionStatement: "We set out to create an olive oil that honored her spirit and elevated everyday cooking"
  },
  
  coreBeliefs: {
    philosophy: "The best meals aren't just made — they're shared",
    angelicasWisdom: "Food was love and olive oil was its soul",
    purpose: "Preserving the legacy of food made with love",
    values: [
      "Gathering around the table",
      "Making even the simplest moments feel a little more special",
      "Honoring tradition while elevating everyday cooking",
      "We don't take shortcuts"
    ],
    essence: "At its heart, Angelica's is about more than olive oil"
  },
  
  brandColors: {
    darkBlue: "#001B71",
    brightYellow: "#F7D63A",
    offWhite: "#FDF9EB",
    white: "#FFFFFF",
    usage: {
      primaryBackground: "darkBlue",
      primaryText: "offWhite",
      accents: "brightYellow",
      surfaceElements: "white"
    }
  },

  typography: {
    headings: "Serif (e.g., Playfair Display) - Traditional, Elegant, Heritage",
    body: "Sans-Serif (e.g., Inter or Geist) - Clean, Premium, Readable",
    quotes: "Italicized Serif - Warm and personal",
    styleNotes: "Use generous letter spacing for headings to feel premium."
  },
  
  tone: {
    primary: "Warm and inviting",
    secondary: "Premium yet relatable",
    tertiary: "Focused on family, tradition, and celebration",
    personality: ["Warm", "Inviting", "Premium yet relatable", "Family-focused", "Intentional", "Nourishing"],
    avoid: ["Corporate speak", "Over-technical jargon", "Pushy sales language", "Artificial urgency", "Shortcuts", "Empty promises"],
    pricingPsychology: "Never apologize for the price. Frame it as the natural cost of a 'no-shortcuts' process and extreme scarcity (60 bottles)."
  },
  
  bannedWords: [
    "leverage", "synergy", "revolutionary", "game-changing", "disruptive",
    "best-in-class", "world-class", "cutting-edge", "next-generation",
    "unlock", "transform your life", "secret", "miracle", "hack"
  ],
  
  productCharacteristics: {
    tastingNotes: {
      primary: "Balanced fruity flavor",
      notes: ["hints of almond", "apple", "light peppery finish"],
      texture: "delicate texture",
      appearance: "herbal golden green color / golden hue"
    },
    chemicalProfile: {
      acidity: "0.14%",
      peroxides: "8 meg./kg",
      polyphenols: "349",
      benefits: [
        "Low acidity - less likely to induce heartburn",
        "Low peroxide value - indicates higher purity",
        "High polyphenol content - rich in antioxidants",
        "Supports heart health and reduces inflammation"
      ]
    },
    process: "Harvested with care, cold-pressed for purity, and bottled with intention"
  },
  
  vocabulary: {
    preferred: [
      "organic", "ultra-premium", "extra virgin", "Arbequina",
      "drizzled", "spooned", "finishing touch", "crafted", "celebration",
      "shared", "gathered", "love", "tradition", "heritage", "legacy",
      "simple moments", "everyday cooking", "kitchen", "table",
      "care", "intention", "purity", "sustainably", "Salud!"
    ],
    ctas: {
      preferred: ["Bring Angelica's Home", "Join our Table", "Reserve a Bottle", "Explore the Harvest"],
      avoid: ["Buy Now", "Subscribe", "Register", "Get Started"]
    }
  },

  stripeBranding: {
    subscriptionModel: "The Family Reserve",
    description: "Not a subscription, but a guaranteed reservation of the upcoming harvest for your kitchen.",
  },
  
  storytellingElements: {
    heritage: "Inspired by our grandmother Angelica, who believed that food was love and olive oil was its soul",
    scarcity: "Only 60 bottles per harvest - ultra-premium, small-batch production",
    closing: "From our kitchen to yours — salud"
  },
  
  signatureClosings: {
    recipes: "Salud!",
    emails: "From our kitchen to yours — salud",
    social: "Salud! 🫒",
    articles: "From our family table to yours, Angelica's"
  }
};

export type BrandVoice = typeof BRAND_VOICE;
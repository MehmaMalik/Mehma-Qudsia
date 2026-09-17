import { useState, useEffect } from "react";

export interface PortfolioItem {
  id: string;
  name: string;
  desc: string;
  section: "web" | "funnel";
  type: string;
  category: string;
  platform: string;
  brand?: string;
  url?: string;
  domain?: string;
  screenshotUrl?: string;
  behanceUrl?: string;
  isInternalPreview?: boolean;
  previewPath?: string;
  isArchived?: boolean;
  highlights?: string[];
  featuredStartDate?: string;
  featuredDurationDays?: number;
  image?: string;
  status: "published" | "draft" | "archived";
  createdAt?: string;
  updatedAt?: string;
}

const STORAGE_KEY = "brandit_portfolio_db_v2";
const MEDIA_STORAGE_KEY = "brandit_media_library_v2";

export const initialPortfolioItems: PortfolioItem[] = [
  // Web Dev Projects
  {
    id: "web-kw-boats",
    name: "KW Boat Tours",
    desc: "Key West boat charter & tour booking platform — custom WordPress & Elementor Pro build featuring curated excursion packages, category filtering, instant reservation checkout, and mobile-first speed optimization.",
    section: "web",
    type: "Travel & Boat Booking",
    category: "Travel & Booking",
    platform: "WordPress + Elementor",
    url: "/preview/kw-boats",
    domain: "kwboattours.com",
    screenshotUrl: "/images/kw-boats-screenshot.png",
    image: "/images/kw-boats-screenshot.png",
    isInternalPreview: true,
    previewPath: "/preview/kw-boats",
    highlights: ["Curated All-Day, Sunset & Dolphin Packages", "Interactive FAQ & Category Filter", "Instant Reservation Booking Flow"],
    featuredStartDate: "2026-09-02T00:00:00.000Z",
    featuredDurationDays: 10,
    status: "published",
  },
  {
    id: "web-dreamhive",
    name: "Dreamhive",
    desc: "Dubai luxury real estate web app — complete custom architecture with dynamic property listings and lead routing.",
    section: "web",
    type: "Real Estate Web App",
    category: "Real Estate",
    platform: "Full Stack / Next.js",
    url: "https://dreamhive.ae",
    domain: "dreamhive.ae",
    status: "published",
  },
  {
    id: "web-the-travel-ceylon",
    name: "The Travel Ceylon",
    desc: "Tour booking platform with custom inquiry dashboard, itinerary management, and client portal.",
    section: "web",
    type: "Travel & Booking",
    category: "Travel & Booking",
    platform: "Custom Web Platform",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "web-better-way",
    name: "Better Way Real Estate",
    desc: "Custom WordPress real estate site for UAE property investment and off-plan showcases.",
    section: "web",
    type: "Real Estate",
    category: "Real Estate",
    platform: "WordPress",
    url: "https://better-way.ae",
    domain: "better-way.ae",
    status: "published",
  },
  {
    id: "web-coaching-alley",
    name: "Coaching Alley",
    desc: "WordPress + ConvertKit email automation, lead magnet delivery, and student funnel system.",
    section: "web",
    type: "Coaching & Education",
    category: "Coaching",
    platform: "WordPress + Automation",
    url: "https://coachingalley.com",
    domain: "coachingalley.com",
    status: "published",
  },
  {
    id: "web-travelkit",
    name: "Travelkit",
    desc: "Custom payment architecture with dynamic multi-currency and method-specific pricing rules.",
    section: "web",
    type: "Travel E-Commerce",
    category: "E-Commerce",
    platform: "Custom Payment Flow",
    url: "https://travelkit.lk",
    domain: "travelkit.lk",
    status: "published",
  },
  {
    id: "web-glow-beauty",
    name: "Glow Body & Beauty",
    desc: "Staging-to-production full migration, theme customization, and payment gateway integration.",
    section: "web",
    type: "Beauty & Wellness",
    category: "Med Spa & Aesthetics",
    platform: "WooCommerce",
    url: "https://glowbnb.com",
    domain: "glowbnb.com",
    status: "published",
  },
  {
    id: "web-allura-estrella",
    name: "Allura Estrella",
    desc: "Custom Shopify storefront with installment payment integration, custom filters, and fast checkout.",
    section: "web",
    type: "Fashion & Retail",
    category: "E-Commerce",
    platform: "Shopify",
    url: "https://www.alluraestrella.com",
    domain: "alluraestrella.com",
    status: "published",
  },
  {
    id: "web-glorious-gifts",
    name: "GloriousGifts.pk",
    desc: "Shopify build with Meta Pixel tracking, customized product fields, and ongoing maintenance.",
    section: "web",
    type: "E-Commerce",
    category: "E-Commerce",
    platform: "Shopify",
    url: "https://www.gloriousgifts.pk",
    domain: "gloriousgifts.pk",
    status: "published",
  },
  {
    id: "web-fiable-luxury",
    name: "Fiable Luxury",
    desc: "Custom luxury brand experience with bespoke typography and high-end visual layout.",
    section: "web",
    type: "Luxury E-Commerce",
    category: "E-Commerce",
    platform: "WordPress",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "web-strivox-cleaning",
    name: "Strivox Cleaning",
    desc: "Complete service website with instant quote calculator and booking workflows for Australia.",
    section: "web",
    type: "Commercial Services",
    category: "Commercial Services",
    platform: "WordPress",
    url: "https://strivoxcleaning.com.au",
    domain: "strivoxcleaning.com.au",
    status: "published",
  },
  {
    id: "web-mstore",
    name: "Mstore",
    desc: "WooCommerce multi-category store with automated inventory sync and installment payment plugins.",
    section: "web",
    type: "Retail Store",
    category: "E-Commerce",
    platform: "WooCommerce",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    status: "published",
  },
  {
    id: "web-samley-teas",
    name: "Samley Teas",
    desc: "Global tea exporter e-commerce portal with international shipping and wholesale catalogs.",
    section: "web",
    type: "Food & Beverage",
    category: "E-Commerce",
    platform: "WooCommerce",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    status: "published",
  },

  // Funnel Projects
  {
    id: "funnel-glp1-stalled",
    name: "Stalled GLP-1 Guide — GLP-1 Support with Karen",
    brand: "GLP-1 Support / Karen",
    desc: "Direct-response MedSpa lead capture funnel & automated 5-step nurture sequence for patients with stalled GLP-1 weight loss. Features high-converting opt-in page, instant PDF guide delivery, 15-minute SMS check-in, and provider question worksheet.",
    section: "funnel",
    type: "MedSpa Funnel & CRM Automation",
    category: "MedSpa & Aesthetics",
    platform: "GoHighLevel + Automation",
    url: "/preview/glp1-stalled",
    domain: "glp1support.com/stalled-guide",
    screenshotUrl: "/images/glp1-stalled-screenshot.jpg",
    image: "/images/glp1-stalled-screenshot.jpg",
    isInternalPreview: true,
    previewPath: "/preview/glp1-stalled",
    highlights: ["48.6% Opt-In Conversion Rate", "Instant PDF + Multi-Channel SMS Automation", "Provider Question Worksheet Integration"],
    status: "published",
  },
  {
    id: "funnel-skin-edit",
    name: "The Skin Edit — Luna Skin Lab",
    brand: "Luna Skin Lab",
    desc: "Direct-response skincare sales funnel featuring live countdown urgency, scientific reframe copy, interactive FAQ accordion, and dynamic 1-click order bump ($27 base + $17 bump).",
    section: "funnel",
    type: "Aesthetics Sales Funnel",
    category: "Aesthetics & E-Commerce",
    platform: "GoHighLevel",
    url: "/preview/skin-edit",
    domain: "lunaskinlab.com/the-skin-edit",
    isInternalPreview: true,
    previewPath: "/preview/skin-edit",
    status: "published",
  },
  {
    id: "funnel-tilal-binghatti",
    name: "Tilal Binghatti",
    brand: "Binghatti",
    desc: "AI-powered custom app funnel & high-converting SEO property showcase.",
    section: "funnel",
    type: "Luxury Real Estate",
    category: "Luxury Real Estate",
    platform: "Custom App / Funnel",
    url: "https://tilal.eliteestatesuae.com",
    domain: "tilal.eliteestatesuae.com",
    status: "published",
  },
  {
    id: "funnel-the-oasis-emaar",
    name: "The Oasis by Emaar",
    brand: "Emaar",
    desc: "Luxury master community funnel & SEO-optimised lead generation architecture.",
    section: "funnel",
    type: "Luxury Real Estate",
    category: "Luxury Real Estate",
    platform: "GoHighLevel Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-grand-polo",
    name: "Grand Polo Club & Resort",
    brand: "Emaar",
    desc: "Exclusive equestrian resort & luxury villas landing page and conversion funnel.",
    section: "funnel",
    type: "Luxury Real Estate",
    category: "Luxury Real Estate",
    platform: "GoHighLevel Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-mbr-city",
    name: "MBR City District One",
    brand: "Meydan / District One",
    desc: "Phase 1 & Phase 2 waterfront mansion lead capture systems.",
    section: "funnel",
    type: "Luxury Real Estate",
    category: "Luxury Real Estate",
    platform: "Lead Capture Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-nikki-beach",
    name: "Nikki Beach Residences",
    brand: "Al Marjan Island",
    desc: "Ultra-luxury branded beachfront residences lead funnel and tracking.",
    section: "funnel",
    type: "Branded Residences",
    category: "Branded Residences",
    platform: "GoHighLevel Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-sobha-beachfront",
    name: "Sobha Beachfront",
    brand: "Sobha",
    desc: "Premium beachfront residences multi-step inquiry and booking funnel.",
    section: "funnel",
    type: "Luxury Real Estate",
    category: "Luxury Real Estate",
    platform: "Multi-Step Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-aldar-fahid",
    name: "Aldar Fahid Island",
    brand: "Aldar",
    desc: "Abu Dhabi coastal luxury island launch funnel and CRM capture.",
    section: "funnel",
    type: "Island Developments",
    category: "Island Developments",
    platform: "GoHighLevel Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-the-heights",
    name: "The Heights Country Club",
    brand: "Emaar",
    desc: "Wellness & country club luxury development conversion funnel.",
    section: "funnel",
    type: "Luxury Real Estate",
    category: "Luxury Real Estate",
    platform: "GoHighLevel Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-mega-property-show",
    name: "Dubai's 1st Mega Property Show",
    brand: "International Expo",
    desc: "Manila international property exhibition attendee capture and ticket funnel.",
    section: "funnel",
    type: "Global Expos",
    category: "Global Expos",
    platform: "Event Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-h-square-saas",
    name: "SaaS & ManyChat Automation",
    brand: "H Square",
    desc: "Multi-page GHL SaaS + Instagram DM automated lead qualification funnel.",
    section: "funnel",
    type: "DM Automation",
    category: "DM Automation",
    platform: "GHL + ManyChat",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-atelis-d3",
    name: "Atelis at D3",
    brand: "Meraas",
    desc: "Dubai Design District creative residences funnel & tracking architecture.",
    section: "funnel",
    type: "Urban Residences",
    category: "Urban Residences",
    platform: "GoHighLevel Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-masaar-3",
    name: "Masaar 3 Villas",
    brand: "Arada",
    desc: "Forest community luxury townhouses and villa opt-in funnel.",
    section: "funnel",
    type: "Villas & Communities",
    category: "Villas & Communities",
    platform: "GoHighLevel Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-malaysia-expo",
    name: "Malaysia Premier Property Expo",
    brand: "International Expo",
    desc: "Kuala Lumpur property roadshow multi-tier booking system.",
    section: "funnel",
    type: "Global Expos",
    category: "Global Expos",
    platform: "Event Booking Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-get-my-system",
    name: "Get My System",
    brand: "H Square",
    desc: "SaaS client onboarding and high-ticket agency sales funnel.",
    section: "funnel",
    type: "Agency SaaS",
    category: "Agency SaaS",
    platform: "GHL Onboarding Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-dm-automation",
    name: "DM Automation Funnel",
    brand: "H Square",
    desc: "Social media direct-response inbound pipeline with custom webhook routing.",
    section: "funnel",
    type: "DM Automation",
    category: "DM Automation",
    platform: "Webhook + ManyChat",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-palm-jebel-ali",
    name: "Palm Jebel Ali Showcase",
    brand: "Dubai Luxury",
    desc: "Iconic palm development investor presentation and high-intent inquiry capture.",
    section: "funnel",
    type: "Mega Projects",
    category: "Mega Projects",
    platform: "Investor Showcase",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-dubai-harbour",
    name: "Dubai Harbour Residences",
    brand: "Dubai Harbour",
    desc: "Maritime luxury lifestyle landing page and automated qualification sequence.",
    section: "funnel",
    type: "Waterfront",
    category: "Waterfront",
    platform: "Lead Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-jumeirah-golf",
    name: "Jumeirah Golf Estates",
    brand: "Jumeirah",
    desc: "Championship golf course luxury living funnel with virtual tour booking.",
    section: "funnel",
    type: "Golf Communities",
    category: "Golf Communities",
    platform: "Virtual Tour Funnel",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  },
  {
    id: "funnel-nad-al-sheba",
    name: "Nad Al Sheba Villas",
    brand: "Dubai Luxury",
    desc: "Family-oriented luxury villa community multi-step inquiry pipeline.",
    section: "funnel",
    type: "Villas & Communities",
    category: "Villas & Communities",
    platform: "Lead Pipeline",
    behanceUrl: "https://www.behance.net/mehmaqudsia",
    isArchived: true,
    status: "published",
  }
];

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size?: string;
  websiteAssociated?: string;
  createdAt: string;
}

export const initialMediaItems: MediaItem[] = [
  {
    id: "media-glp1-stalled",
    name: "Stalled GLP-1 Guide Screenshot",
    url: "/images/glp1-stalled-screenshot.jpg",
    websiteAssociated: "Stalled GLP-1 Guide — GLP-1 Support with Karen",
    createdAt: new Date().toISOString(),
  },
  {
    id: "media-kw-boats",
    name: "KW Boat Tours Screenshot",
    url: "/images/kw-boats-screenshot.png",
    websiteAssociated: "KW Boat Tours",
    createdAt: new Date().toISOString(),
  }
];

// Database operations
export function getStoredPortfolioItems(): PortfolioItem[] {
  if (typeof window === "undefined") return initialPortfolioItems;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPortfolioItems));
      return initialPortfolioItems;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Auto-merge any seed items that are newly added (like funnel-glp1-stalled)
      let needsSave = false;
      const merged = [...parsed];
      for (const seed of initialPortfolioItems) {
        const found = merged.find((m) => m.id === seed.id);
        if (!found) {
          merged.unshift(seed);
          needsSave = true;
        } else if (seed.id === "funnel-glp1-stalled" && !found.screenshotUrl) {
          found.screenshotUrl = seed.screenshotUrl;
          found.image = seed.image;
          needsSave = true;
        }
      }
      if (needsSave) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
      return merged;
    }
    return initialPortfolioItems;
  } catch (e) {
    console.error("Failed to read portfolio DB:", e);
    return initialPortfolioItems;
  }
}

export function savePortfolioItems(items: PortfolioItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("portfolio_db_updated", { detail: items }));
  } catch (e) {
    console.error("Failed to save portfolio DB:", e);
  }
}

export function addPortfolioItem(item: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">): PortfolioItem {
  const items = getStoredPortfolioItems();
  const newItem: PortfolioItem = {
    ...item,
    id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updated = [newItem, ...items];
  savePortfolioItems(updated);
  return newItem;
}

export function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): PortfolioItem | null {
  const items = getStoredPortfolioItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const updatedItem: PortfolioItem = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  items[index] = updatedItem;
  savePortfolioItems([...items]);
  return updatedItem;
}

export function deletePortfolioItem(id: string): boolean {
  const items = getStoredPortfolioItems();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  savePortfolioItems(filtered);
  return true;
}

export function resetPortfolioDb(): PortfolioItem[] {
  savePortfolioItems(initialPortfolioItems);
  return initialPortfolioItems;
}

export function exportPortfolioDbJson(): string {
  const items = getStoredPortfolioItems();
  return JSON.stringify(items, null, 2);
}

export function importPortfolioDbJson(jsonString: string): { success: boolean; count?: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, error: "Import data must be an array of portfolio items." };
    }
    savePortfolioItems(parsed);
    return { success: true, count: parsed.length };
  } catch (e: any) {
    return { success: false, error: e.message || "Invalid JSON format" };
  }
}

// Media library operations
export function getStoredMediaItems(): MediaItem[] {
  if (typeof window === "undefined") return initialMediaItems;
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(initialMediaItems));
      return initialMediaItems;
    }
    return JSON.parse(raw);
  } catch {
    return initialMediaItems;
  }
}

export function addMediaItem(media: Omit<MediaItem, "id" | "createdAt">): MediaItem {
  const list = getStoredMediaItems();
  const newItem: MediaItem = {
    ...media,
    id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...list];
  if (typeof window !== "undefined") {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("portfolio_media_updated", { detail: updated }));
  }
  return newItem;
}

export function deleteMediaItem(id: string): boolean {
  const list = getStoredMediaItems();
  const filtered = list.filter((m) => m.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("portfolio_media_updated", { detail: filtered }));
  }
  return true;
}

// React hook for reactive DB updates
export function usePortfolioDb() {
  const [items, setItems] = useState<PortfolioItem[]>(() => getStoredPortfolioItems());

  useEffect(() => {
    // Initial fetch on mount
    setItems(getStoredPortfolioItems());

    const handleUpdate = () => {
      setItems(getStoredPortfolioItems());
    };

    window.addEventListener("portfolio_db_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("portfolio_db_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const webProjects = items.filter((i) => i.section === "web" && i.status !== "draft");
  const funnelProjects = items.filter((i) => i.section === "funnel" && i.status !== "draft");

  return {
    items,
    webProjects,
    funnelProjects,
    addItem: addPortfolioItem,
    updateItem: updatePortfolioItem,
    deleteItem: deletePortfolioItem,
    resetDb: resetPortfolioDb,
    exportJson: exportPortfolioDbJson,
    importJson: importPortfolioDbJson,
  };
}

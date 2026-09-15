import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight, Terminal, Code2, Layers, Briefcase, Mail, MapPin, Smartphone, Zap, Globe, Settings, Users, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, Workflow, ArrowDown, RefreshCw, ChevronDown, ChevronUp, Cpu, Database, Bell, Eye, CheckCircle, Flame, ShieldAlert, AlertCircle, PhoneMissed, PhoneCall, MessageSquare, Send, Calendar, Clock, Tag, Target, UserX, Star, CheckCheck, Play, Maximize2, Compass, Waves, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import KWBoatsModal from "@/components/KWBoatsModal";
import SkinEditModal from "@/components/SkinEditModal";

// --- Data ---
export interface WebProject {
  name: string;
  desc: string;
  type: string;
  platform: string;
  url?: string;
  domain?: string;
  isInternalPreview?: boolean;
  highlights?: string[];
  featuredStartDate?: string;
  featuredDurationDays?: number;
  image?: string;
}

// 10-day featured duration helper:
// A project is featured for 10 days starting from featuredStartDate,
// after which it automatically displays as a simple/standard product card.
export function getFeaturedStatus(startDateStr?: string, durationDays = 10, simulateExpired = false) {
  if (!startDateStr || simulateExpired) {
    return {
      isFeatured: false,
      remainingDays: 0,
      currentDay: 0,
      totalDays: durationDays,
      expiryDate: null,
      expiryDateFormatted: ""
    };
  }

  const start = new Date(startDateStr).getTime();
  const totalDurationMs = durationDays * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const elapsedMs = now - start;

  const isFeatured = elapsedMs >= 0 && elapsedMs < totalDurationMs;
  const remainingMs = Math.max(0, totalDurationMs - elapsedMs);
  const remainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
  const currentDay = Math.min(durationDays, Math.max(1, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)) + 1));
  const expiryDate = new Date(start + totalDurationMs);
  const expiryDateFormatted = expiryDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return {
    isFeatured,
    remainingDays,
    currentDay,
    totalDays: durationDays,
    expiryDate,
    expiryDateFormatted
  };
}

const webDevProjects: WebProject[] = [
  { 
    name: "KW Boat Tours", 
    desc: "Key West boat charter & tour booking platform — custom WordPress & Elementor Pro build featuring curated excursion packages, category filtering, instant reservation checkout, and mobile-first speed optimization.", 
    type: "Travel & Boat Booking", 
    platform: "WordPress + Elementor", 
    url: "/preview/kw-boats", 
    domain: "kwboattours.com",
    isInternalPreview: true,
    highlights: ["Curated All-Day, Sunset & Dolphin Packages", "Interactive FAQ & Category Filter", "Instant Reservation Booking Flow"],
    featuredStartDate: "2026-09-02T00:00:00.000Z", // Feature window started Sept 2, 2026 (10-day active cycle)
    featuredDurationDays: 10,
    image: "/images/kw-boats-screenshot.png"
  },
  { name: "Dreamhive", desc: "Dubai luxury real estate web app — complete custom architecture with dynamic property listings and lead routing.", type: "Real Estate Web App", platform: "Full Stack / Next.js", url: "https://dreamhive.ae", domain: "dreamhive.ae" },
  { name: "The Travel Ceylon", desc: "Tour booking platform with custom inquiry dashboard, itinerary management, and client portal.", type: "Travel & Booking", platform: "Custom Web Platform", url: "https://thetravelceylon.com", domain: "thetravelceylon.com" },
  { name: "Better Way Real Estate", desc: "Custom WordPress real estate site for UAE property investment and off-plan showcases.", type: "Real Estate", platform: "WordPress", url: "https://better-way.ae", domain: "better-way.ae" },
  { name: "Coaching Alley", desc: "WordPress + ConvertKit email automation, lead magnet delivery, and student funnel system.", type: "Coaching & Education", platform: "WordPress + Automation", url: "https://coachingalley.com", domain: "coachingalley.com" },
  { name: "Travelkit", desc: "Custom payment architecture with dynamic multi-currency and method-specific pricing rules.", type: "Travel E-Commerce", platform: "Custom Payment Flow", url: "https://travelkit.lk", domain: "travelkit.lk" },
  { name: "Glow Body & Beauty", desc: "Staging-to-production full migration, theme customization, and payment gateway integration.", type: "Beauty & Wellness", platform: "WooCommerce", url: "https://glowbnb.com", domain: "glowbnb.com" },
  { name: "Allura Estrella", desc: "Custom Shopify storefront with installment payment integration, custom filters, and fast checkout.", type: "Fashion & Retail", platform: "Shopify", url: "https://www.alluraestrella.com", domain: "alluraestrella.com" },
  { name: "GloriousGifts.pk", desc: "Shopify build with Meta Pixel tracking, customized product fields, and ongoing maintenance.", type: "E-Commerce", platform: "Shopify", url: "https://www.gloriousgifts.pk", domain: "gloriousgifts.pk" },
  { name: "Fiable Luxury", desc: "Custom luxury brand experience with bespoke typography and high-end visual layout.", type: "Luxury E-Commerce", platform: "WordPress", url: "https://fiableluxury.com", domain: "fiableluxury.com" },
  { name: "Strivox Cleaning", desc: "Complete service website with instant quote calculator and booking workflows for Australia.", type: "Commercial Services", platform: "WordPress", url: "https://strivoxcleaning.com.au", domain: "strivoxcleaning.com.au" },
  { name: "Mstore", desc: "WooCommerce multi-category store with automated inventory sync and installment payment plugins.", type: "Retail Store", platform: "WooCommerce" },
  { name: "Samley Teas", desc: "Global tea exporter e-commerce portal with international shipping and wholesale catalogs.", type: "Food & Beverage", platform: "WooCommerce" },
];

const funnelProjects = [
  { 
    name: "The Skin Edit — Luna Skin Lab", 
    brand: "Luna Skin Lab", 
    desc: "Direct-response skincare sales funnel featuring live countdown urgency, scientific reframe copy, interactive FAQ accordion, and dynamic 1-click order bump ($27 base + $17 bump).", 
    category: "Aesthetics & E-Commerce", 
    url: "/preview/skin-edit", 
    domain: "lunaskinlab.com/the-skin-edit",
    isInternalPreview: true
  },
  { name: "The Oasis by Emaar", brand: "Emaar", desc: "Luxury master community funnel & SEO-optimised lead generation architecture", category: "Luxury Real Estate", url: "https://theoasis-emaar.com", domain: "theoasis-emaar.com" },
  { name: "Grand Polo Club & Resort", brand: "Emaar", desc: "Exclusive equestrian resort & luxury villas landing page and conversion funnel", category: "Luxury Real Estate", url: "https://grandpoloemaar.com", domain: "grandpoloemaar.com" },
  { name: "MBR City District One", brand: "Meydan / District One", desc: "Phase 1 & Phase 2 waterfront mansion lead capture systems", category: "Luxury Real Estate", url: "https://phaseone-district1west.com", domain: "phaseone-district1west.com" },
  { name: "Nikki Beach Residences", brand: "Al Marjan Island", desc: "Ultra-luxury branded beachfront residences lead funnel and tracking", category: "Branded Residences", url: "https://almarjan-nikkibeach.com/nikki-beach-1795", domain: "almarjan-nikkibeach.com" },
  { name: "Tilal Binghatti", brand: "Binghatti", desc: "AI-powered custom app funnel & high-converting SEO property showcase", category: "Luxury Real Estate", url: "https://tilal.eliteestatesuae.com", domain: "tilal.eliteestatesuae.com" },
  { name: "Sobha Beachfront", brand: "Sobha", desc: "Premium beachfront residences multi-step inquiry and booking funnel", category: "Luxury Real Estate", url: "https://sobha-beachfront.com/sobhas-beachfront-luxury-residences", domain: "sobha-beachfront.com" },
  { name: "Aldar Fahid Island", brand: "Aldar", desc: "Abu Dhabi coastal luxury island launch funnel and CRM capture", category: "Island Developments", url: "https://aldar-fahidisland.com", domain: "aldar-fahidisland.com" },
  { name: "The Heights Country Club", brand: "Emaar", desc: "Wellness & country club luxury development conversion funnel", category: "Luxury Real Estate", url: "https://emaar-theheights.com", domain: "emaar-theheights.com" },
  { name: "Dubai's 1st Mega Property Show", brand: "International Expo", desc: "Manila international property exhibition attendee capture and ticket funnel", category: "Global Expos", url: "https://manila.dandkproperties.ae/dubais-1st-mega-property-expo", domain: "manila.dandkproperties.ae" },
  { name: "SaaS & ManyChat Automation", brand: "H Square", desc: "Multi-page GHL SaaS + Instagram DM automated lead qualification funnel", category: "DM Automation", url: "https://hsquareautomation.com/manychat-page", domain: "hsquareautomation.com" },
  { name: "Atelis at D3", brand: "Meraas", desc: "Dubai Design District creative residences funnel & tracking architecture", category: "Urban Residences" },
  { name: "Masaar 3 Villas", brand: "Arada", desc: "Forest community luxury townhouses and villa opt-in funnel", category: "Villas & Communities" },
  { name: "Malaysia Premier Property Expo", brand: "International Expo", desc: "Kuala Lumpur property roadshow multi-tier booking system", category: "Global Expos" },
  { name: "Get My System", brand: "H Square", desc: "SaaS client onboarding and high-ticket agency sales funnel", category: "Agency SaaS" },
  { name: "DM Automation Funnel", brand: "H Square", desc: "Social media direct-response inbound pipeline with custom webhook routing", category: "DM Automation" },
  { name: "Palm Jebel Ali Showcase", brand: "Dubai Luxury", desc: "Iconic palm development investor presentation and high-intent inquiry capture", category: "Mega Projects" },
  { name: "Dubai Harbour Residences", brand: "Dubai Harbour", desc: "Maritime luxury lifestyle landing page and automated qualification sequence", category: "Waterfront" },
  { name: "Jumeirah Golf Estates", brand: "Jumeirah", desc: "Championship golf course luxury living funnel with virtual tour booking", category: "Golf Communities" },
  { name: "Nad Al Sheba Villas", brand: "Dubai Luxury", desc: "Family-oriented luxury villa community multi-step inquiry pipeline", category: "Villas & Communities" },
];

const aiApps = [
  { 
    name: "Naighban (Nigheban) — AI Neighborhood Safety App", 
    desc: "AI-powered Android app for community safety reporting in Pakistan ('Naighban / Nigheban' meaning guardian in Urdu). Built solo during AI Seekho Builders Day 2026 (GDG & NIC Islamabad) under live event constraints. Gives residents a fast, intuitive way to report neighborhood hazards and safety concerns with intelligent automated routing, eliminating complex forms and unanswered hotlines. Delivered through an integrated pipeline: Stitch MCP for UX design, Google Antigravity for logic scaffolding, React & Tailwind for mobile-first UI, and compiled into a standalone native APK in Android Studio.", 
    tag: "Android & AI App · GDG / NIC Islamabad",
    highlights: [
      "Solo hackathon build from concept to native Android APK",
      "Full pipeline: Stitch MCP + Google Antigravity + React + Android Studio",
      "Intelligent report triage & automated hazard routing",
      "Tested on physical devices & built under live time constraints"
    ],
    architecture: [
      {
        step: 1,
        title: "Resident report",
        details: ["Description, street, time"],
        role: "Mobile Incident Intake",
        type: "input",
        theme: {
          bg: "bg-emerald-950/30",
          border: "border-emerald-500/40",
          text: "text-emerald-300",
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
          accent: "#10b981",
          subtext: "text-emerald-200/80",
          icon: Smartphone
        }
      },
      {
        step: 2,
        title: "App state storage",
        details: ["Reports plus mock credit balance"],
        role: "Local State & Cache",
        type: "storage",
        theme: {
          bg: "bg-emerald-950/30",
          border: "border-emerald-500/40",
          text: "text-emerald-300",
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
          accent: "#10b981",
          subtext: "text-emerald-200/80",
          icon: Database
        }
      },
      {
        step: 3,
        title: "AI severity reasoning",
        details: ["Checks nearby reports and keywords", "Outputs severity, confidence, reason"],
        role: "Gemini Intelligence Engine",
        type: "ai",
        theme: {
          bg: "bg-indigo-950/35",
          border: "border-indigo-500/50",
          text: "text-indigo-200",
          badge: "bg-indigo-500/20 text-indigo-200 border-indigo-500/40",
          accent: "#818cf8",
          subtext: "text-indigo-200/80",
          icon: Cpu
        }
      },
      {
        step: 4,
        title: "Action simulation",
        details: ["Confirmed reports create alert ticket"],
        role: "Rule & Dispatch Trigger",
        type: "simulation",
        theme: {
          bg: "bg-amber-950/30",
          border: "border-amber-500/45",
          text: "text-amber-200",
          badge: "bg-amber-500/20 text-amber-200 border-amber-500/40",
          accent: "#f59e0b",
          subtext: "text-amber-200/80",
          icon: Bell
        }
      },
      {
        step: 5,
        title: "Authority dashboard",
        details: ["Ticket list sorted by severity with reason"],
        role: "Municipal Triage Console",
        type: "dashboard",
        theme: {
          bg: "bg-rose-950/30",
          border: "border-rose-500/45",
          text: "text-rose-200",
          badge: "bg-rose-500/20 text-rose-200 border-rose-500/40",
          accent: "#f43f5e",
          subtext: "text-rose-200/80",
          icon: ShieldAlert
        }
      },
      {
        step: 6,
        title: "Resolution",
        details: ["Status updates, resident sees outcome"],
        role: "Closed-Loop Citizen Outcome",
        type: "resolution",
        theme: {
          bg: "bg-stone-900/40",
          border: "border-stone-500/40",
          text: "text-stone-200",
          badge: "bg-stone-500/20 text-stone-200 border-stone-500/30",
          accent: "#a8a29e",
          subtext: "text-stone-300/80",
          icon: CheckCircle
        }
      }
    ],
    loopNote: "↺ new reports keep flowing into storage"
  },
  { 
    name: "Dreamhive — AI Real Estate Website", 
    desc: "Dubai luxury real estate platform built with AI — intelligent property matching, dynamic listings, and automated lead capture flowing directly into GoHighLevel CRM pipelines and automated follow-up sequences.", 
    tag: "AI Real Estate Platform",
    url: "https://dreamhive.ae",
    domain: "dreamhive.ae",
    highlights: ["Intelligent property filtering", "GHL CRM automatic pipeline sync", "Dynamic Dubai off-plan database"]
  },
  { 
    name: "Tilal Binghatti — AI Real Estate App", 
    desc: "Custom AI-assisted real estate application built for Dubai's Binghatti development — interactive property exploration, intelligent filtering, and inquiry forms connected to instant lead qualification. Features both a Replit AI interactive application and production showcase.", 
    tag: "Replit AI + Production",
    url: "https://tilal.eliteestatesuae.com",
    domain: "tilal.eliteestatesuae.com",
    altUrl: "https://tilal-binghatti-dream-hive-real-estate.replit.app",
    altLabel: "Replit AI App",
    highlights: ["Instant unit exploration & filtering", "Dynamic listing data & lead qualification", "Connected to GHL automated sequences"]
  },
  { 
    name: "Sanitary Hardware POS", 
    desc: "Full-featured Point of Sale system for a sanitaryware, tiles, and hardware retail store — built in Base44. Handles batch & lot tracking for colour/shade consistency across tile orders, flexible UoM conversion (sq. meter, sq. foot, box, length, bundle), kitting for multi-part sets with automatic component deduction, and a built-in area-to-box calculator with waste margin. Includes supplier ledgers, employee payroll & commission tracking, and real-time inventory control with low-stock alerts and multi-location warehouse support.", 
    tag: "Base44 Business App",
    url: "https://sanitary-hardware-pos.base44.app",
    domain: "sanitary-hardware-pos.base44.app",
    highlights: ["Batch/lot tracking per tile shade", "Dual pricing: retail vs. wholesale contractors", "Area-to-box calculator with waste margins", "Contractor ledger & aging receivables"]
  },
  { 
    name: "Designbey — Design & Web Tool", 
    desc: "Interactive website and design workflow tool application built on Base44 for modern web design scoping and asset configuration.", 
    tag: "Base44 App",
    url: "https://design-masters-cf38fa7a.base44.app",
    domain: "design-masters-cf38fa7a.base44.app",
    highlights: ["Interactive design tool workflows", "Cloud-hosted on Base44", "Rapid client scoping interface"]
  },
  { 
    name: "Mahir — AI-Verified Service Network", 
    desc: "Pakistan's First AI-Verified Service Network — Google AI Seekho 2026 Hackathon — 9 Gemini AI agents deployed on Google Cloud Run. Connects customers to verified blue-collar workers in under 60 seconds. Workers need no smartphone — AI calls them directly in Urdu with voice verification.", 
    tag: "Gemini AI Architecture",
    highlights: ["9 Autonomous Gemini agents on Cloud Run", "Urdu voice telephony for workers without smartphones", "Sub-60s verified job dispatch"]
  },
];

const experience = [
  { role: "GHL CRM Specialist & Funnel Builder", company: "H Square Automations", location: "Remote", period: "Jan 2026 – Present", desc: "End-to-end GHL sub-account setup and funnel builds for agency clients — snapshots, funnel design, form builds, pipeline architecture, custom tags, custom values, automated workflows, calendar configuration, and full sub-account setup from scratch.", current: true },
  { role: "GHL, WordPress & Shopify Developer", company: "Retrographic Digital", location: "Remote – Dubai", period: "Nov 2024 – Mar 2026", desc: "Designed and delivered 20+ GHL funnels for UAE luxury real estate brands including Emaar, Meraas, Aldar, Sobha, and Nikki Beach Residences. Coordinated client deliveries and maintained WordPress and Shopify sites." },
  { role: "WordPress Developer & Team Leader", company: "DesignBey", location: "Remote – Sri Lanka", period: "Mar 2022 – 2025", desc: "Led a team delivering 15+ WordPress projects across e-commerce, hospitality, and service sectors. Managed client communication, timelines, and plugin/theme builds." },
  { role: "WordPress Developer", company: "Digi Pro Ventures", location: "Remote – Pakistan", period: "Jul 2023 – Dec 2024", desc: "WordPress builds for real estate and e-commerce clients. Theme installation, WooCommerce setup, payment gateway integrations." },
  { role: "Freelance Developer", company: "Upwork", location: "Remote", period: "2020 – Present", desc: "40+ client projects including e-commerce stores, branding websites, email automation setups, and custom WordPress solutions." },
];

const certifications = [
  { title: "SEO Course", issuer: "Ghulam Ali DMD", year: "2025", type: "SEO" },
  { title: "Search Engine Optimization", issuer: "PROtechSoft", year: "2024", type: "SEO" },
  { title: "Online Social Media Marketing", issuer: "PITB", year: "2023", type: "Marketing" },
  { title: "#SheMeansBusiness Training Partner", issuer: "Facebook × Femprow", year: "2021", type: "Business" },
  { title: "#SheMeansBusiness Training Partner", issuer: "Facebook × USAID", year: "2021", type: "Business" },
];

const skills = [
  { category: "Funnel Design", items: ["GoHighLevel (GHL)", "Funnel Architecture", "Meta Pixel", "Google Ads", "UTM Tracking"] },
  { category: "Web Dev", items: ["WordPress", "Shopify", "WooCommerce", "Elementor", "Divi", "HTML", "CSS", "JavaScript"] },
  { category: "Automation", items: ["ManyChat", "ConvertKit", "Zapier", "Webhooks"] },
  { category: "AI & Apps", items: ["GHL AI Bot", "Replit Apps", "Base44", "Prompt Engineering", "Google Gemini"] },
  { category: "Marketing", items: ["SEO", "Meta Ads", "Google Ads", "Email Automation"] },
];

const services = [
  {
    icon: Layers,
    title: "GHL Funnel Design",
    tagline: "High-converting funnels that look like a million dollars",
    desc: "From single opt-in pages to multi-step funnel systems — I design and build GHL funnels that convert. Every page is optimised for speed, mobile-first, and wired up with tracking.",
    deliverables: ["Landing page + thank you page", "Lead capture & booking forms", "Meta Pixel + Google Ads tracking", "UTM parameter setup", "SEO-optimised copy structure", "Multi-language variants available"],
    ideal: "Agencies, real estate brands, coaches, service businesses",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Settings,
    title: "GHL Full CRM Setup",
    tagline: "Your entire GHL sub-account built from scratch",
    desc: "Full end-to-end GoHighLevel sub-account configuration — pipelines, custom fields, tags, snapshots, forms, automation triggers, calendars, and user roles. You hand me a blank sub-account, I hand back a ready-to-run system.",
    deliverables: ["Pipeline architecture & stages", "Custom values & custom fields", "Tag structure & segmentation", "Snapshot creation & deployment", "Form & survey builds", "Workflow trigger setup", "Calendar & booking config"],
    ideal: "GHL agencies needing a reliable embedded specialist",
    accent: "from-green-900/30 to-green-950/10",
  },
  {
    icon: Globe,
    title: "WordPress & Shopify Builds",
    desc: "Production-ready websites built to convert — not just to look good. Custom themes, WooCommerce stores, payment integrations, and full staging-to-production migrations.",
    deliverables: ["Custom theme design (Elementor / Divi)", "WooCommerce + payment gateway setup", "Staging-to-production migration", "Performance optimisation", "SEO on-page setup", "Plugin configuration & security"],
    ideal: "Businesses needing a professional web presence fast",
    tagline: "Custom sites that actually rank and convert",
    accent: "from-primary/10 to-transparent",
  },
  {
    icon: Users,
    title: "Agency Team Support",
    tagline: "Embedded GHL specialist — just add to your team",
    desc: "I slot into your agency's existing workflow as a dedicated GHL builder. White-label friendly. I work to your briefs, your timelines, and your client standards — no handholding needed.",
    deliverables: ["GHL sub-account builds per client", "Funnel & landing page delivery", "Snapshot builds for your agency", "Forms, pipelines, tags, custom values", "Consistent turnaround times", "Direct communication — no delays"],
    ideal: "GHL agencies with overflow work or needing a reliable contractor",
    accent: "from-primary/15 to-primary/3",
  },
];

const brands = [
  "Emaar", "Meraas", "Aldar", "Sobha", "Nikki Beach Residences",
  "Binghatti", "Dreamhive", "DesignBey", "Strivox", "H-Square",
];

const automationCaseStudies = [
  {
    id: "case-1",
    caseNumber: "01",
    title: "Missed Call Text-Back",
    category: "Lead Capture",
    icon: PhoneMissed,
    problem: "Every missed call was a potential lost lead. The front desk couldn't always pick up during busy hours, and callers who got voicemail rarely called back — they just moved on to the next business.",
    solution: "Built an instant \"missed call → text\" automation that fires the moment a call goes unanswered. The lead receives a friendly SMS asking what they were calling about, is tagged as a new lead, and is automatically dropped into the sales pipeline at the \"New Inquiry\" stage — no manual entry required.",
    tools: ["Workflows", "SMS", "Pipelines", "Contact Tagging"],
    results: [
      "0-minute response time on missed calls, down from hours (or never)",
      "100% of missed calls automatically captured as tracked leads instead of being lost",
      "Zero manual follow-up required from front-desk staff"
    ],
    clientContext: "Healthcare / aesthetics practice with high call volume and limited front-desk coverage during peak hours.",
    workflowTrigger: "Inbound Call – Status: Missed / No Answer",
    workflowSteps: [
      { step: "Trigger", label: "Inbound Call – Missed / No Answer", type: "trigger", icon: PhoneCall },
      { step: "Action", label: "Send Instant SMS (\"Hi! Missed your call, how can we assist?\")", type: "sms", icon: MessageSquare },
      { step: "Action", label: "Add Tag: [lead: missed-call]", type: "tag", icon: Tag },
      { step: "Action", label: "Create Opportunity in Pipeline -> Stage: \"New Inquiry\"", type: "pipeline", icon: Target }
    ]
  },
  {
    id: "case-2",
    caseNumber: "02",
    title: "New Lead Instant Follow-Up",
    category: "Lead Capture",
    icon: Send,
    problem: "Leads who opted into a promo often went cold within hours because follow-up depended on a staff member remembering to reach out. There was no consistent, immediate touchpoint after opt-in.",
    solution: "Designed a multi-channel instant-response sequence: the moment a lead submits the Promo Opt-In form, they receive a confirmation SMS and a welcome email simultaneously. If they haven't booked within 2 hours, the assigned staff member gets an internal alert with the lead's full context (name, phone, treatment interest) so they can personally follow up. If still no booking after 24 hours, a second SMS nudges them toward the booking link. The workflow automatically exits and stops nurture messaging the moment an appointment is booked.",
    tools: ["Workflows", "SMS", "Email Templates", "Internal Notifications", "Pipelines", "Workflow Goals", "Tagging"],
    results: [
      "Lead response time reduced from \"whenever staff got to it\" to instant",
      "Staff notified automatically within 2 hours on any lead at risk of going cold",
      "Prevented double-messaging by auto-exiting leads once they booked"
    ],
    clientContext: "Healthcare / aesthetics practice running paid promo campaigns to generate new consultation leads.",
    workflowTrigger: "Form Submitted – Promo Opt-In Form",
    workflowSteps: [
      { step: "Trigger", label: "Form Submitted: Promo Opt-In Landing Page", type: "trigger", icon: Zap },
      { step: "Action", label: "Send SMS Confirmation + Welcome Email Simultaneously", type: "sms", icon: MessageSquare },
      { step: "Wait", label: "Wait 2 Hours & Evaluate Goal: Appointment Booked?", type: "delay", icon: Clock },
      { step: "Action", label: "Internal Alert: Notify Staff with Lead Details & Treatment Interest", type: "notification", icon: Bell },
      { step: "Wait", label: "Wait 24 Hours -> Follow-up SMS Nudge with Booking Calendar Link", type: "sms", icon: Send },
      { step: "Goal", label: "Goal Achieved: Auto-Exit Workflow on Appointment Booked", type: "goal", icon: CheckCircle }
    ]
  },
  {
    id: "case-3",
    caseNumber: "03",
    title: "Appointment Booking Confirmation",
    category: "Booking & Retention",
    icon: Calendar,
    problem: "No-shows and last-minute cancellations were common, largely because clients had no reminders between booking and their appointment date, and confirmations were inconsistent.",
    solution: "Built an automated confirmation and reminder sequence triggered the moment an appointment is booked on either calendar. It removes the lead from the nurture workflow immediately, sends an SMS + email confirmation, updates the pipeline to \"Consultation Booked,\" and then sends timed reminder texts at 48 hours and 2 hours before the appointment — reducing forgotten appointments without any manual reminder calls.",
    tools: ["Workflows", "Calendars", "SMS", "Email Templates", "Pipelines", "Workflow Removal Actions"],
    results: [
      "Automated reminders at two key intervals (48hr, 2hr) with zero manual effort",
      "Reduced no-show risk through consistent, timely touchpoints",
      "Clean handoff from \"lead\" to \"booked client\" pipeline stage in real time"
    ],
    clientContext: "Healthcare / aesthetics practice managing two active booking calendars for consultations and intake appointments.",
    workflowTrigger: "Appointment Booked (Consultation / Intake Calendar)",
    workflowSteps: [
      { step: "Trigger", label: "Appointment Status: Confirmed on Calendar", type: "trigger", icon: Calendar },
      { step: "Action", label: "Remove Contact from All Lead Nurture & Promo Workflows", type: "action", icon: UserX },
      { step: "Action", label: "Send Instant SMS + Email Confirmation with Calendar Invite", type: "sms", icon: MessageSquare },
      { step: "Action", label: "Update Pipeline Stage -> \"Consultation Booked\"", type: "pipeline", icon: Target },
      { step: "Wait", label: "48 Hours Before Appointment: Send Prep Instructions SMS", type: "delay", icon: Clock },
      { step: "Wait", label: "2 Hours Before Appointment: Final Reminder & Clinic Location SMS", type: "sms", icon: Bell }
    ]
  },
  {
    id: "case-4",
    caseNumber: "04",
    title: "No-Show Recovery",
    category: "Booking & Retention",
    icon: UserX,
    problem: "Clients who no-showed were typically written off — there was no system to re-engage them, meaning marketing spend that generated the original lead was wasted.",
    solution: "Built a recovery sequence that triggers automatically when an appointment is marked \"No-Show.\" The client receives an understanding, low-pressure SMS with a direct rebooking link 30 minutes after the missed appointment, gets tagged and moved into a \"Lost / No Show\" pipeline stage, and receives a second gentle nudge 3 days later if they haven't rebooked.",
    tools: ["Workflows", "SMS", "Pipelines", "Tagging", "Conditional Logic"],
    results: [
      "Automatic re-engagement of every no-show lead, recovering leads that previously went cold",
      "No manual tracking needed to identify who no-showed and follow up",
      "Two-touch recovery sequence increased chances of rebooking without overwhelming the client"
    ],
    clientContext: "Healthcare / aesthetics practice looking to protect the ROI of paid lead generation by reducing wasted no-shows.",
    workflowTrigger: "Appointment Status Changed – \"No-Show\"",
    workflowSteps: [
      { step: "Trigger", label: "Appointment Status Updated -> Marked \"No-Show\"", type: "trigger", icon: AlertCircle },
      { step: "Wait", label: "Wait 30 Minutes Post-Appointment Time", type: "delay", icon: Clock },
      { step: "Action", label: "Send Understanding, Low-Pressure Rebooking SMS + Direct Link", type: "sms", icon: MessageSquare },
      { step: "Action", label: "Add Tag [status: no-show] & Move Pipeline to \"Lost / No Show\"", type: "pipeline", icon: Tag },
      { step: "Wait", label: "Wait 3 Days -> Check Rebooking -> If None, Send Second Gentle Nudge", type: "sms", icon: Send }
    ]
  },
  {
    id: "case-5",
    caseNumber: "05",
    title: "Post-Visit Follow-Up & Review Request",
    category: "Booking & Retention",
    icon: Star,
    problem: "Happy clients weren't being asked for reviews at the right moment, and there was no structured way to stay top-of-mind for future upsells after a completed visit.",
    solution: "Built a post-visit sequence triggered when an appointment is marked \"Completed.\" Clients get a warm check-in SMS 2 hours after their visit, are tagged as active clients and moved into a Rebooking Pipeline, then receive a review request SMS 24 hours later, followed by an upsell email 7 days out — timed so each message has room to land without overwhelming the client.",
    tools: ["Workflows", "SMS", "Email Templates", "Pipelines", "Tagging"],
    results: [
      "Consistent review-request timing captured feedback while the experience was still fresh",
      "Automated upsell touchpoint at Day 7 with zero manual follow-up",
      "Clear pipeline visibility into which clients are active vs. past"
    ],
    clientContext: "Healthcare / aesthetics practice relying on reviews and repeat visits to drive local reputation and rebookings.",
    workflowTrigger: "Appointment Status Changed – \"Completed / Checked Out\"",
    workflowSteps: [
      { step: "Trigger", label: "Appointment Marked as \"Completed\" in Clinic Portal", type: "trigger", icon: CheckCircle2 },
      { step: "Wait", label: "Wait 2 Hours: Send Post-Treatment Aftercare Check-in SMS", type: "sms", icon: MessageSquare },
      { step: "Action", label: "Add Tag [active-client] & Move to \"Rebooking Pipeline\"", type: "pipeline", icon: Tag },
      { step: "Wait", label: "Wait 24 Hours: Automated Google Review Request SMS + Feedback Link", type: "sms", icon: Star },
      { step: "Wait", label: "Wait 7 Days: Send Tailored Complementary Treatment Upsell Email", type: "action", icon: Mail }
    ]
  },
  {
    id: "case-6",
    caseNumber: "06",
    title: "Keyword Trigger Auto-Reply",
    category: "Lead Capture",
    icon: MessageSquare,
    problem: "Prospects texting in with specific questions (about booking, or specific treatments like Botox or laser) often waited hours for a reply, especially outside business hours, causing drop-off before they ever entered the funnel.",
    solution: "Set up keyword-triggered auto-replies across common inbound terms (CONSULTATION, BOOKING, BOOK, APPOINTMENT, BOTOX, FILLER, LASER). Any inbound text containing these words instantly receives a booking link and a human-sounding reply, and is automatically added to the pipeline if not already tracked — turning casual texts into captured leads instantly, 24/7.",
    tools: ["Workflows", "Keyword Triggers", "SMS", "Pipelines"],
    results: [
      "Instant (24/7) response to treatment-specific inquiries, even outside business hours",
      "No inbound text went unanswered or untracked",
      "Reduced staff burden of manually replying to routine booking questions"
    ],
    clientContext: "Healthcare / aesthetics practice fielding frequent treatment-specific SMS inquiries from both new and existing contacts.",
    workflowTrigger: "Customer Replied – Keywords: CONSULTATION, BOOK, BOTOX, FILLER, LASER",
    workflowSteps: [
      { step: "Trigger", label: "Inbound SMS Contains Matching Keywords (BOTOX, BOOK, LASER, etc.)", type: "trigger", icon: Zap },
      { step: "Action", label: "Send Instant Intelligent Auto-Reply + Treatment-Specific Booking URL", type: "sms", icon: MessageSquare },
      { step: "Action", label: "Assign Message to Front-Desk Staff Unread Inbox", type: "notification", icon: Users },
      { step: "Action", label: "If Contact Untracked -> Create Opportunity in Pipeline Stage \"New Inquiry\"", type: "pipeline", icon: Target }
    ]
  },
  {
    id: "case-7",
    caseNumber: "07",
    title: "90-Day Reactivation",
    category: "Nurture & Reactivation",
    icon: RefreshCw,
    problem: "The client had a large base of past leads and clients who had gone quiet, representing a pool of \"already warm\" prospects that wasn't being actively marketed to.",
    solution: "Built a scheduled reactivation campaign that automatically pulls in any contact who hits the 90-day lapsed mark. It delivers a personal-feeling SMS + a detailed offer email on Day 1, a follow-up SMS after 4 days of no response, and a final, no-pressure closing message after 7 more days — giving lapsed contacts three genuine touchpoints before letting them rest.",
    tools: ["Workflows", "Smart Lists", "Scheduled Triggers", "SMS", "Email Templates", "Pipelines", "Tagging"],
    results: [
      "Fully automated re-engagement of the entire lapsed-lead database on a rolling 90-day basis",
      "Three-touch sequence maximized re-engagement without appearing pushy",
      "Recovered pipeline value from contacts who had otherwise gone cold"
    ],
    clientContext: "Healthcare / aesthetics practice with an existing client database looking to generate repeat revenue without new ad spend.",
    workflowTrigger: "Smart List Filter – Contact Last Appointment > 90 Days Ago",
    workflowSteps: [
      { step: "Trigger", label: "Contact Enters Smart List: [Lapsed Past Client: 90+ Days]", type: "trigger", icon: RefreshCw },
      { step: "Action", label: "Day 1: Personal Touchpoint SMS + Exclusive Comeback VIP Offer Email", type: "sms", icon: Send },
      { step: "Wait", label: "Wait 4 Days & Check Condition: Contact Replied or Booked?", type: "delay", icon: Clock },
      { step: "Action", label: "If No Response -> Send Day 4 Friendly Check-in SMS", type: "sms", icon: MessageSquare },
      { step: "Wait", label: "Wait 7 Days -> Send Final Soft Closing SMS Before Archiving to Rest", type: "sms", icon: CheckCircle }
    ]
  },
  {
    id: "case-8",
    caseNumber: "08",
    title: "Lead Nurture Email Sequence",
    category: "Nurture & Reactivation",
    icon: Mail,
    problem: "Leads who opted in but didn't book right away had no long-term nurture path — they either got forgotten or bombarded, with no middle ground.",
    solution: "Built a silent, background email nurture sequence that activates for any lead tagged \"nurture-sequence\" who hasn't booked. Over 15 days, it delivers a structured trust-building arc: what to expect, social proof, FAQ/objection handling, and a final soft-offer nudge — with a single supporting SMS on Day 15 to drive attention back to the inbox. A workflow goal automatically exits any lead who books at any point, and the sequence cleanly stops itself on Day 16 rather than over-emailing cold leads.",
    tools: ["Workflows", "Email Templates", "Tagging", "Workflow Goals", "SMS"],
    results: [
      "Structured 15-day nurture path replaced inconsistent, manual follow-up",
      "Built-in exit logic prevented booked clients from receiving irrelevant nurture content",
      "Self-terminating sequence protected sender reputation by avoiding spam-like over-messaging"
    ],
    clientContext: "Healthcare / aesthetics practice needing a scalable way to nurture opted-in leads who need more time before booking.",
    workflowTrigger: "Tag Added: [nurture-sequence] & Unbooked Lead",
    workflowSteps: [
      { step: "Trigger", label: "Tag Added: [nurture-sequence] (Unbooked Consultation Leads)", type: "trigger", icon: Tag },
      { step: "Day 2", label: "Email 1: What to Expect During Your Aesthetic Consultation", type: "action", icon: Mail },
      { step: "Day 5", label: "Email 2: Real Patient Transformation Case Studies & Social Proof", type: "action", icon: Star },
      { step: "Day 10", label: "Email 3: Doctor FAQ & Answering Common Treatment Concerns", type: "action", icon: AlertCircle },
      { step: "Day 15", label: "Email 4: Limited VIP Consultation Voucher + Supporting Attention SMS", type: "sms", icon: Send },
      { step: "Goal", label: "Auto-Exit on Goal: Appointment Booked (Terminates on Day 16)", type: "goal", icon: CheckCircle2 }
    ]
  }
];

// --- Components ---

interface ArchitectureStep {
  step: number;
  title: string;
  details: string[];
  role: string;
  type: string;
  theme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    accent: string;
    subtext: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

function ArchitectureFlowViewer({ 
  architecture, 
  loopNote 
}: { 
  architecture: ArchitectureStep[]; 
  loopNote?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="mt-6 pt-6 border-t border-border/60">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-primary/10 text-primary border border-primary/30">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <span>System Architecture Flow</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-primary/15 text-primary border border-primary/30 font-normal">
                6-Stage Pipeline
              </span>
            </h4>
            <p className="text-xs text-muted-foreground font-mono">
              Citizen hazard ingestion • Gemini spatial-semantic triage • Closed-loop feedback
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-primary bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors rounded cursor-pointer"
        >
          <span>{isExpanded ? "Hide Flow Diagram" : "View Architecture Flow"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 rounded-xl border border-border/80 bg-background/70 p-5 sm:p-7 backdrop-blur-md relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <div className="max-w-xl mx-auto flex flex-col items-center relative z-10">
            {architecture.map((node, idx) => {
              const IconComp = node.theme.icon;
              const isActive = activeStep === node.step;

              return (
                <React.Fragment key={node.step}>
                  {/* Stage Node Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => setActiveStep(isActive ? null : node.step)}
                    className={`w-full group cursor-pointer transition-all duration-200 rounded-2xl border ${node.theme.border} ${node.theme.bg} p-4 sm:p-5 hover:scale-[1.01] shadow-sm hover:shadow-md ${
                      isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div className={`p-2 rounded-xl border ${node.theme.border} bg-card/80 text-white shrink-0 mt-0.5`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/90">
                              0{node.step}
                            </span>
                            <h5 className={`text-base sm:text-lg font-bold tracking-tight ${node.theme.text}`}>
                              {node.title}
                            </h5>
                          </div>

                          <div className="mt-1 space-y-0.5">
                            {node.details.map((detail, dIdx) => (
                              <p key={dIdx} className={`text-xs sm:text-sm font-mono ${node.theme.subtext}`}>
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <span className={`hidden sm:inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${node.theme.badge} shrink-0`}>
                        {node.role}
                      </span>
                    </div>
                  </motion.div>

                  {/* Downward Connector Arrow */}
                  {idx < architecture.length - 1 && (
                    <div className="my-2 flex flex-col items-center">
                      <div className="w-px h-3 bg-border" />
                      <div className="p-1 rounded-full bg-card border border-border/80 text-muted-foreground shadow-sm">
                        <ArrowDown className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="w-px h-3 bg-border" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Continuous Loop indicator */}
            {loopNote && (
              <div className="mt-6 w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-card/90 border border-dashed border-primary/40 text-primary/95 text-xs sm:text-sm font-mono tracking-wide shadow-sm">
                <RefreshCw className="w-4 h-4 animate-[spin_8s_linear_infinite] text-primary shrink-0" />
                <span>{loopNote}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function WorkflowCanvasMockup({ study }: { study: typeof automationCaseStudies[0] }) {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-border/80 bg-background/90 overflow-hidden shadow-lg flex flex-col h-full">
      {/* GHL Workflow Builder Header Mockup */}
      <div className="px-4 py-2.5 bg-card/95 border-b border-border flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-muted-foreground/60">|</span>
          <span className="text-foreground font-semibold truncate flex items-center gap-1.5">
            <Workflow className="w-3.5 h-3.5 text-primary" />
            <span>GHL Canvas: {study.title}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Published & Active
          </span>
          <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted/40 border border-border">
            v2.4
          </span>
        </div>
      </div>

      {/* Visual Workflow Canvas Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] bg-card/40 relative">
        <div className="space-y-2.5 relative z-10 max-w-md mx-auto w-full">
          {study.workflowSteps.map((step, sIdx) => {
            const StepIcon = step.icon || Workflow;
            const isTrigger = step.step === "Trigger";
            const isGoal = step.step === "Goal";
            const isWait = step.step.includes("Wait") || step.step.includes("Day");
            const isSelected = selectedNode === sIdx;

            return (
              <React.Fragment key={sIdx}>
                {/* Node Box */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedNode(isSelected ? null : sIdx)}
                  className={`cursor-pointer transition-all duration-200 rounded-lg p-3 border text-left text-xs ${
                    isTrigger
                      ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-200 hover:border-emerald-400"
                      : isGoal
                      ? "bg-purple-950/30 border-purple-500/50 text-purple-200 hover:border-purple-400"
                      : isWait
                      ? "bg-amber-950/25 border-amber-500/40 text-amber-200 hover:border-amber-400"
                      : "bg-card/90 border-border hover:border-primary/60 text-foreground"
                  } ${isSelected ? "ring-2 ring-primary shadow-md" : ""}`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`p-1.5 rounded-md shrink-0 mt-0.5 ${
                        isTrigger
                          ? "bg-emerald-500/20 text-emerald-400"
                          : isGoal
                          ? "bg-purple-500/20 text-purple-400"
                          : isWait
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-primary/15 text-primary"
                      }`}
                    >
                      <StepIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span
                          className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded ${
                            isTrigger
                              ? "bg-emerald-500/20 text-emerald-300"
                              : isGoal
                              ? "bg-purple-500/20 text-purple-300"
                              : isWait
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-primary/20 text-primary"
                          }`}
                        >
                          {step.step}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground">Node #{sIdx + 1}</span>
                      </div>
                      <p className="text-xs font-mono leading-relaxed text-foreground/90 font-medium">{step.label}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Connector Arrow */}
                {sIdx < study.workflowSteps.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2.5 bg-border/80" />
                      <ArrowDown className="w-3 h-3 text-muted-foreground/70 -mt-1" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dummy image footer note */}
        <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Visual Workflow Architecture Map
          </span>
          <span className="text-primary/80">Trigger: {study.workflowTrigger}</span>
        </div>
      </div>
    </div>
  );
}

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Web Dev", href: "#work" },
  { label: "Funnels", href: "#funnels" },
  { label: "Automations", href: "#automations" },
  { label: "AI Builds", href: "#ai" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function StickyNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-mono text-sm font-bold text-primary tracking-wider uppercase">
          MQ
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${active === link.href.slice(1) ? "text-primary" : "text-muted-foreground hover:text-white"}`}
            >
              {link.label}
            </button>
          ))}
          <a href="https://wa.me/923135279257" target="_blank" rel="noopener noreferrer" className="ml-4 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold font-mono uppercase tracking-widest hover:bg-primary/90 transition-colors">
            Chat on WhatsApp
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-muted-foreground hover:text-white p-1" onClick={() => setMenuOpen(v => !v)}>
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border px-6 py-4 flex flex-col gap-2">
          {navLinks.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left py-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-border/30 last:border-0">
              {link.label}
            </button>
          ))}
          <a href="https://wa.me/923135279257" target="_blank" rel="noopener noreferrer" className="mt-2 py-3 bg-primary text-primary-foreground text-center text-sm font-bold font-mono uppercase tracking-widest">
            Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

export default function Home() {
  const [kwBoatsModalOpen, setKwBoatsModalOpen] = useState(false);
  const [skinEditModalOpen, setSkinEditModalOpen] = useState(false);
  const [simulateExpired, setSimulateExpired] = useState(false);

  // Retrieve active featured project with 10-day duration schedule
  const activeFeaturedProject = webDevProjects.find((p) => p.featuredStartDate);
  const featuredStatus = getFeaturedStatus(
    activeFeaturedProject?.featuredStartDate,
    activeFeaturedProject?.featuredDurationDays ?? 10,
    simulateExpired
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary selection:text-primary-foreground">
      <StickyNav />

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsla(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsla(var(--primary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 relative group"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative border border-primary/30 px-6 py-2 rounded-full bg-background/50 backdrop-blur-sm">
              <span className="text-primary font-mono text-sm tracking-wider uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Digital Solutions Developer
              </span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-3 text-glow text-white"
          >
            MEHMA <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">QUDSIA</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-primary/40 hidden sm:inline-block" />
            <span className="text-base sm:text-xl font-bold font-mono tracking-widest text-primary uppercase">
              Founder of Brandit
            </span>
            <span className="h-px w-8 bg-primary/40 hidden sm:inline-block" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 font-light"
          >
            "Websites & Funnels That Always Hit Different"
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {["WordPress", "Shopify", "GoHighLevel", "Funnel Design", "AI Apps"].map((tag, i) => (
              <Badge key={i} variant="outline" className="border-border bg-card text-foreground px-4 py-1.5 rounded-full text-sm font-medium hover:border-primary/50 transition-colors">
                {tag}
              </Badge>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg font-bold rounded-none box-glow" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              See Services <ArrowUpRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-none border-border hover:border-primary hover:text-primary transition-colors" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Projects <Code2 className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="relative z-10 border-y border-border bg-card/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border">
            {[
              { value: "5+", label: "Years Experience" },
              { value: "40+", label: "Projects Delivered" },
              { value: "4", label: "Countries Served" },
              { value: "30+", label: "GHL Funnels Built" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm font-mono text-primary uppercase tracking-widest">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">What I Build</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-14 max-w-2xl">
              Clear deliverables. No guesswork. Tell me what you need and I'll tell you exactly how I'll build it.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={`relative h-full flex flex-col bg-gradient-to-br ${svc.accent} border border-border p-8 box-glow-hover transition-all duration-300`}>
                    <div className="flex items-start gap-4 mb-5">
                      <div className="p-2.5 border border-primary/30 bg-primary/10 shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{svc.title}</h3>
                        <p className="text-primary text-sm font-mono mt-0.5">{svc.tagline}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{svc.desc}</p>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {svc.deliverables.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-border/50 pt-4 mt-auto">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        <span className="text-primary">Ideal for:</span> {svc.ideal}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-10 p-6 border border-primary/25 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-white font-semibold text-lg">Not sure which service fits?</p>
                <p className="text-muted-foreground text-sm mt-1">Send me a quick message — I'll tell you exactly what you need and how long it takes.</p>
              </div>
              <a href="mailto:mehmaqudsia94@gmail.com?subject=Project Enquiry" className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 hover:bg-primary/90 transition-colors">
                Get a Free Scope <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- PROJECTS: WEB DEV --- */}
      <section id="work" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <Code2 className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Web Development</h2>
              </div>

              {/* 10-Day Feature Schedule Status & Preview Switcher */}
              {activeFeaturedProject && (
                <div className="flex items-center gap-2">
                  {featuredStatus.isFeatured ? (
                    <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-lg text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-white font-semibold">10-Day Featured Spotlight</span>
                      <span className="text-primary font-bold hidden sm:inline">
                        · Day {featuredStatus.currentDay} of {featuredStatus.totalDays} ({featuredStatus.remainingDays}d left)
                      </span>
                      <button
                        onClick={() => setSimulateExpired(true)}
                        className="ml-2 text-[11px] text-muted-foreground hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                        title="Simulate display after the 10-day window expires: project automatically renders as a simple product in the grid below"
                      >
                        [Test Expired View]
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-lg text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      <span className="text-muted-foreground">10-Day Spotlight Finished:</span>
                      <span className="text-white font-semibold">Showing as Simple Product</span>
                      {simulateExpired && (
                        <button
                          onClick={() => setSimulateExpired(false)}
                          className="ml-2 text-[11px] text-primary hover:underline font-bold transition-colors cursor-pointer"
                        >
                          [↩ Restore 10-Day Feature]
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-base mb-12 max-w-2xl">
              High-performance websites, custom WordPress builds, and e-commerce stores engineered for seamless UX and conversions.
            </p>
          </FadeIn>

          {/* Featured Spotlight: Displayed strictly during active 10-day window */}
          {featuredStatus.isFeatured && activeFeaturedProject && (
            <FadeIn delay={0.1}>
              <div className="mb-10 bg-gradient-to-br from-card via-[#0b253a]/20 to-card border-2 border-primary/40 rounded-xl p-6 lg:p-8 relative overflow-hidden box-glow-hover">
                <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Left Info */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/40 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight · Day {featuredStatus.currentDay} of {featuredStatus.totalDays}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {featuredStatus.remainingDays} {featuredStatus.remainingDays === 1 ? "day" : "days"} remaining
                      </span>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#e85038]/20 text-[#ff7965] border border-[#e85038]/40">
                        Elementor Pro + Booking Flow
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        Key West, Florida
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                      KW Boat Tours — Key West Excursion Platform
                    </h3>

                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      Custom WordPress platform built for Key West boat charters, sunset sails, dolphin encounters, and sandbar excursions. Engineered with curated all-day packages, interactive category exploration, instant ticket booking modals, and mobile-first Core Web Vitals optimization.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {["Curated Excursion Packages", "Instant Booking Flow", "Category Filtering", "Interactive FAQ Accordion", "Local SEO Schema"].map((tag, tIdx) => (
                        <span key={tIdx} className="text-xs font-mono px-2.5 py-1 rounded bg-secondary/80 text-foreground border border-border">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      <Button
                        onClick={() => setKwBoatsModalOpen(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 py-3 h-auto text-sm rounded flex items-center gap-2 shadow-lg"
                      >
                        <Maximize2 className="w-4 h-4" /> Pop in Full View Modal
                      </Button>
                      <a
                        href="/preview/kw-boats"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded bg-card hover:bg-accent border border-border hover:border-primary text-white hover:text-primary font-bold text-sm transition-colors"
                      >
                        <Globe className="w-4 h-4 text-primary" /> Open as Webpage (New Tab) <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="pt-2 text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>Featured for 10 days — automatically switches to simple product card on {featuredStatus.expiryDateFormatted || "day 10"}.</span>
                    </div>
                  </div>

                  {/* Right Visual Preview Mockup */}
                  <div className="lg:col-span-5">
                    <div
                      onClick={() => setKwBoatsModalOpen(true)}
                      className="cursor-pointer group relative rounded-xl overflow-hidden border border-border/80 bg-[#081c2b] shadow-2xl transition-all duration-300 hover:border-primary"
                    >
                      {/* Browser Chrome Header */}
                      <div className="bg-[#0b253a] px-4 py-2.5 border-b border-slate-700/80 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-3 py-0.5 rounded flex items-center gap-1.5 border border-slate-700">
                          <Globe className="w-3 h-3 text-[#2aa9c7]" /> kwboattours.com
                        </div>
                        <div className="text-[10px] font-mono text-[#2aa9c7] font-bold">LIVE PREVIEW</div>
                      </div>

                      {/* Screenshot Preview Card */}
                      <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-b from-[#071f30] to-[#0e3c5d]">
                        <img
                          src="/images/kw-boats-screenshot.png"
                          alt="KW Boat Tours WordPress Website Screenshot"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081c2b] via-transparent to-black/20" />
                        
                        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                              <Compass className="w-3.5 h-3.5 text-[#2aa9c7]" /> KW Boat Tours
                            </div>
                            <span className="bg-[#2aa9c7] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow">
                              Actual Site Build
                            </span>
                          </div>

                          <div>
                            <div className="text-base sm:text-lg font-black text-white drop-shadow-md leading-snug">
                              Book the Best Boat Tours in Key West
                            </div>
                            <p className="text-[11px] text-slate-200 line-clamp-2 mt-1">
                              Sunset sails, reef snorkeling, dolphin excursions & private charters.
                            </p>
                            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline">
                              <Eye className="w-3.5 h-3.5" /> Click to Expand Full Preview & Proof →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
          
          {/* Grid of Web Development Projects (All render as simple/standard product cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webDevProjects.map((proj, i) => {
              const isThisProjFeatured = proj.name === activeFeaturedProject?.name && featuredStatus.isFeatured;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`h-full flex flex-col bg-card border p-6 transition-all duration-300 hover:border-primary/50 box-glow-hover ${
                    isThisProjFeatured ? "border-primary/40 bg-card/90" : "border-border"
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                          {proj.platform}
                        </span>
                        {isThisProjFeatured ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                            ★ Featured
                          </span>
                        ) : proj.name === activeFeaturedProject?.name ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                            Simple Product
                          </span>
                        ) : null}
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">
                        {proj.type}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {proj.url ? (
                          proj.isInternalPreview ? (
                            <button
                              onClick={() => setKwBoatsModalOpen(true)}
                              className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group/title text-left font-bold cursor-pointer"
                            >
                              <span>{proj.name}</span>
                              <Maximize2 className="w-4 h-4 text-muted-foreground group-hover/title:text-primary transition-colors shrink-0" />
                            </button>
                          ) : (
                            <a 
                              href={proj.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group/title"
                            >
                              <span>{proj.name}</span>
                              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover/title:text-primary transition-colors shrink-0" />
                            </a>
                          )
                        ) : (
                          proj.name
                        )}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">{proj.desc}</p>

                    {proj.url && (
                      <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                        {proj.isInternalPreview ? (
                          <div className="w-full flex items-center justify-between gap-2">
                            <button
                              onClick={() => setKwBoatsModalOpen(true)}
                              className="text-xs font-mono text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 font-bold cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview Modal</span>
                            </button>
                            <a
                              href="/preview/kw-boats"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                            >
                              <span>New Tab</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ) : (
                          <a 
                            href={proj.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-primary/90 hover:text-primary transition-colors inline-flex items-center gap-1.5"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{proj.domain || "Visit Site"}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- PROJECTS: GHL FUNNELS --- */}
      <section id="funnels" className="relative z-10 py-24 px-6 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-3">
              <Layers className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">GHL Funnels & Pipelines</h2>
            </div>
            <p className="text-muted-foreground mb-10 font-mono text-sm">
              30+ High-Converting Funnels Delivered · UAE Luxury Real Estate, Aesthetic Medicine, SaaS & Agency Automation
            </p>
          </FadeIn>

          {/* Spotlight Sales Funnel: The Skin Edit (Luna Skin Lab) */}
          <FadeIn>
            <div className="mb-12 rounded-2xl border border-[#8b2644]/50 bg-gradient-to-br from-[#1f1519] via-card to-background p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#8b2644]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#8b2644]/30 text-[#f5a794] border border-[#8b2644]/60 font-bold flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#f5a794]" />
                      FEATURED SALES FUNNEL & ORDER BUMP
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 font-semibold">
                      GoHighLevel Pipeline
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-stone-800/90 text-stone-300 border border-stone-700">
                      Luna Skin Lab
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      The Skin Edit: Stop Guessing What Your Skin Actually Needs
                    </h3>
                    <div className="text-xs sm:text-sm font-mono text-[#f5a794] mt-1.5 flex items-center gap-2">
                      <span>By Dr. Sheryl, DNP, FNP-C · Aesthetic Nurse Practitioner</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Direct-response aesthetic medicine sales funnel designed for patient acquisition. Incorporates live countdown urgency, scientific barrier reframe copy, interactive FAQ accordion, and an automated 1-click order bump (+$17 add-on) lifting Average Order Value from $27 to $44.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                    <div className="bg-background/90 border border-border p-3 rounded-xl text-center shadow-sm">
                      <div className="text-[11px] font-mono text-muted-foreground">Front-End Offer</div>
                      <div className="text-lg font-bold font-mono text-white">$27</div>
                    </div>
                    <div className="bg-background/90 border border-[#8b2644]/40 p-3 rounded-xl text-center shadow-sm">
                      <div className="text-[11px] font-mono text-muted-foreground">1-Click Bump</div>
                      <div className="text-lg font-bold font-mono text-[#f5a794]">+$17</div>
                    </div>
                    <div className="bg-background/90 border border-border p-3 rounded-xl text-center shadow-sm">
                      <div className="text-[11px] font-mono text-muted-foreground">Bump Take Rate</div>
                      <div className="text-lg font-bold font-mono text-emerald-400">41.8%</div>
                    </div>
                    <div className="bg-background/90 border border-border p-3 rounded-xl text-center shadow-sm">
                      <div className="text-[11px] font-mono text-muted-foreground">Risk Reversal</div>
                      <div className="text-lg font-bold font-mono text-primary">30-Day</div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSkinEditModalOpen(true)}
                      className="bg-[#8b2644] hover:bg-[#722036] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Preview Funnel Modal</span>
                    </button>
                    <a
                      href="/preview/skin-edit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card hover:bg-secondary text-foreground px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono flex items-center gap-2 border border-border transition-colors cursor-pointer"
                    >
                      <span>Open as Webpage</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Visual Teaser Card */}
                <div className="lg:col-span-5">
                  <div 
                    onClick={() => setSkinEditModalOpen(true)}
                    className="relative rounded-2xl border border-[#8b2644]/50 bg-[#161311] p-3.5 shadow-2xl cursor-pointer group/card hover:border-[#8b2644] transition-all"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-stone-900">
                      <img
                        src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
                        alt="The Skin Edit Luna Skin Lab Funnel Mockup"
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#f5a794]">Luna Skin Lab · The Skin Edit</div>
                        <div className="text-sm sm:text-base font-bold font-serif">Stop guessing what your skin actually needs</div>
                      </div>
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#f5a794] border border-[#8b2644]/50">
                        Interactive Live Funnel
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-muted-foreground px-1">
                      <span>Desktop · Tablet · Mobile Responsive</span>
                      <span className="text-[#f5a794] flex items-center gap-1 group-hover/card:underline">
                        <span>Click to launch</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {funnelProjects.map((proj, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                {proj.isInternalPreview ? (
                  <div
                    onClick={() => setSkinEditModalOpen(true)}
                    className="block h-full group bg-card border border-[#8b2644]/40 p-5 transition-all duration-300 hover:border-[#8b2644] hover:bg-[#8b2644]/[0.04] cursor-pointer relative"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-[#8b2644]/20 text-[#f5a794] border border-[#8b2644]/40 rounded font-semibold">
                        {proj.brand}
                      </span>
                      <span className="text-[11px] font-mono text-[#f5a794] flex items-center gap-1">
                        <span>{proj.category}</span>
                        <Sparkles className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-[#f5a794] transition-colors">{proj.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{proj.desc}</p>
                    <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-[#f5a794]">
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{proj.domain}</span>
                      </div>
                      <span className="underline underline-offset-2">Interactive Preview →</span>
                    </div>
                  </div>
                ) : proj.url ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full group bg-card border border-border p-5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02] cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-primary/10 text-primary border border-primary/25 rounded">
                        {proj.brand}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground/70 group-hover:text-primary transition-colors flex items-center gap-1">
                        <span>{proj.category}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{proj.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{proj.desc}</p>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-primary/80 group-hover:text-primary">
                      <Globe className="w-3 h-3" />
                      <span>{proj.domain}</span>
                    </div>
                  </a>
                ) : (
                  <div className="h-full group bg-card border border-border p-5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02]">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-primary/10 text-primary border border-primary/25 rounded">
                        {proj.brand}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground/70">
                        {proj.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{proj.name}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{proj.desc}</p>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- AUTOMATIONS CASE STUDIES --- */}
      <section id="automations" className="relative z-10 py-24 px-6 border-b border-border/60 bg-gradient-to-b from-card/30 via-background to-card/20 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-3 justify-center text-center">
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/30">
                <Workflow className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-glow">
                GoHighLevel Automation Case Studies
              </h2>
            </div>
            
            {/* Client Context Banner */}
            <div className="max-w-3xl mx-auto mt-4 mb-10 p-5 rounded-2xl bg-card border border-primary/20 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>Client Profile: Healthcare / Aesthetics & Wellness Practice</span>
                </div>
                <button
                  onClick={() => setSkinEditModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#f5a794] hover:underline cursor-pointer"
                >
                  <span>View Front-End Funnel (Luna Skin Lab)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                These case studies document a full client lifecycle automation system built in GoHighLevel — from first contact through booking, no-show recovery, post-visit follow-up, and long-term reactivation for a consultation-based service business (paired with the <strong>Luna Skin Lab: The Skin Edit</strong> front-end acquisition sales funnel above).
              </p>
            </div>
          </FadeIn>

          {/* Workflow Cards */}
          <div className="space-y-12">
            {automationCaseStudies.map((study, idx) => {
              const StudyIcon = study.icon || Workflow;
              return (
                <FadeIn key={study.id} delay={idx * 0.08}>
                  <div className="relative group bg-card/95 border border-border hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl">
                    {/* Top Accent Line */}
                    <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />

                    {/* Card Header */}
                    <div className="p-6 md:p-8 border-b border-border/60 flex flex-wrap items-center justify-between gap-4 bg-muted/20">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary border border-primary/30 flex items-center justify-center shrink-0">
                          <StudyIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 uppercase">
                              Case Study {study.caseNumber}
                            </span>
                            <span className="text-xs font-mono text-muted-foreground">
                              • {study.category}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            {study.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live GHL Flow
                        </span>
                      </div>
                    </div>

                    {/* Card Body: 2 Columns */}
                    <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left Column: Problem, Solution, Results */}
                      <div className="lg:col-span-7 space-y-6">
                        {/* Problem Statement */}
                        <div className="rounded-xl p-4 bg-amber-950/15 border border-amber-500/30 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 text-xs">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>Problem Statement</span>
                          </div>
                          <p className="text-amber-200/90 leading-relaxed font-sans">
                            {study.problem}
                          </p>
                        </div>

                        {/* Solution Overview */}
                        <div className="rounded-xl p-4 bg-card/80 border border-border text-xs sm:text-sm">
                          <div className="flex items-center gap-2 font-mono font-bold text-primary uppercase tracking-wider mb-2 text-xs">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Solution Overview</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed font-sans">
                            {study.solution}
                          </p>
                        </div>

                        {/* Tools Used */}
                        <div>
                          <h4 className="text-xs font-mono uppercase font-bold text-foreground/80 mb-2.5 flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5 text-primary" />
                            <span>Tools Used (GoHighLevel Ecosystem)</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-mono px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/30 font-semibold">
                              GoHighLevel
                            </span>
                            {study.tools.map((tool, tIdx) => (
                              <span key={tIdx} className="text-xs font-mono px-2.5 py-1 rounded bg-secondary/80 text-foreground border border-border">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Results / Metrics */}
                        <div className="pt-4 border-t border-border/60">
                          <h4 className="text-xs font-mono uppercase font-bold text-foreground/80 mb-3 flex items-center gap-2">
                            <Target className="w-3.5 h-3.5 text-primary" />
                            <span>Results & Key Metrics</span>
                          </h4>
                          <div className="space-y-2">
                            {study.results.map((res, rIdx) => (
                              <div key={rIdx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90 font-mono">
                                <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{res}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Client Context Footnote */}
                        <div className="pt-3 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center gap-2">
                          <span className="font-semibold text-foreground/70">Client Context:</span>
                          <span>{study.clientContext}</span>
                        </div>
                      </div>

                      {/* Right Column: Visual Walkthrough / Workflow Canvas Mockup (Dummy Image) */}
                      <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono uppercase font-bold text-foreground/80 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-primary" />
                              <span>Visual Walkthrough & Canvas</span>
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              Workflow Diagram
                            </span>
                          </div>
                          <WorkflowCanvasMockup study={study} />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* System-Wide Note Callout */}
          <FadeIn delay={0.2}>
            <div className="mt-16 p-6 md:p-8 rounded-2xl bg-card border-2 border-primary/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/15 text-primary border border-primary/30 shrink-0 mt-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase font-mono tracking-wide mb-2 flex items-center gap-2">
                    <span>System-Wide Architecture Standard</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/40">
                      Best Practice
                    </span>
                  </h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    <strong className="text-white">System-wide note:</strong> all workflows were configured with intentional re-entry, multiple-opportunity, and stop-on-response settings per workflow — ensuring time-sensitive sequences (booking, no-show recovery) stay responsive while one-time sequences (lead follow-up, nurture) don't duplicate or over-trigger for the same contact.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- AI APPS --- */}
      <section id="ai" className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4 justify-center text-center">
              <Smartphone className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-glow">AI-Powered Builds</h2>
            </div>
            <p className="text-muted-foreground text-center text-base mb-12 max-w-2xl mx-auto">
              Custom applications and workflow automation engineered with Google Gemini, Base44, and Replit.
            </p>
          </FadeIn>
          
          <div className="space-y-8">
            {aiApps.map((app, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="relative group bg-card border border-primary/30 p-8 md:p-10 overflow-hidden box-glow-hover">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {app.url ? (
                          <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors inline-flex items-center gap-2"
                          >
                            <span>{app.name}</span>
                            <ArrowUpRight className="w-5 h-5 text-muted-foreground hover:text-primary" />
                          </a>
                        ) : (
                          app.name
                        )}
                      </h3>
                      {app.tag && (
                        <span className="mt-2 inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
                          {app.tag}
                        </span>
                      )}
                    </div>
                    
                    {app.url && (
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold font-mono uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live App</span>
                        </a>
                        {app.altUrl && (
                          <a
                            href={app.altUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/50 text-xs font-mono transition-colors"
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>{app.altLabel || "Demo App"}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">{app.desc}</p>
                  
                  {app.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-border/50">
                      {app.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs font-mono text-foreground/80">
                          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Architecture Flow Diagram */}
                  {app.architecture && (
                    <ArchitectureFlowViewer 
                      architecture={app.architecture} 
                      loopNote={app.loopNote} 
                    />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE --- */}
      <section id="experience" className="relative z-10 py-24 px-6 bg-card/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <Briefcase className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Experience</h2>
            </div>
          </FadeIn>
          
          <div className="space-y-12 relative">
            <div className="hidden md:block absolute left-[-29px] top-0 bottom-0 w-px bg-border" />
            {experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`relative pl-8 md:pl-0 border-l border-border md:border-none ${exp.current ? 'md:bg-primary/[0.03] md:-mx-6 md:px-6 md:py-6 md:border md:border-primary/20' : ''}`}>
                  <div className={`hidden md:block absolute left-[-41px] top-3 w-3 h-3 rounded-full ${exp.current ? 'bg-primary shadow-[0_0_14px_rgba(171,255,0,1)] animate-pulse' : 'bg-muted border-2 border-border'}`} />
                  <div className="md:flex justify-between items-start gap-4 mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      {exp.current && (
                        <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                          Current
                        </span>
                      )}
                    </div>
                    <span className={`font-mono text-sm mt-1 md:mt-0 shrink-0 block ${exp.current ? 'text-primary' : 'text-muted-foreground'}`}>{exp.period}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4 text-sm font-mono uppercase tracking-wider gap-2">
                    <span className="text-white font-semibold">{exp.company}</span>
                    <span className="text-border">·</span>
                    <MapPin className="w-3 h-3" /> {exp.location}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{exp.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- SKILLS --- */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-16">Technical Arsenal</h2>
          </FadeIn>
          
          <div className="space-y-12">
            {skills.map((skillGroup, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-left md:text-center">
                  <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6 border-b border-border/50 pb-2 md:border-none md:pb-0">{skillGroup.category}</h3>
                  <div className="flex flex-wrap justify-start md:justify-center gap-3">
                    {skillGroup.items.map((skill, j) => (
                      <span key={j} className="px-5 py-2 bg-card border border-border rounded-full text-sm font-medium text-white hover:border-primary hover:text-primary transition-colors cursor-default shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- CERTIFICATIONS --- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <CheckCircle2 className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">Certifications</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-card border border-border p-5 hover:border-primary/40 transition-colors">
                  <div className="mt-0.5 shrink-0 w-8 h-8 flex items-center justify-center border border-primary/30 bg-primary/10">
                    <span className="text-primary text-xs font-bold font-mono">{cert.year.slice(2)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-snug">{cert.title}</p>
                    <p className="text-primary/80 text-xs font-mono mt-1">{cert.issuer}</p>
                    <p className="text-muted-foreground/60 text-xs mt-0.5">{cert.year}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- BRANDS TRUST STRIP --- */}
      <section className="relative z-10 py-16 px-6 border-y border-border bg-card/20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-center text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-10">
              Brands & clients I've built for
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
              {brands.map((brand, i) => (
                <span key={i} className="text-sm font-semibold text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-wide uppercase">
                  {brand}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="relative z-10 py-32 px-6 border-t border-border bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-glow text-white">READY TO BUILD?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Whether you need a high-converting funnel, a custom Shopify store, or an AI-powered real estate app, I build digital solutions that drive results.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-16">
              <a href="mailto:mehmaqudsia94@gmail.com" className="group flex items-center justify-center gap-3 bg-card border border-border px-8 py-4 hover:border-primary transition-colors box-glow-hover">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-white group-hover:text-primary transition-colors font-mono">mehmaqudsia94@gmail.com</span>
              </a>
              <a href="https://wa.me/923135279257" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-colors box-glow">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-bold font-mono">Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="https://www.upwork.com/freelancers/mehmaqudsia" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-3 bg-card border border-border px-8 py-4 hover:border-primary transition-colors box-glow-hover">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="text-white group-hover:text-primary transition-colors font-mono font-bold">Hire on Upwork</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <a href="https://linkedin.com/in/mehma-qudsia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              <span>•</span>
              <a href="https://www.upwork.com/freelancers/mehmaqudsia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Upwork Profile</a>
              <span>•</span>
              <a href="https://wa.me/923135279257" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- KW BOATS FULLSCREEN MODAL --- */}
      <KWBoatsModal isOpen={kwBoatsModalOpen} onClose={() => setKwBoatsModalOpen(false)} />

      {/* --- SKIN EDIT SALES FUNNEL FULLSCREEN MODAL --- */}
      <SkinEditModal isOpen={skinEditModalOpen} onClose={() => setSkinEditModalOpen(false)} />
    </div>
  );
}

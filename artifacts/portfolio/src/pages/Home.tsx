import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronRight, Terminal, Code2, Layers, Briefcase, Mail, MapPin, ExternalLink, Smartphone, Zap, Globe, Settings, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Data ---
const webDevProjects = [
  { name: "Dreamhive", desc: "Dubai real estate WordPress site", url: "dreamhive.ae", type: "real-estate" },
  { name: "The Travel Ceylon", desc: "Tour booking platform with custom dashboard", url: "thetravelceylon.com", type: "travel" },
  { name: "Coaching Alley", desc: "WordPress + ConvertKit email automation", url: "coachingalley.com", type: "other" },
  { name: "Travelkit", desc: "Custom payment logic, different prices per payment method", url: "travelkit.lk", type: "travel" },
  { name: "Glow Body & Beauty", desc: "Staging-to-production migration", url: "glowbnb.com", type: "e-commerce" },
  { name: "Allura Estrella", desc: "Full Shopify build with installment payments", url: "alluraestrella.com", type: "e-commerce" },
  { name: "GloriousGifts.pk", desc: "Shopify + pixel integration", url: "gloriousgifts.pk", type: "e-commerce" },
  { name: "Better Way Real Estate", desc: "WordPress real estate site (UAE)", url: "better-way.ae", type: "real-estate" },
  { name: "Fiable Luxury", desc: "Luxury brand WordPress site", url: "fiableluxury.com", type: "e-commerce" },
];

const funnelProjects = [
  { name: "The Oasis by Emaar", desc: "Funnel & SEO", url: "theoasis-emaar.com" },
  { name: "Grand Polo Club & Resort", desc: "Emaar luxury resort funnel", url: "grandpoloemaar.com" },
  { name: "MBR City District One", desc: "Dubai mega development funnel", url: "phaseone-district1west.com" },
  { name: "Nikki Beach Residences", desc: "Al Marjan Island luxury funnel", url: "almarjan-nikkibeach.com" },
  { name: "Tilal Binghatti", desc: "AI-powered custom app funnel (Replit)", url: "tilal.eliteestatesuae.com" },
  { name: "Sobha Beachfront", desc: "Luxury beachfront funnel", url: "sobha-beachfront.com" },
  { name: "Aldar Fahid Island", desc: "Aldar beachfront funnel", url: "aldar-fahidisland.com" },
  { name: "The Heights by Emaar", desc: "Country Club & Wellness funnel", url: "emaar-theheights.com" },
  { name: "Dubai Mega Property Show", desc: "International expo funnel (Manila)", url: "manila.dandkproperties.ae" },
  { name: "SaaS + ManyChat Funnels", desc: "Instagram DM automation", url: "hsquareautomation.com" },
];

const aiApps = [
  { name: "Dreamhive — GHL-Powered Real Estate", desc: "Full real estate website built on WordPress with lead generation running entirely through GoHighLevel — automated lead capture, CRM pipelines, and follow-up sequences. Every inquiry on the site flows into a live GHL automation.", url: "dreamhive.ae", tag: "WordPress + GHL" },
  { name: "Tilal Binghatti App", desc: "Custom AI real estate app on Replit with dynamic property listings, intelligent filtering, and inquiry forms auto-populated from backend data.", url: "tilal-binghatti-dream-hive-real-estate.replit.app", tag: "AI App" },
  { name: "Mahir — AI-Verified Service Network", desc: "Pakistan's First AI-Verified Service Network — Google AI Seekho 2026 Hackathon — deployed on Google Cloud Run with 9 Gemini AI agents — reduces time to find a verified worker from 45–90 min to under 60 seconds. Workers need no smartphone — AI calls them in Urdu.", url: "#", tag: "Hackathon" },
];

const experience = [
  { role: "GHL CRM Specialist & Funnel Builder", company: "Multiple Agency Teams", location: "Remote", period: "Jan 2026 – Present", desc: "Embedded GHL specialist working across multiple agency teams — delivering end-to-end CRM setup and funnel builds for client sub-accounts. Scope includes: GHL snapshots, funnel & landing page design, form builds, pipeline architecture, custom tags, custom values, automated workflows, and full sub-account configuration from scratch.", current: true },
  { role: "GHL & WordPress Funnel Designer", company: "Retrographic Digital", location: "Remote – Dubai", period: "Nov 2024 – Mar 2026", desc: "Designed and delivered 20+ GHL funnels for UAE luxury real estate clients including Emaar, Meraas, Aldar, Sobha, and Nikki Beach Residences. Built and maintained WordPress and Shopify client sites." },
  { role: "WordPress Developer & Team Lead", company: "DesignBey", location: "Remote – Sri Lanka", period: "Mar 2022 – 2025", desc: "Led team delivering 15+ WordPress projects for e-commerce, hospitality, and services clients." },
  { role: "WordPress Developer", company: "Digi Pro Ventures", location: "Remote – Pakistan", period: "Jul 2023 – Dec 2024", desc: "WordPress builds for real estate and e-commerce clients." },
  { role: "Freelance Developer", company: "Upwork", location: "Remote", period: "2020 – Present", desc: "40+ client projects including e-commerce stores, branding websites, and email automation setups." },
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

// --- Components ---

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary selection:text-primary-foreground">
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
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-glow text-white"
          >
            MEHMA <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">QUDSIA</span>
          </motion.h1>
          
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
              View My Work <ExternalLink className="ml-2 w-5 h-5" />
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
            <div className="flex items-center gap-4 mb-12">
              <Code2 className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Web Development</h2>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webDevProjects.map((proj, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <div className="group h-full flex flex-col bg-card border border-border p-6 transition-all duration-300 box-glow-hover">
                    <div className="aspect-video w-full bg-muted mb-6 overflow-hidden relative">
                      {/* Using fallback generic image or generated image placeholder */}
                      <div className="absolute inset-0 bg-background/50 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                      <img src={`/images/project-${proj.type === 'real-estate' ? 'real-estate' : 'ecommerce'}.png`} alt={proj.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"; }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{proj.name}</h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-4">{proj.desc}</p>
                    <div className="flex items-center text-xs font-mono text-primary mt-auto">
                      {proj.url} <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS: GHL FUNNELS --- */}
      <section className="relative z-10 py-24 px-6 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <Layers className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">GHL Funnels</h2>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {funnelProjects.map((proj, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between bg-card border border-border p-6 transition-all duration-300 hover:border-primary hover:bg-card/80">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{proj.name}</h3>
                      <p className="text-muted-foreground text-sm">{proj.desc}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center text-xs font-mono text-muted-foreground group-hover:text-white transition-colors">
                      {proj.url} <ChevronRight className="w-4 h-4 ml-1 text-primary" />
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI APPS --- */}
      <section className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12 justify-center text-center">
              <Smartphone className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-glow">AI-Powered Builds</h2>
            </div>
          </FadeIn>
          
          <div className="space-y-8">
            {aiApps.map((app, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="relative group bg-card border border-primary/30 p-8 md:p-12 overflow-hidden box-glow-hover">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{app.name}</h3>
                    {app.tag && (
                      <span className="mt-1 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
                        {app.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">{app.desc}</p>
                  {app.url !== "#" && (
                    <a href={`https://${app.url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-mono text-sm hover:underline">
                      View Application <ArrowUpRight className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE --- */}
      <section className="relative z-10 py-24 px-6 bg-card/30 border-y border-border">
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
      <section className="relative z-10 py-32 px-6 border-t border-border bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-glow text-white">READY TO BUILD?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Whether you need a high-converting funnel, a custom Shopify store, or an AI-powered real estate app, I build digital solutions that drive results.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <a href="mailto:mehmaqudsia94@gmail.com" className="group flex items-center justify-center gap-3 bg-card border border-border px-8 py-4 hover:border-primary transition-colors box-glow-hover">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-white group-hover:text-primary transition-colors font-mono">mehmaqudsia94@gmail.com</span>
              </a>
              <a href="tel:+923135279257" className="group flex items-center justify-center gap-3 bg-card border border-border px-8 py-4 hover:border-primary transition-colors box-glow-hover">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="text-white group-hover:text-primary transition-colors font-mono">+92 313 5279257</span>
              </a>
            </div>
            
            <div className="flex justify-center gap-8 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <a href="https://linkedin.com/in/mehma-qudsia" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Upwork Profile</a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

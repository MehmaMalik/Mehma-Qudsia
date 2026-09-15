import React, { useState } from "react";
import {
  X,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  CheckCircle,
  Globe,
  Layers,
  Sparkles,
  Zap,
  Code2,
  Calendar,
  Compass,
  Star,
  ShieldCheck,
  ChevronRight,
  ImageIcon,
  ZoomIn,
  Check
} from "lucide-react";
import KWBoatsPreview from "@/pages/KWBoatsPreview";

interface KWBoatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KWBoatsModal({ isOpen, onClose }: KWBoatsModalProps) {
  const [activeTab, setActiveTab] = useState<"screenshot" | "live" | "overview">("screenshot");
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [zoomLevel, setZoomLevel] = useState<"fit" | "original">("fit");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden animate-in fade-in duration-200">
      <div className="bg-card border border-primary/40 rounded-xl w-full h-[94vh] max-w-[1500px] flex flex-col shadow-2xl overflow-hidden">
        {/* --- MODAL TOP CONTROL BAR --- */}
        <div className="bg-background/95 border-b border-border p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Project Title & Badges */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e85038] text-white flex items-center justify-center font-bold shadow">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  KW Boat Tours — Key West Charter & Tour Booking
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 hidden sm:inline-block">
                  WordPress · Elementor Pro
                </span>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Curated travel booking platform, excursion packages, and mobile-first reservation system
              </p>
            </div>
          </div>

          {/* Viewport & View Mode Selectors */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Tabs */}
            <div className="flex items-center bg-card border border-border p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab("screenshot")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === "screenshot"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Original Screenshot Proof</span>
              </button>
              <button
                onClick={() => setActiveTab("live")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === "live"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Interactive Web View</span>
              </button>
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === "overview"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Specs & Architecture</span>
              </button>
            </div>

            {/* Device Frame Switcher (When in Live view) */}
            {activeTab === "live" && (
              <div className="hidden md:flex items-center bg-card border border-border p-1 rounded-lg text-xs text-muted-foreground">
                <button
                  onClick={() => setDeviceView("desktop")}
                  title="Desktop View"
                  className={`p-1.5 rounded transition-colors ${
                    deviceView === "desktop" ? "bg-accent text-primary" : "hover:text-white"
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceView("tablet")}
                  title="Tablet View (768px)"
                  className={`p-1.5 rounded transition-colors ${
                    deviceView === "tablet" ? "bg-accent text-primary" : "hover:text-white"
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceView("mobile")}
                  title="Mobile View (375px)"
                  className={`p-1.5 rounded transition-colors ${
                    deviceView === "mobile" ? "bg-accent text-primary" : "hover:text-white"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Zoom Switcher (When in Screenshot Proof view) */}
            {activeTab === "screenshot" && (
              <button
                onClick={() => setZoomLevel(zoomLevel === "fit" ? "original" : "fit")}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-secondary/80 hover:bg-secondary text-foreground border border-border text-xs font-mono transition-colors"
                title="Toggle Zoom"
              >
                <ZoomIn className="w-3.5 h-3.5 text-primary" />
                <span>{zoomLevel === "fit" ? "View 100% Zoom" : "Fit to Screen"}</span>
              </button>
            )}

            {/* Open in New Tab Button */}
            <a
              href="/preview/kw-boats"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-mono font-bold transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-card hover:bg-destructive/20 hover:text-destructive text-muted-foreground border border-border transition-colors ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- MODAL MAIN CONTENT AREA --- */}
        <div className="flex-1 bg-black/50 overflow-auto relative">
          {activeTab === "screenshot" ? (
            /* Dedicated Original Screenshot View */
            <div className="h-full flex flex-col items-center justify-start p-3 sm:p-6 overflow-auto">
              <div className="max-w-5xl w-full mb-3 flex items-center justify-between text-xs text-muted-foreground bg-card/90 px-4 py-2 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">Full-Resolution Screenshot Proof</span>
                  <span className="text-slate-400 font-mono text-[11px]">— Key West Boat Tours Elementor Site</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("live")}
                    className="text-primary hover:underline font-bold flex items-center gap-1"
                  >
                    Switch to Interactive Mode →
                  </button>
                </div>
              </div>

              <div className={`rounded-xl overflow-hidden border border-border/80 shadow-2xl bg-[#081c2b] transition-all duration-200 ${
                zoomLevel === "fit" ? "max-w-5xl w-full" : "w-auto max-w-none"
              }`}>
                {/* Browser bar */}
                <div className="bg-[#0b253a] px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-xs font-mono text-slate-300 bg-slate-800 px-4 py-1 rounded-md border border-slate-700 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#2aa9c7]" /> https://kwboattours.com
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Original Asset</div>
                </div>

                <img
                  src="/images/kw-boats-screenshot.png"
                  alt="KW Boat Tours WordPress Website Original Screenshot"
                  className="w-full h-auto object-contain block select-none"
                />
              </div>
            </div>
          ) : activeTab === "live" ? (
            <div className="h-full flex items-center justify-center p-2 sm:p-4">
              <div
                className={`h-full transition-all duration-300 rounded-xl overflow-auto border border-border/80 shadow-2xl bg-white ${
                  deviceView === "desktop"
                    ? "w-full"
                    : deviceView === "tablet"
                    ? "w-[768px] max-w-full shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    : "w-[390px] max-w-full shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Embedded Webpage Simulation */}
                <KWBoatsPreview />
              </div>
            </div>
          ) : (
            /* Project Specs & Architectural Breakdown */
            <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8 text-foreground">
              {/* Overview Header */}
              <div className="border border-border bg-card p-6 rounded-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest px-2.5 py-1 bg-primary/10 border border-primary/25 rounded">
                    WordPress Production Build
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="/preview/kw-boats"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded hover:bg-primary/90 transition-colors"
                    >
                      Open Full Webpage in New Tab <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  KW Boat Tours — Key West Florida Excursion Portal
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  A high-converting WordPress travel and boat tour booking website custom-built for Key West water sports operators. Featuring curated tour packaging, interactive category filtering, instant reservation checkout, and mobile-first performance.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/60">
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">Platform</div>
                    <div className="text-sm font-bold text-white mt-0.5">WordPress + Elementor Pro</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">Booking Engine</div>
                    <div className="text-sm font-bold text-white mt-0.5">WooCommerce / Custom API</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">Industry</div>
                    <div className="text-sm font-bold text-white mt-0.5">Maritime Travel & Hospitality</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">Location Target</div>
                    <div className="text-sm font-bold text-white mt-0.5">Key West, Florida, USA</div>
                  </div>
                </div>
              </div>

              {/* Core Features Delivered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border bg-card p-6 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-base">
                    <Zap className="w-5 h-5" />
                    <span>Conversion & UX Architecture</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Curated Excursion Packages:</strong> All-day mangrove kayaking, sunset cruises, dolphin encounters, and sandbar charters with transparent duration & pricing badges.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Multi-Category Exploration:</strong> Categorized filtering for group events (BYOB tiki, bride tribes) and private VIP charters.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Interactive Service FAQ:</strong> Expandable accordion with answers to cancellation, ticketing, and equipment policies.</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-border bg-card p-6 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-base">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Technical & Performance Delivery</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Speed & Core Web Vitals:</strong> Optimized image CDN delivery, lazy loading, lightweight CSS, and sub-1.5s mobile load times.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Local SEO Grounding:</strong> Structured schema markup for Key West tourism queries, Duval St coordinates, and tour packages.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Automated Confirmation:</strong> Instant digital ticket delivery and SMS reminder notifications.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 border border-primary/30 bg-primary/5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-bold text-base">Ready to test the live Key West Boat Tours website?</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Experience the interactive booking flow in full browser view.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("live")}
                    className="px-5 py-2.5 bg-card hover:bg-accent border border-border text-white text-xs font-bold rounded transition-colors"
                  >
                    View Interactive Frame
                  </button>
                  <a
                    href="/preview/kw-boats"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded transition-colors inline-flex items-center gap-1.5"
                  >
                    Open as Webpage (New Tab) <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

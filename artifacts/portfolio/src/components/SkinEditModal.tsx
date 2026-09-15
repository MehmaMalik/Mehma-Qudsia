import React, { useState } from "react";
import {
  X,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  CheckCircle,
  Sparkles,
  Zap,
  Code2,
  Star,
  ShieldCheck,
  ChevronRight,
  Workflow,
  Layers,
  ShoppingBag,
  DollarSign,
  Clock,
  TrendingUp,
  FileText
} from "lucide-react";
import SkinEditPreview from "@/pages/SkinEditPreview";

interface SkinEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkinEditModal({ isOpen, onClose }: SkinEditModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "architecture" | "copy">("interactive");
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden animate-in fade-in duration-200">
      <div className="bg-card border border-primary/40 rounded-xl w-full h-[94vh] max-w-[1500px] flex flex-col shadow-2xl overflow-hidden">
        {/* --- MODAL TOP CONTROL BAR --- */}
        <div className="bg-background/95 border-b border-border p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Project Title & Badges */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#8b2644] text-white flex items-center justify-center font-bold shadow">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  The Skin Edit — Luna Skin Lab Direct-Response Sales Funnel
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8b2644]/20 text-[#f5a794] border border-[#8b2644]/40 hidden sm:inline-block">
                  GoHighLevel · 1-Click Order Bump
                </span>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Client Profile: Healthcare & Aesthetic Practice · $27 Front-End with $17 Add-On Bump
              </p>
            </div>
          </div>

          {/* Viewport & View Mode Selectors */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Tabs */}
            <div className="flex items-center bg-card border border-border p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab("interactive")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === "interactive"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Funnel</span>
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === "architecture"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>GHL Architecture</span>
              </button>
              <button
                onClick={() => setActiveTab("copy")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === "copy"
                    ? "bg-primary text-primary-foreground font-bold shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Conversion Strategy</span>
              </button>
            </div>

            {/* Device View Selector (only in interactive mode) */}
            {activeTab === "interactive" && (
              <div className="hidden md:flex items-center bg-card border border-border p-1 rounded-lg">
                <button
                  onClick={() => setDeviceView("desktop")}
                  title="Desktop View"
                  className={`p-1.5 rounded transition-colors ${
                    deviceView === "desktop"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceView("tablet")}
                  title="Tablet View"
                  className={`p-1.5 rounded transition-colors ${
                    deviceView === "tablet"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceView("mobile")}
                  title="Mobile View"
                  className={`p-1.5 rounded transition-colors ${
                    deviceView === "mobile"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Open in New Tab Button */}
            <a
              href="/preview/skin-edit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border border-border transition-colors cursor-pointer"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-card hover:bg-secondary text-muted-foreground hover:text-white flex items-center justify-center transition-colors border border-border cursor-pointer"
              title="Close Preview (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- MODAL MAIN CONTENT AREA --- */}
        <div className="flex-grow overflow-y-auto bg-stone-950 flex flex-col items-center justify-start p-2 sm:p-4">
          {/* TAB 1: INTERACTIVE FUNNEL PREVIEW */}
          {activeTab === "interactive" && (
            <div className={`w-full transition-all duration-300 ${
              deviceView === "mobile"
                ? "max-w-[420px] rounded-3xl border-8 border-stone-800 shadow-2xl overflow-hidden my-4"
                : deviceView === "tablet"
                ? "max-w-[768px] rounded-2xl border-4 border-stone-800 shadow-2xl overflow-hidden my-4"
                : "max-w-full rounded-lg"
            }`}>
              <SkinEditPreview embedded={true} />
            </div>
          )}

          {/* TAB 2: TECHNICAL ARCHITECTURE & GHL AUTOMATION */}
          {activeTab === "architecture" && (
            <div className="w-full max-w-5xl my-6 space-y-6 text-foreground">
              <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
                  <Workflow className="w-4 h-4" />
                  <span>GoHighLevel Funnel & Automation Blueprint</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Direct-Response Front-End to High-Ticket Clinical Client Pipeline
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The Skin Edit was designed as an ultra-high converting, low-friction front-end digital offer ($27 with a $17 order bump) that self-liquidates ad spend while funneling qualified, high-intent patients into high-value in-clinic aesthetic treatments ($350–$2,500+).
                </p>
              </div>

              {/* Pipeline Flow Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card/90 border border-border p-5 rounded-xl space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">
                    01
                  </div>
                  <h4 className="font-bold text-white text-base">Inbound Traffic</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Meta Ads & TikTok reels focused on skincare barrier damage and ingredient confusion drive targeted traffic to this dedicated page.
                  </p>
                </div>

                <div className="bg-card/90 border border-[#8b2644]/40 p-5 rounded-xl space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8b2644]/30 text-[#f5a794] flex items-center justify-center font-bold text-xs font-mono">
                    02
                  </div>
                  <h4 className="font-bold text-white text-base">1-Click Order Bump</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Dynamic order bump for "The Product Shortlist ($17)" lifts Average Order Value (AOV) from $27 to $44 with zero added friction.
                  </p>
                </div>

                <div className="bg-card/90 border border-border p-5 rounded-xl space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                    03
                  </div>
                  <h4 className="font-bold text-white text-base">GHL Webhook Delivery</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Instantly delivers digital guide, personalized routine worksheet, and sends a 3-part educational email sequence over 7 days.
                  </p>
                </div>

                <div className="bg-card/90 border border-amber-500/30 p-5 rounded-xl space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
                    04
                  </div>
                  <h4 className="font-bold text-white text-base">In-Clinic Booking</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Day 8 automated SMS and email invites buyers to book an in-person or virtual consultation with Dr. Sheryl at Luna Skin Lab.
                  </p>
                </div>
              </div>

              {/* Metrics & Benchmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border p-5 rounded-xl text-center space-y-1">
                  <div className="text-xs font-mono text-muted-foreground">Order Bump Take Rate</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">41.8%</div>
                  <div className="text-[11px] text-muted-foreground">+$17 Product Shortlist</div>
                </div>
                <div className="bg-card border border-border p-5 rounded-xl text-center space-y-1">
                  <div className="text-xs font-mono text-muted-foreground">Average Order Value (AOV)</div>
                  <div className="text-2xl font-bold font-mono text-primary">$34.10</div>
                  <div className="text-[11px] text-muted-foreground">Across all funnel checkouts</div>
                </div>
                <div className="bg-card border border-border p-5 rounded-xl text-center space-y-1">
                  <div className="text-xs font-mono text-muted-foreground">Clinic Consultation Upsell</div>
                  <div className="text-2xl font-bold font-mono text-amber-400">12.4%</div>
                  <div className="text-[11px] text-muted-foreground">Converted to paid appointments</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONVERSION STRATEGY & COPYWRITING BREAKDOWN */}
          {activeTab === "copy" && (
            <div className="w-full max-w-5xl my-6 space-y-6 text-foreground">
              <div className="bg-card border border-border p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
                  <Star className="w-4 h-4" />
                  <span>Psychological Direct-Response Structure</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  How The Skin Edit Eliminates Resistance and Maximizes Conversions
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every section of this landing page follows battle-tested direct response consumer psychology specifically tuned for skincare and aesthetic consumers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border p-5 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8b2644]" />
                    The "Not Your Fault" Empathy Reframe
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Rather than telling buyers they made mistakes, the copy validates them: <em>"Your routine is working exactly as written. It was just written for someone else's skin."</em> This eliminates shame and creates instant authority trust.
                  </p>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8b2644]" />
                    Extreme Value Anchoring ($140 to $27)
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Stacking 4 tangible deliverables (The Guide, Ingredient Decoder, Layering Map, Routine Worksheet) anchors a $140 perceived clinical consultation value, making $27 feel like an effortless impulse purchase.
                  </p>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8b2644]" />
                    Qualification Bifurcation
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The <em>"This is for you if / This isn't for you if"</em> matrix weeds out unrealistic buyers (e.g. looking for medical diagnosis or overnight magic), protects against chargebacks, and reinforces clinical legitimacy.
                  </p>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8b2644]" />
                    Friction-Free Guarantee
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A zero-questions 30-day money-back guarantee backed by a board-certified Nurse Practitioner removes all perceived financial risk for skeptical consumers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

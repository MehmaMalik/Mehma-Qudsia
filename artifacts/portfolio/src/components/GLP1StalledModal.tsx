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
  Star,
  ShieldCheck,
  ChevronRight,
  Workflow,
  Layers,
  HeartPulse,
  Mail,
  MessageSquare,
  Clock,
  TrendingUp,
  FileText
} from "lucide-react";
import GLP1StalledPreview from "@/pages/GLP1StalledPreview";

interface GLP1StalledModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GLP1StalledModal({ isOpen, onClose }: GLP1StalledModalProps) {
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
            <div className="w-9 h-9 rounded-lg bg-[#b8864e] text-white flex items-center justify-center font-bold shadow">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Stalled GLP-1 Guide — GLP-1 Support with Karen
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hidden sm:inline-block">
                  MedSpa & Aesthetics · GoHighLevel
                </span>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Client Profile: MedSpa & GLP-1 Clinic · Direct-Response Lead Capture + Automated 5-Day Nurture
              </p>
            </div>
          </div>

          {/* Controls: Device & Sub-tabs */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Device Switcher */}
            <div className="hidden md:flex items-center bg-muted/60 p-1 rounded-md border border-border">
              <button
                type="button"
                onClick={() => setDeviceView("desktop")}
                className={`p-1.5 rounded transition-colors ${
                  deviceView === "desktop" ? "bg-background text-primary shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Desktop View"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView("tablet")}
                className={`p-1.5 rounded transition-colors ${
                  deviceView === "tablet" ? "bg-background text-primary shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView("mobile")}
                className={`p-1.5 rounded transition-colors ${
                  deviceView === "mobile" ? "bg-background text-primary shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center bg-muted/60 p-1 rounded-md border border-border">
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeTab === "interactive" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Interactive Funnel
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeTab === "architecture" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                CRM Workflow
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("copy")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeTab === "copy" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Key Metrics
              </button>
            </div>

            {/* Fullscreen external preview link */}
            <a
              href="/preview/glp1-stalled"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors border border-transparent hover:border-border hidden sm:block"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close Modal Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-md transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- MODAL BODY CONTENT --- */}
        <div className="flex-1 overflow-y-auto bg-muted/10 relative">
          {activeTab === "interactive" && (
            <div className="h-full flex flex-col justify-start">
              <GLP1StalledPreview embedded={true} />
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase mb-2">
                  <Workflow className="w-4 h-4" />
                  <span>GoHighLevel / Zapier Pipeline Specs</span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">
                  Multi-Channel MedSpa Patient Acquisition Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-3 bg-muted/40 rounded border border-border">
                    <span className="text-xs text-muted-foreground block font-mono">Lead Magnet</span>
                    <span className="font-bold text-sm">Stalled GLP-1 PDF Checklist</span>
                  </div>
                  <div className="p-3 bg-muted/40 rounded border border-border">
                    <span className="text-xs text-muted-foreground block font-mono">CRM Engine</span>
                    <span className="font-bold text-sm">GoHighLevel Sub-Account</span>
                  </div>
                  <div className="p-3 bg-muted/40 rounded border border-border">
                    <span className="text-xs text-muted-foreground block font-mono">Channel Mix</span>
                    <span className="font-bold text-sm">Email (5) + SMS (2)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded bg-card border border-border/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">Lead Capture Webhook & Contact Creation</h5>
                      <p className="text-xs text-muted-foreground mt-0.5">Custom form sends payload with patient name, email, and tags: <code>[glp1-lead]</code>, <code>[stall-status:active]</code>.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-card border border-border/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">Instant PDF Guide Fulfillment Email</h5>
                      <p className="text-xs text-muted-foreground mt-0.5">Delivers the breakdown guide with advice on protein intake, electrolyte imbalance, and metabolic adaptation.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-card border border-border/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">15-Minute Two-Way SMS Follow-up</h5>
                      <p className="text-xs text-muted-foreground mt-0.5">Conversational check-in from provider Karen: &quot;Hey [First_Name], it&apos;s Karen! Just sent over your stall guide. Did you get the email okay?&quot;</p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-card border border-border/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">Clinical Consultation Triage</h5>
                      <p className="text-xs text-muted-foreground mt-0.5">Direct calendar booking link for in-clinic body composition scan, metabolic lab check, or doctor consultation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "copy" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase">
                  <TrendingUp className="w-4 h-4" />
                  <span>Performance Benchmarks</span>
                </div>
                <h4 className="text-xl font-bold text-foreground">MedSpa Campaign Results</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                  <div className="p-4 bg-muted/40 rounded-lg text-center border border-border">
                    <div className="text-2xl font-bold text-primary font-mono">48.6%</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">Opt-In Rate</div>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-lg text-center border border-border">
                    <div className="text-2xl font-bold text-foreground font-mono">$4.12</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">Cost Per Lead</div>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-lg text-center border border-border">
                    <div className="text-2xl font-bold text-emerald-500 font-mono">68.4%</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">Email Open Rate</div>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-lg text-center border border-border">
                    <div className="text-2xl font-bold text-primary font-mono">31.2%</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">Consult Booking</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compared to traditional MedSpa ads promoting discounted consultations, offering a direct, empathy-driven solution to GLP-1 weight stalls captured higher-intent patients at a significantly lower acquisition cost.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

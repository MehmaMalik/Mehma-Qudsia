import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Check,
  X,
  Mail,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  CheckCircle2,
  Download,
  Sparkles,
  Layers,
  Workflow,
  Clock,
  MessageSquare,
  ShieldCheck,
  Send,
  Zap,
  Activity,
  HeartPulse,
  User,
  ChevronRight,
  FileText
} from "lucide-react";

export default function GLP1StalledPreview(props?: { embedded?: boolean }) {
  const embedded = props?.embedded ?? false;

  // Form State
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Tab State for deep portfolio review
  const [activeTab, setActiveTab] = useState<"preview" | "workflow" | "copy">("preview");
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Workflow Simulator Step
  const [simulatedStep, setSimulatedStep] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSimulatedStep(1);
    }, 700);
  };

  // Auto-advance simulated steps when submitted
  useEffect(() => {
    if (isSubmitted && simulatedStep > 0 && simulatedStep < 4) {
      const timer = setTimeout(() => {
        setSimulatedStep((prev) => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isSubmitted, simulatedStep]);

  return (
    <div className="min-h-screen bg-[#0d0f14] text-slate-100 flex flex-col font-sans selection:bg-[#b8864e] selection:text-white">
      {/* --- PORTFOLIO HEADER BAR --- */}
      {!embedded && (
        <header className="h-14 bg-[#141822] border-b border-[#262c3a] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 text-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2.5 py-1.5 rounded bg-card/60 border border-border/70 hover:border-primary/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono">Back to Portfolio</span>
            </Link>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white text-sm hidden md:inline">
                GLP-1 Stalled Guide — MedSpa Funnel & Automation
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono">
                MedSpa & Aesthetics
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View switcher */}
            <div className="hidden lg:flex items-center bg-[#0d0f14] border border-[#262c3a] rounded p-0.5">
              <button
                type="button"
                onClick={() => setDeviceView("desktop")}
                className={`p-1.5 rounded ${
                  deviceView === "desktop" ? "bg-[#262c3a] text-white" : "text-slate-400 hover:text-white"
                }`}
                title="Desktop 1200px"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView("tablet")}
                className={`p-1.5 rounded ${
                  deviceView === "tablet" ? "bg-[#262c3a] text-white" : "text-slate-400 hover:text-white"
                }`}
                title="Tablet 768px"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView("mobile")}
                className={`p-1.5 rounded ${
                  deviceView === "mobile" ? "bg-[#262c3a] text-white" : "text-slate-400 hover:text-white"
                }`}
                title="Mobile 420px"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 bg-[#0d0f14] p-1 border border-[#262c3a] rounded">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeTab === "preview" ? "bg-primary text-primary-foreground font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                Live Funnel
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("workflow")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeTab === "workflow" ? "bg-primary text-primary-foreground font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                CRM Automation
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("copy")}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  activeTab === "copy" ? "bg-primary text-primary-foreground font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                Case Study
              </button>
            </div>
          </div>
        </header>
      )}

      {/* --- MAIN DISPLAY --- */}
      <div className="flex-1 overflow-y-auto">
        {/* TAB 1: LIVE FUNNEL PREVIEW */}
        {activeTab === "preview" && (
          <div
            className={`mx-auto transition-all duration-300 ${
              deviceView === "desktop"
                ? "w-full"
                : deviceView === "tablet"
                ? "max-w-[820px] my-6 border border-[#262c3a] rounded-2xl overflow-hidden shadow-2xl"
                : "max-w-[430px] my-6 border border-[#262c3a] rounded-2xl overflow-hidden shadow-2xl"
            }`}
          >
            {/* HERO SECTION MATCHING EXACT SCREENSHOT */}
            <section className="relative min-h-[85vh] bg-[#12161f] overflow-hidden flex items-center py-12 md:py-20 px-4 sm:px-8 lg:px-16">
              {/* Background gradient & moody aesthetic glow */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1800&q=80")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e14] via-[#0d121ba6] to-[#0b0e14]/90" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b8864e]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Direct-Response Headlines & Key Bullet Points */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-mono uppercase tracking-wider shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#c19456]" />
                    <span>GLP-1 SUPPORT WITH KAREN</span>
                  </div>

                  {/* Main Display Heading with Italic Caramel Serif Accent */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-black tracking-tight leading-[1.1] text-white">
                    Is your <span className="italic text-[#caa069] font-serif">GLP-1 stalled?</span>
                  </h1>

                  {/* Subheadline */}
                  <p className="text-xl sm:text-2xl font-serif text-slate-100 font-normal leading-snug">
                    Get the free guide that shows you why the scale stopped moving, and what to do next.
                  </p>

                  {/* Body Paragraph */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                    If your weight loss slowed down or stopped completely, you&apos;re not doing anything wrong.
                    Most GLP-1 plans miss a few key pieces that keep results going long term. This guide walks you
                    through what&apos;s actually happening in your body and the simple fixes that get things moving
                    again.
                  </p>

                  {/* Bullet Points with Checkmarks */}
                  <div className="space-y-3 pt-2">
                    {[
                      "Why GLP-1 progress stalls, even when you're doing everything right",
                      "The 3 gaps most plans miss",
                      "Simple daily habits that support your results",
                      "What to ask your provider before changing your dose",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-sm sm:text-base text-slate-200 font-medium leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: White Opt-In Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 text-slate-900 transition-all">
                    {!isSubmitted ? (
                      <>
                        <h2 className="text-2xl sm:text-[26px] font-serif font-black text-slate-950 tracking-tight leading-tight mb-2">
                          Stalled on GLP-1? This guide can help.
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                          Get instant access to the guide that breaks down why your weight loss stopped and what to do
                          about it. No fluff, just what works.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              First Name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your first name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8864e]/50 focus:border-[#b8864e] transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Email <span className="text-rose-600">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="email"
                                required
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8864e]/50 focus:border-[#b8864e] transition-all"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 px-4 rounded-lg bg-[#b8864e] hover:bg-[#a6753d] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Generating Guide...</span>
                              </>
                            ) : (
                              <span>SEND ME THE FREE GUIDE</span>
                            )}
                          </button>
                        </form>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>100% Privacy Protected</span>
                          </span>
                          <span>Instant PDF Delivery</span>
                        </div>
                      </>
                    ) : (
                      /* SUCCESS & AUTOMATION DISPATCH STATE */
                      <div className="py-3 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-bold text-slate-950">
                            Guide Sent to {firstName || "Your Inbox"}!
                          </h3>
                          <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                            We just dispatched your copy to <span className="font-semibold text-slate-900">{email}</span>.
                          </p>
                        </div>

                        {/* Instant Download Card */}
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-left text-xs text-amber-950 space-y-2">
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1.5 text-[#a6753d]">
                              <FileText className="w-4 h-4" />
                              <span>Stalled GLP-1 Breakthrough Guide (PDF)</span>
                            </span>
                            <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">
                              2.4 MB
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            Includes the 3-Step Protein/Hydration Protocol & Provider Conversation Sheet.
                          </p>
                          <a
                            href="#download"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Simulating PDF download: "GLP-1-Stall-Breakthrough-Guide-${firstName || "Patient"}.pdf"`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#b8864e] text-white rounded font-bold text-xs uppercase tracking-wider hover:bg-[#a6753d] transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Instant PDF</span>
                          </a>
                        </div>

                        {/* Live Automation Pipeline Status */}
                        <div className="pt-2 text-left space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase">
                            <span>GoHighLevel Automation Active</span>
                            <span className="text-emerald-600 font-bold">Live Synced</span>
                          </div>
                          <div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-2 text-emerald-700 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Step 1: Contact Created & Tagged [glp1-stall-lead]</span>
                            </div>
                            <div className={`flex items-center gap-2 ${simulatedStep >= 2 ? "text-emerald-700 font-medium" : "text-slate-400"}`}>
                              {simulatedStep >= 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5" />}
                              <span>Step 2: Welcome Email Sent with Attachment</span>
                            </div>
                            <div className={`flex items-center gap-2 ${simulatedStep >= 3 ? "text-emerald-700 font-medium" : "text-slate-400"}`}>
                              {simulatedStep >= 3 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5" />}
                              <span>Step 3: SMS Follow-up Queued (+15m delay)</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsSubmitted(false);
                            setSimulatedStep(0);
                          }}
                          className="text-xs text-slate-400 hover:text-slate-700 underline font-mono"
                        >
                          ← Test with another email
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* TRUST & PROOF SECTION */}
            <section className="bg-[#0b0e14] py-10 px-4 sm:px-8 border-t border-[#1e2433]">
              <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 rounded-xl bg-[#141822] border border-[#262c3a]">
                  <p className="text-2xl sm:text-3xl font-bold text-[#caa069] font-mono">48.6%</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Opt-In Rate</p>
                </div>
                <div className="p-4 rounded-xl bg-[#141822] border border-[#262c3a]">
                  <p className="text-2xl sm:text-3xl font-bold text-white font-mono">5-Day</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Automated Nurture</p>
                </div>
                <div className="p-4 rounded-xl bg-[#141822] border border-[#262c3a]">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">31.2%</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Consultation Booking</p>
                </div>
                <div className="p-4 rounded-xl bg-[#141822] border border-[#262c3a]">
                  <p className="text-2xl sm:text-3xl font-bold text-white font-mono">GHL</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">CRM + SMS Trigger</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: CRM AUTOMATION & WORKFLOW ARCHITECTURE */}
        {activeTab === "workflow" && (
          <div className="max-w-5xl mx-auto py-10 px-4 sm:px-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-2">
                <Workflow className="w-3.5 h-3.5" />
                <span>GoHighLevel Backend Sequence</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                GLP-1 Stall Nurture & MedSpa Conversion Pipeline
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                This direct-response funnel feeds a 5-step automated multi-channel sequence designed to educate
                patients, resolve protocol gaps, and convert stalled patients into high-ticket MedSpa clinical consults.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div className="space-y-4 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-[#262c3a]">
              {/* Node 1: Trigger */}
              <div className="relative flex items-start gap-4 p-5 rounded-xl bg-[#141822] border border-[#262c3a] shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold shrink-0 z-10">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Trigger 01</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">Instant</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">Form Submitted: Stalled GLP-1 Guide Opt-in</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Lead captured from landing page. Applies Tags: <code className="text-primary font-mono">[glp1-lead]</code>, <code className="text-primary font-mono">[status:stalled]</code>, <code className="text-primary font-mono">[source:guide_download]</code>.
                  </p>
                </div>
              </div>

              {/* Node 2: Email 1 */}
              <div className="relative flex items-start gap-4 p-5 rounded-xl bg-[#141822] border border-[#262c3a] shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold shrink-0 z-10">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-400">Step 02 · Email Delivery</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">0 min delay</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">
                    Subject: [Guide Inside] Why your GLP-1 stalled (and how to fix it)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Sends automated HTML email containing direct download link to PDF, highlights the 3 common metabolic reasons for stalled weight, and sets expectations for tomorrow&apos;s provider checklist.
                  </p>
                </div>
              </div>

              {/* Node 3: SMS Follow-up */}
              <div className="relative flex items-start gap-4 p-5 rounded-xl bg-[#141822] border border-[#262c3a] shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0 z-10">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Step 03 · Conversational SMS</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">15 min delay</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">
                    SMS: &quot;Hey [First_Name], it&apos;s Karen! Just sent over your stall guide...&quot;
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Automated two-way conversational SMS asking if they received the PDF. Any positive reply branches the workflow to MedSpa clinical intake triage.
                  </p>
                </div>
              </div>

              {/* Node 4: Day 2 Provider Question Prep */}
              <div className="relative flex items-start gap-4 p-5 rounded-xl bg-[#141822] border border-[#262c3a] shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold shrink-0 z-10">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-400">Step 04 · Nurture & Education</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">Day 2 (24 hrs)</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">
                    Email: What to ask your provider before adjusting dosage
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Positions the clinic as high-integrity patient advocates. Explains why increasing dosage isn&apos;t always the answer when protein & electrolytes are depleted.
                  </p>
                </div>
              </div>

              {/* Node 5: MedSpa Consult Invite */}
              <div className="relative flex items-start gap-4 p-5 rounded-xl bg-[#141822] border border-primary/40 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary border border-primary/50 flex items-center justify-center font-bold shrink-0 z-10">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary">Step 05 · MedSpa Clinical Conversion</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30">Day 4 (72 hrs)</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">
                    Consultation Offer: Free InBody Scan & GLP-1 Protocol Evaluation
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Drives patient to schedule an in-clinic body composition evaluation or telehealth consult to customize supportive peptide/nutrition protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CASE STUDY & PSYCHOLOGY */}
        {activeTab === "copy" && (
          <div className="max-w-4xl mx-auto py-10 px-4 sm:px-8 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-primary">Direct-Response Strategy</span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
                Why the &quot;Stalled GLP-1&quot; Angle Converted at 48.6%
              </h2>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              <div className="p-5 rounded-xl bg-[#141822] border border-[#262c3a]">
                <h3 className="font-bold text-white text-base mb-2">1. The Psychological Reframe: Removing Patient Guilt</h3>
                <p>
                  Patients on Semaglutide or Tirzepatide frequently experience a 3 to 6-week plateau. Most assume their medication has failed or that they lack discipline. By explicitly stating <strong className="text-white">&quot;you&apos;re not doing anything wrong&quot;</strong>, the copy neutralizes defensiveness and validates their emotional frustration immediately.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#141822] border border-[#262c3a]">
                <h3 className="font-bold text-white text-base mb-2">2. Low-Friction Lead Magnet Instead of High-Resistance Sales</h3>
                <p>
                  Instead of pitching expensive treatments or clinic visits upfront, this funnel offers a practical 4-page checklist and provider cheat sheet. This reduced the cost per qualified lead by 64% compared to standard &quot;Book a MedSpa Consultation&quot; direct ads.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#141822] border border-[#262c3a]">
                <h3 className="font-bold text-white text-base mb-2">3. Immediate Omnichannel CRM Nurture</h3>
                <p>
                  Leads that receive both an email and a personalized 15-minute SMS check-in convert at 3.4x higher rates into booked clinic appointments. The GoHighLevel workflow tracks engagement and notifies clinic staff when high-intent leads reply.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

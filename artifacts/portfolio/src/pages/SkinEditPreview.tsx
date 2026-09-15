import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  Lock,
  CheckCircle2,
  Award,
  FileText,
  BookOpen,
  Layers,
  Download,
  Info,
  Maximize2
} from "lucide-react";

export default function SkinEditPreview(props?: { embedded?: boolean }) {
  const embedded = props?.embedded ?? false;
  // Countdown Timer State (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 23, seconds: 31 });
  
  // Interactive Order Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [includeBump, setIncludeBump] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Viewport Device Switcher for Portfolio Reviewers
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Countdown timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24 mins cycle for perpetual demo
          return { hours: 0, minutes: 24, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n: number) => n.toString().padStart(2, "0");
  const timerString = `${formatDigits(timeLeft.hours)}:${formatDigits(timeLeft.minutes)}:${formatDigits(timeLeft.seconds)}`;

  const basePrice = 27;
  const bumpPrice = 17;
  const totalPrice = includeBump ? basePrice + bumpPrice : basePrice;

  const scrollToCheckout = () => {
    const el = document.getElementById("checkout-box");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
    }, 750);
  };

  const faqs = [
    {
      q: "Who is this guide for?",
      a: "Anyone who is tired of guessing. Whether you're starting from zero or already have twelve products and nothing to show for it, this guide starts from what your skin actually needs."
    },
    {
      q: "Why is it only $27?",
      a: "Because skincare education should not be locked behind a $350 private clinical consultation. I built this guide to be the definitive introductory framework that stops people from wasting hundreds on trending products that disrupt their skin barrier."
    },
    {
      q: "Can't I find all of this free online?",
      a: "You can find fragmented, conflicting opinions from influencers sponsored by brands. The Skin Edit gives you an objective, clinical-grade protocol from a board-certified Aesthetic Nurse Practitioner — zero brand sponsorships, zero trend bias, just medical skin science."
    },
    {
      q: "Do I have to throw out my current products?",
      a: "Not necessarily. The guide includes an ingredient audit worksheet so you can evaluate the items already on your counter. You will discover which formulas are worth keeping, which to repurpose, and which are actively cancelling out your other steps."
    },
    {
      q: "How long is it, and how fast can I go through it?",
      a: "It is concise, visual, and highly actionable. Most readers finish the core guide and fill out their personalized AM/PM routine worksheet in about 40 minutes."
    },
    {
      q: "What if I have sensitive or reactive skin?",
      a: "The framework specifically focuses on barrier integrity and inflammation suppression. It was designed from my clinical practice working with highly reactive, redness-prone, and breakout-prone skin profiles."
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Yes, 100%. Read through the entire guide for 30 days. If you don't feel dramatically more confident in your routine and understand exactly what your skin needs, simply email your receipt for a full refund."
    },
    {
      q: "Is this medical advice?",
      a: "The Skin Edit provides educational cosmetic skin science and routine structuring principles. It does not replace individualized clinical diagnosis or treatment for pathological medical dermatologic diseases."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ef] text-stone-900 font-sans selection:bg-[#8b2644] selection:text-white">
      {/* --- PORTFOLIO REVIEWER BANNER (When accessed as full page) --- */}
      {!embedded && (
        <header className="sticky top-0 z-50 bg-[#161311]/95 text-stone-300 border-b border-stone-800 px-4 py-2.5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <Link
                href="/#funnels"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-medium cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Portfolio</span>
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-semibold text-white">Live Client Sales Funnel Demo:</span>
                <span className="text-stone-400">Luna Skin Lab — The Skin Edit</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  Direct-Response GHL Funnel
                </span>
              </div>
            </div>

            {/* Device Emulation Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-400 hidden md:inline">Preview Width:</span>
              <div className="flex items-center bg-stone-900 border border-stone-700 rounded-lg p-0.5">
                <button
                  onClick={() => setDeviceMode("desktop")}
                  className={`p-1.5 rounded flex items-center gap-1 transition-all ${
                    deviceMode === "desktop" ? "bg-[#8b2644] text-white font-bold" : "text-stone-400 hover:text-white"
                  }`}
                  title="Desktop View"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline text-[10px]">Desktop</span>
                </button>
                <button
                  onClick={() => setDeviceMode("tablet")}
                  className={`p-1.5 rounded flex items-center gap-1 transition-all ${
                    deviceMode === "tablet" ? "bg-[#8b2644] text-white font-bold" : "text-stone-400 hover:text-white"
                  }`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline text-[10px]">Tablet</span>
                </button>
                <button
                  onClick={() => setDeviceMode("mobile")}
                  className={`p-1.5 rounded flex items-center gap-1 transition-all ${
                    deviceMode === "mobile" ? "bg-[#8b2644] text-white font-bold" : "text-stone-400 hover:text-white"
                  }`}
                  title="Mobile View (420px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline text-[10px]">Mobile</span>
                </button>
              </div>

              <button
                onClick={scrollToCheckout}
                className="px-3 py-1.5 rounded bg-[#8b2644] hover:bg-[#722036] text-white font-medium text-xs transition-colors flex items-center gap-1"
              >
                <span>Jump to Order Bump</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* --- FUNNEL VIEWPORT WRAPPER --- */}
      <div className={`transition-all duration-300 mx-auto ${
        deviceMode === "mobile"
          ? "max-w-[430px] my-6 shadow-2xl rounded-3xl overflow-hidden border-8 border-stone-800"
          : deviceMode === "tablet"
          ? "max-w-[768px] my-6 shadow-2xl rounded-2xl overflow-hidden border-4 border-stone-800"
          : "w-full"
      }`}>
        {/* ========================================================================= */}
        {/* 1. TOP URGENCY COUNTDOWN BANNER                                          */}
        {/* ========================================================================= */}
        <div className="bg-[#1c1917] text-white py-2.5 px-4 text-xs font-medium text-center flex flex-wrap items-center justify-center gap-2 sm:gap-4 tracking-wide border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#d97762] animate-pulse" />
            <span>
              Launch price ends in{" "}
              <span className="font-mono font-bold text-[#f5a794] tracking-wider px-1 py-0.5 rounded bg-black/40">
                {timerString}
              </span>{" "}
              — then it goes back to $47
            </span>
          </div>
          <button
            onClick={scrollToCheckout}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#f5a794] hover:text-white underline underline-offset-4 cursor-pointer"
          >
            <span>Get The Skin Edit — $27</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. BRAND HEADER                                                          */}
        {/* ========================================================================= */}
        <nav className="bg-[#faf7f2] border-b border-stone-200/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-serif tracking-[0.25em] text-lg sm:text-xl font-semibold text-stone-900 uppercase">
              LUNA <span className="font-light text-stone-500">SKIN LAB</span>
            </div>
          </div>

          <button
            onClick={scrollToCheckout}
            className="bg-[#8b2644] hover:bg-[#722036] text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors shadow-sm hover:shadow active:scale-95 cursor-pointer"
          >
            Get The Skin Edit — $27
          </button>
        </nav>

        {/* ========================================================================= */}
        {/* 3. HERO SECTION                                                          */}
        {/* ========================================================================= */}
        <section className="bg-[#faf7f2] pt-10 sm:pt-16 pb-14 sm:pb-20 px-6 sm:px-12 border-b border-stone-200">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Copy & Primary CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block">
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.18em] uppercase text-[#a84d41] bg-[#a84d41]/10 px-3 py-1 rounded-full border border-[#a84d41]/20">
                  DESIGNED, DELIVERED BY A PROVIDER WHO GETS IT
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.4rem] leading-[1.12] text-stone-950 font-normal tracking-tight">
                Stop guessing what your skin actually{" "}
                <span className="italic font-serif text-[#8b2644] font-normal">needs</span>
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
                A science-backed guide to your skin — so you finally know the ingredients that actually work, in the order that works, without the ten-step routine you've spent years talking yourself into.
              </p>

              {/* Primary Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={scrollToCheckout}
                  className="w-full sm:w-auto bg-[#8b2644] hover:bg-[#722036] text-white font-semibold text-base px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get instant access — $27</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 text-stone-500 text-sm">
                  <span className="line-through text-stone-400 font-medium">$47</span>
                  <span className="text-stone-400">·</span>
                  <span className="font-medium text-stone-700 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-[#8b2644]" />
                    Instant download
                  </span>
                </div>
              </div>

              {/* Provider Signature Card */}
              <div className="pt-4 flex items-center gap-3.5 border-t border-stone-200/80">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-stone-300 shadow-sm shrink-0 bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1594824813589-981c2f9d6589?auto=format&fit=crop&w=200&q=80"
                    alt="Dr. Sheryl, DNP, FNP-C"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">
                    By Dr. Sheryl, DNP, FNP-C
                  </div>
                  <div className="text-xs text-stone-500">
                    Aesthetic Nurse Practitioner
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Offer Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[360px] sm:max-w-[400px] rounded-[2.2rem] bg-[#9e8465] p-3 shadow-xl">
                <div className="relative rounded-[1.8rem] overflow-hidden bg-stone-100 aspect-[4/5] shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
                    alt="Serene woman receiving facial skin therapy"
                    className="w-full h-full object-cover"
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-bold text-stone-800 shadow-sm border border-stone-200/50">
                    Scientific Skin Protocol
                  </div>
                </div>

                {/* Bottom Overlay Card */}
                <div className="mt-3 p-4 sm:p-5 rounded-[1.6rem] bg-[#907759] text-white text-center space-y-2.5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-stone-300 line-through text-sm sm:text-base">$47</span>
                    <span className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">$27 today</span>
                  </div>

                  <button
                    onClick={scrollToCheckout}
                    className="w-full bg-[#8b2644] hover:bg-[#722036] text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow transition-colors cursor-pointer"
                  >
                    Get The Skin Edit
                  </button>

                  <div className="text-[11px] text-stone-200 font-medium">
                    Instant access · 30-day guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CREDIBILITY TRUST BAR                                                 */}
        {/* ========================================================================= */}
        <section className="bg-[#f2e9e1] border-b border-stone-200/90 py-6 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-0.5">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">12 yrs</div>
              <div className="text-xs text-stone-600 font-medium">in aesthetic practice</div>
            </div>
            <div className="space-y-0.5 border-l border-stone-300/80 pl-2">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">3,000+</div>
              <div className="text-xs text-stone-600 font-medium">patients treated</div>
            </div>
            <div className="space-y-0.5 border-l border-stone-300/80 pl-2">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">DNP, FNP-C</div>
              <div className="text-xs text-stone-600 font-medium">board-certified</div>
            </div>
            <div className="space-y-0.5 border-l border-stone-300/80 pl-2">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">30-day</div>
              <div className="text-xs text-stone-600 font-medium">money-back guarantee</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PROBLEM & AGITATION SECTION                                           */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#faf7f2] border-b border-stone-200">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
            <h2 className="font-serif text-2xl sm:text-4xl text-stone-950 font-normal leading-tight">
              You've tried the serums. You've read the comments. Your skin still isn't cooperating.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              It's not that you haven't tried. It's that nobody ever taught you what your skin actually needs — so you've been guessing with expensive products and hoping.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f5ede5] rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2.5">
                  Routines built on trends, not your skin
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  You bought a product because everyone said it worked, and it did nothing — or made things worse. That is not a discipline problem.
                </p>
              </div>
            </div>

            <div className="bg-[#f5ede5] rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2.5">
                  The shelf is crowded, actually in your pockets
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Ten steps, four actives, no idea which one is doing the work. Layering the wrong things quietly cancels the good ones out.
                </p>
              </div>
            </div>

            <div className="bg-[#f5ede5] rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2.5">
                  You've spent real money with nothing to show for it
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Serums, tools, facials — and you still can't answer the one question that matters: what does my skin actually need?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. EMPATHY & REFRAME SECTION                                             */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#f4eae1] border-b border-stone-200">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a84d41]">
              YOU'RE NOT IMAGINING IT
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl text-stone-950 font-normal leading-tight">
              Your routine is working exactly as written. It was just written for someone else's skin.
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed text-left sm:text-center">
              <p>
                You're consistent. You use it morning and night. You waited the twelve weeks everyone told you to wait. And your skin is doing the same thing it was doing a year ago.
              </p>
              <p>
                That isn't a willpower problem and it isn't a product problem. Those products are doing precisely what they were formulated to do — for a skin type, a barrier state and a layering order that may have nothing to do with yours.
              </p>
              <p className="font-semibold text-stone-900 pt-2">
                Until someone names which one of those three is off, you will keep buying, keep waiting, and keep getting the same result.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CLIENT PULL QUOTE CALLOUT                                             */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 px-6 sm:px-12 bg-[#faf7f2] border-b border-stone-200">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-950 leading-snug">
              "I cut my routine from eleven products to four{" "}
              <span className="italic text-[#8b2644] font-normal">and my skin finally calmed down.</span>"
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto italic leading-relaxed">
              "I'd spent two years buying whatever was trending and wondering why nothing held. Forty minutes with this guide and I understood what I'd been doing to my barrier. Four products now. My skin has never looked better."
            </p>
            <div className="text-[11px] font-mono text-stone-400 tracking-wider uppercase pt-1">
              — Verified Client Case Study · 6-Week Barrier Reset
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. WHAT YOU GET / THE OFFER STACK                                        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#f5ede5] border-b border-stone-200">
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-stone-500">
              WHAT YOU GET
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-stone-950 font-normal">
              Introducing The Skin Edit: Skin, Simplified
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
              Everything you need to finally understand your skin, in one place — no more scrolling 100-page comment threads for an answer.
            </p>
          </div>

          {/* 4 Deliverable Cards */}
          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            <div className="bg-[#faf7f2] rounded-xl p-5 sm:p-6 border border-stone-200/90 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="font-serif text-lg font-bold text-[#8b2644] mt-0.5">1</span>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">The Skin Edit guide</h4>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Find your real skin type in five minutes, then build a routine around your actual problem instead of someone else's.
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-stone-500 shrink-0">
                Value $47
              </div>
            </div>

            <div className="bg-[#faf7f2] rounded-xl p-5 sm:p-6 border border-stone-200/90 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="font-serif text-lg font-bold text-[#8b2644] mt-0.5">2</span>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">The ingredient decoder</h4>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Cleansers, retinoids, vitamin C, niacinamide and acids — what each one does, who it's for, and how to read a label.
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-stone-500 shrink-0">
                Value $39
              </div>
            </div>

            <div className="bg-[#faf7f2] rounded-xl p-5 sm:p-6 border border-stone-200/90 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="font-serif text-lg font-bold text-[#8b2644] mt-0.5">3</span>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">The layering map</h4>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    The exact order to apply actives so they stop cancelling out, plus what to never combine.
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-stone-500 shrink-0">
                Value $29
              </div>
            </div>

            <div className="bg-[#faf7f2] rounded-xl p-5 sm:p-6 border border-stone-200/90 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="font-serif text-lg font-bold text-[#8b2644] mt-0.5">4</span>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">Your routine worksheet</h4>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    A personalised AM/PM plan you fill in as you read, so you finish with a routine and not just notes.
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono font-semibold text-stone-500 shrink-0">
                Value $25
              </div>
            </div>
          </div>

          {/* Value Summary Box */}
          <div className="max-w-3xl mx-auto bg-[#faf7f2] rounded-2xl p-6 sm:p-8 border border-stone-300 text-center shadow-md space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Total value $140
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
              Yours today for $27
            </div>
            <div>
              <button
                onClick={scrollToCheckout}
                className="bg-[#8b2644] hover:bg-[#722036] text-white font-semibold text-base px-8 py-3.5 rounded-lg shadow transition-colors cursor-pointer"
              >
                Get The Skin Edit — $27
              </button>
            </div>
            <div className="text-xs text-stone-500 font-medium">
              Launch price ends in {timerString} · then $47
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. QUALIFICATION CHECKLIST                                               */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#faf7f2] border-b border-stone-200">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-4xl text-stone-950 font-normal">
              Let's make sure this is actually for you
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* This is for you if... */}
            <div className="bg-[#f3ede6] rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
                This is for you if...
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>You're tired of guessing and want one plan you can actually follow.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>You own products you can't justify and don't know which to keep.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Your skin is sensitive or reactive and everything seems to set it off.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>You want to understand the why, not just be handed a product list.</span>
                </li>
              </ul>
            </div>

            {/* This isn't for you if... */}
            <div className="bg-[#f3ede6] rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">✕</span>
                This isn't for you if...
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>You want a diagnosis for a medical skin condition — see a provider.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>You're looking for a ten-step routine and a shopping spree.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>You want overnight results without changing how you layer.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. MEET THE FOUNDER / DR. SHERYL                                        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#f4ebe2] border-b border-stone-200">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Clinic Portrait */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-stone-200 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1594824813589-981c2f9d6589?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Sheryl in clinical scrubs"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a84d41]">
                MEET DR. SHERYL
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal leading-tight">
                I didn't learn this from a textbook. I learned it from my own skin.
              </h2>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>
                  I spent years chasing clear skin with the wrong products and the wrong advice. I'm a provider — and I still got it wrong, because nobody had ever explained the fundamentals in plain language.
                </p>
                <p>
                  Once I understood how ingredients actually behave on skin, everything changed. I rebuilt my routine around four things instead of fourteen, and I've used the same framework with hundreds of patients since.
                </p>
              </div>

              {/* Quote Card */}
              <div className="p-5 rounded-xl bg-[#faf7f2] border-l-4 border-[#8b2644] shadow-sm space-y-2">
                <p className="font-serif italic text-stone-900 text-sm sm:text-base">
                  "Your skin isn't broken. It's just been handed a plan that was never written for it."
                </p>
                <div className="text-xs font-mono text-stone-500">
                  — Dr. Sheryl, DNP, FNP-C
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. CLINICAL PROOF & RESULTS GALLERY                                     */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#f7efe6] border-b border-stone-200">
          <div className="max-w-5xl mx-auto text-center space-y-3 mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
              Skin I get to help every day
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Real treatments, real routines — the same principles inside The Skin Edit, applied in clinic.
            </p>
          </div>

          {/* 4 Proof Images Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1512290900672-1f02a0a8ffbc?auto=format&fit=crop&w=600&q=80"
                alt="Clinical treatment session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                alt="Clear glowing skin after 6 weeks"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
                alt="Calmed skin barrier closeup"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                alt="Dr. Sheryl clinic hallway"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 12. SOCIAL PROOF / REVIEWS                                               */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#faf7f2] border-b border-stone-200">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
              What happens once the guessing stops
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#faf7f2] rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-stone-900 text-xs sm:text-sm leading-relaxed">
                  "I cut my routine from eleven products to four and my skin is calmer than it's been in years. I finally know why each step is there."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200/60 text-[11px] font-mono text-stone-400">
                Verified Patient Review
              </div>
            </div>

            <div className="bg-[#faf7f2] rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-stone-900 text-xs sm:text-sm leading-relaxed">
                  "The layering map alone was worth it. I'd been using two actives together that were cancelling each other out the whole time."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200/60 text-[11px] font-mono text-stone-400">
                Verified Patient Review
              </div>
            </div>

            <div className="bg-[#faf7f2] rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-stone-900 text-xs sm:text-sm leading-relaxed">
                  "I stopped buying things off TikTok. I read a label now and know in ten seconds whether it's for me."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200/60 text-[11px] font-mono text-stone-400">
                Verified Patient Review
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 13. HIGH-CONVERTING ORDER BOX & ORDER BUMP CHECKOUT                      */}
        {/* ========================================================================= */}
        <section id="checkout-box" className="py-16 sm:py-24 px-6 sm:px-12 bg-[#f4ebe2] border-b border-stone-200 scroll-mt-16">
          <div className="max-w-xl mx-auto bg-[#faf7f2] rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-xl space-y-6">
            {/* Header */}
            <div className="text-center space-y-2 border-b border-stone-200 pb-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                Get The Skin Edit
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Instant access. One payment. Yours to keep.
              </p>
              <div className="text-xs font-mono font-semibold text-[#8b2644]">
                Launch price ends in {timerString} · then $47
              </div>
            </div>

            {orderComplete ? (
              /* Order Confirmation State */
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Welcome to The Skin Edit!
                </h4>
                <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                  Thank you, <strong>{name || "Valued Reader"}</strong>! Your instant digital access package and download credentials have been routed to <strong>{email || "your email address"}</strong>.
                </p>
                <div className="pt-2">
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Simulated download: In production GoHighLevel webhook, this triggers an automated email with direct PDF access links and worksheet templates.");
                    }}
                    className="inline-flex items-center gap-2 bg-[#8b2644] hover:bg-[#722036] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Skin Edit Bundle (PDF)</span>
                  </a>
                </div>
                <button
                  onClick={() => setOrderComplete(false)}
                  className="block mx-auto text-xs text-stone-500 hover:text-stone-800 underline mt-2"
                >
                  Test another order
                </button>
              </div>
            ) : (
              /* Order Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                {/* Form Inputs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-stone-700">
                    Full name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b2644]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-stone-700">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b2644]"
                  />
                </div>

                {/* ------------------------------------------------------------- */}
                {/* ORDER BUMP CHECKBOX CONTAINER (HIGH CONVERTING GHL PATTERN)    */}
                {/* ------------------------------------------------------------- */}
                <div
                  onClick={() => setIncludeBump(!includeBump)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 select-none ${
                    includeBump
                      ? "bg-[#fff7f2] border-[#8b2644] shadow-sm ring-2 ring-[#8b2644]/15"
                      : "bg-[#f5ede5]/70 border-stone-300 hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={includeBump}
                      onChange={() => {}} // Handled by parent container click
                      className="mt-1 w-4 h-4 rounded text-[#8b2644] focus:ring-[#8b2644] accent-[#8b2644] cursor-pointer shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm font-bold text-stone-950 flex flex-wrap items-center gap-1.5">
                        <span className="text-[#a84d41] font-mono">YES —</span>
                        <span>ADD THE PRODUCT SHORTLIST FOR $17</span>
                      </div>
                      <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed">
                        The exact products worth buying at every budget — drugstore to clinic — matched to each step of your new routine, so you never stand in an aisle guessing again.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Item Summary Breakdown */}
                <div className="pt-2 border-t border-stone-200 space-y-3">
                  <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300 shrink-0 bg-stone-200">
                        <img
                          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=150&q=80"
                          alt="The Skin Edit Bundle"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">The Skin Edit: Skin, Simplified</div>
                        <div className="text-stone-500 text-[11px]">Digital guide + routine worksheet</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="line-through text-stone-400 text-xs mr-1">$47</span>
                      <span className="font-bold text-stone-900">${basePrice}</span>
                    </div>
                  </div>

                  {includeBump && (
                    <div className="flex items-center justify-between text-xs sm:text-sm text-stone-700 animate-in fade-in">
                      <div className="flex items-center gap-2 pl-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#a84d41]" />
                        <span>The Product Shortlist (Drugstore to Clinic)</span>
                      </div>
                      <span className="font-bold text-stone-900">${bumpPrice}</span>
                    </div>
                  )}

                  {/* Total line */}
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                    <span>Total</span>
                    <span className="text-lg text-[#8b2644]">${totalPrice}</span>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8b2644] hover:bg-[#722036] text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing Secure Checkout...</span>
                  ) : (
                    <>
                      <span>Get instant access — ${totalPrice}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Guarantee Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f2e7de] border border-stone-300 text-center space-y-1.5">
              <div className="font-serif font-bold text-stone-900 text-sm flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8b2644]" />
                <span>Read it risk-free for 30 days</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed max-w-md mx-auto">
                Go through the whole guide. If it doesn't leave you with a clearer plan than you had before, reply to your receipt and we'll refund you in full — no form, no questions.
              </p>
            </div>

            {/* What Happens Next */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              <div className="text-xs font-mono font-bold text-stone-800 uppercase tracking-wider">
                What happens next
              </div>
              <ol className="space-y-1.5 text-xs text-stone-600 list-decimal list-inside leading-relaxed">
                <li>Your receipt and download link arrive by email in under a minute.</li>
                <li>Open the guide on any device — phone, tablet, or laptop.</li>
                <li>Fill in the worksheet as you read and finish with your routine.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 14. FAQ ACCORDION                                                        */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#faf7f2] border-b border-stone-200">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 font-normal">
              Quick answers
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4 sm:py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left font-serif text-base sm:text-lg font-medium text-stone-900 hover:text-[#8b2644] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-stone-400 shrink-0">
                    {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed pr-6 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 15. CLOSING BANNER & FOOTER                                              */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 px-6 sm:px-12 bg-[#8b2644] text-white text-center space-y-6">
          <div className="max-w-3xl mx-auto space-y-3">
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Your skin doesn't need more products. It needs a plan.
            </h2>
            <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto">
              Get the guide, build your routine, and stop paying for guesswork.
            </p>
          </div>

          <div>
            <button
              onClick={scrollToCheckout}
              className="bg-white hover:bg-stone-100 text-[#8b2644] font-bold text-sm sm:text-base px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Get the guide — $27
            </button>
          </div>

          <div className="text-xs text-stone-300 font-mono">
            Price returns to $47 in {timerString}
          </div>
        </section>

        <footer className="bg-[#1c1917] text-stone-400 py-6 px-6 text-center text-xs font-mono border-t border-stone-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>© 2026 Luna Skin Lab. All rights reserved.</div>
            <div className="flex items-center gap-4 text-stone-400">
              <button onClick={scrollToCheckout} className="hover:text-white transition-colors">Order Now</button>
              <span>·</span>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: Standard HIPAA & GDPR compliant client privacy framework."); }} className="hover:text-white transition-colors">Privacy</a>
              <span>·</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Standard digital purchase and cosmetic education terms."); }} className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "wouter";
import {
  Anchor,
  Compass,
  Ship,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ArrowLeft,
  Users,
  Waves,
  Sun,
  X,
  CreditCard,
  Check,
  ImageIcon,
  ZoomIn
} from "lucide-react";

export default function KWBoatsPreview() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<string>("All-Day Adventure Packages");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showScreenshotProof, setShowScreenshotProof] = useState(false);

  const tours = [
    {
      title: "All-Day Adventure Packages",
      rating: 5,
      features: ["Kayak", "Snorkel", "Sail"],
      desc: "Spend a full day on the water with the best Key West boat tours that bundle it all—sailing, reef snorkeling, kayaking through mangroves, and time to relax with food and drinks. These all-inclusive adventures are perfect when you want one easy booking and a whole lot of island fun. Expect clear water, coral reefs, and a laid-back crew that handles the details so you can soak up the sun.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      price: "$149 / person",
      duration: "6 Hours"
    },
    {
      title: "Big Fun on a Small Budget",
      rating: 5,
      features: ["Sunset View", "Dolphin Sightings"],
      desc: "Key West on a budget? You're in the right spot. These value-packed picks deliver sunset views, dolphin sightings, and easy reef experiences without draining your wallet. From glass-bottom rides to shared charters, you'll find flexible, family-friendly tours, free-cancellation options, and instant online booking for stress-free savings.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      price: "$65 / person",
      duration: "2.5 Hours"
    },
    {
      title: "Bubbles & Boat Rides",
      rating: 5,
      features: ["Champagne Sunset", "BYOB Tiki Boats"],
      desc: "Bride tribe, assemble. Celebrate with champagne sunset cruises, BYOB tiki boats, and Instagram-worthy sandbar parties. We curate the most fun, flexible Key West boat tours for groups—think music, open water, and golden-hour photos that hit different. Toast the bride and make it a weekend no one forgets.",
      image: "https://images.unsplash.com/photo-1510525009512-ad7fc3c7baab?auto=format&fit=crop&w=800&q=80",
      price: "$95 / person",
      duration: "3 Hours"
    }
  ];

  const categories = [
    {
      title: "Sunset Cruises",
      desc: "Sail into the horizon on a Key West sunset cruise with live music, tropical drinks, and breathtaking ocean views.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      hasStars: false
    },
    {
      title: "Dolphin Tours",
      desc: "Join our Key West dolphin tours to see playful pods in the wild and snorkel nearby reefs with expert guides.",
      image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=600&q=80",
      hasStars: false
    },
    {
      title: "Snorkeling",
      desc: "Discover colorful coral reefs and tropical fish on the best Key West snorkeling tours, perfect for families and adventurers.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      hasStars: false
    },
    {
      title: "Sandbar",
      desc: "Escape to hidden sandbars, swim in crystal-clear waters, and relax in true Key West style.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
      hasStars: true
    },
    {
      title: "Private Charters",
      desc: "Custom VIP private yacht & sailboat charters tailored for your family, celebrations, and intimate excursions.",
      image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=600&q=80",
      hasStars: true
    }
  ];

  const faqs = [
    {
      q: "Do you run these tours?",
      a: "No, we work with select local captains and operators to bring you the best of Key West."
    },
    {
      q: "How do I get my ticket?",
      a: "Instant digital confirmation and e-tickets are sent immediately to your email and SMS upon checkout. Simply show your mobile ticket at the dock."
    },
    {
      q: "What should I bring?",
      a: "We recommend sunscreen (reef-safe), sunglasses, a towel, swim attire, and your camera. Fresh ice, water, safety equipment, and snorkel gear are provided onboard."
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes! All standard bookings come with free cancellation and 100% refund up to 24 to 48 hours before scheduled departure."
    },
    {
      q: "Are the tours family-friendly?",
      a: "Yes, our reef snorkeling, sandbar escapes, and glass-bottom dolphin adventures are designed for guests of all ages, with child-size life vests provided."
    }
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80", caption: "Reef Snorkeling Adventures" },
    { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80", caption: "Sportfishing & Private Charters" },
    { url: "https://images.unsplash.com/photo-1510525009512-ad7fc3c7baab?auto=format&fit=crop&w=600&q=80", caption: "Sunset Champagne Catamaran" },
    { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80", caption: "Aerial Sandbar Swims" },
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", caption: "Tiki Boat Island Fun" },
    { url: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=600&q=80", caption: "Crystal Clear Key West Waters" }
  ];

  const handleOpenBooking = (tourTitle: string) => {
    setSelectedTour(tourTitle);
    setBookingSuccess(false);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-[#2aa9c7] selection:text-white">
      {/* --- PORTFOLIO PREVIEW BANNER --- */}
      <div className="bg-slate-900 text-slate-200 text-xs font-mono py-2.5 px-4 sticky top-0 z-50 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-primary border border-slate-700 transition-colors font-bold text-xs">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="text-slate-300 hidden sm:inline">
            Project Showcase: <strong className="text-white">KW Boat Tours (WordPress + Elementor + Booking Engine)</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScreenshotProof(true)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>View Original Screenshot</span>
          </button>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Full-Page Web View
          </span>
          <button
            onClick={() => handleOpenBooking("All-Day Adventure Packages")}
            className="px-3 py-1 rounded bg-[#2aa9c7] hover:bg-[#2390a8] text-white font-bold text-xs transition-colors shadow-sm"
          >
            Test Booking Engine
          </button>
        </div>
      </div>

      {/* --- KW BOATS MAIN NAVIGATION --- */}
      <header className="bg-white/95 backdrop-blur-md sticky top-[41px] z-40 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#e85038] text-white flex items-center justify-center shadow-md p-2 border-2 border-white">
              <Compass className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-[#0b253a] leading-none">
                KW BOAT TOURS
              </div>
              <div className="text-[10px] font-semibold text-[#2aa9c7] tracking-widest uppercase mt-0.5">
                Key West · Florida
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#home" className="text-[#2aa9c7] hover:text-[#2390a8] transition-colors">HOME</a>
            <a href="#tours" className="hover:text-[#2aa9c7] transition-colors">TOURS</a>
            <a href="#categories" className="hover:text-[#2aa9c7] transition-colors flex items-center gap-1">
              CATEGORIES <ChevronDown className="w-3.5 h-3.5" />
            </a>
            <a href="#about" className="hover:text-[#2aa9c7] transition-colors">ABOUT US</a>
            <a href="#why-us" className="hover:text-[#2aa9c7] transition-colors">WHY US</a>
            <a href="#faq" className="hover:text-[#2aa9c7] transition-colors">FAQS</a>
            <a href="#contact" className="hover:text-[#2aa9c7] transition-colors">CONTACT US</a>
          </nav>

          {/* Header Action & Book Now */}
          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2.5 text-slate-500 pr-2 border-r border-slate-200">
              <a href="tel:+17867057641" className="text-xs font-semibold text-slate-700 hover:text-[#2aa9c7] flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#2aa9c7]" /> (786) 705-7641
              </a>
            </div>
            <button
              onClick={() => handleOpenBooking("Custom Charter / Key West Tour")}
              className="bg-[#2aa9c7] hover:bg-[#2390a8] text-white text-xs sm:text-sm font-bold tracking-wide uppercase px-5 py-2.5 rounded shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK NOW</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Key West Boat Tours Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071f30]/85 via-[#0b2d47]/70 to-[#0e3c5d]/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-teal-200 text-xs font-bold uppercase tracking-wider mb-6 border border-white/20">
            <Waves className="w-4 h-4" /> Curated Excursions & Local Captains
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
            Book the Best Boat <br />
            Tours in Key West
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            From sunset sails to snorkeling adventures, we hand-pick the island's top excursions so you can book with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tours"
              className="w-full sm:w-auto bg-[#2aa9c7] hover:bg-[#2390a8] text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              VIEW ALL BOAT TOURS
            </a>
            <a
              href="#categories"
              className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded border border-white/40 transition-all"
            >
              EXPLORE ADVENTURES
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-200">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2aa9c7]" /> Instant Confirmation
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2aa9c7]" /> Free 24h Cancellation
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2aa9c7]" /> Verified Local Captains
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2aa9c7]" /> Best Price Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: POPULAR KEY WEST BOAT TOURS --- */}
      <section id="tours" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#2aa9c7] font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
              KW Boat Tours
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b253a] tracking-tight mb-4">
              Popular Key West Boat Tours
            </h2>
            <p className="text-slate-600 text-base">
              Discover our most-booked trips, from sunset cruises to dolphin encounters and sandbar escapes.
            </p>
          </div>

          {/* 3 Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours.map((tour, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Tour Image */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#0b253a] shadow-sm">
                    {tour.price}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0b253a]/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#2aa9c7]" /> {tour.duration}
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(tour.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-slate-500 ml-1">5.0 (240+ reviews)</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0b253a] mb-2 group-hover:text-[#2aa9c7] transition-colors">
                    {tour.title}
                  </h3>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#2aa9c7] mb-3">
                    {tour.features.map((feat, fIdx) => (
                      <span key={fIdx} className="inline-flex items-center gap-1">
                        ⚓ {feat}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                    {tour.desc}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={() => handleOpenBooking(tour.title)}
                    className="w-full bg-[#2aa9c7] hover:bg-[#2390a8] text-white font-bold text-xs uppercase tracking-wider py-3 rounded shadow-sm hover:shadow transition-colors text-center"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: CHOOSE YOUR ADVENTURE (CATEGORIES) --- */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#2aa9c7] font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
              Featured Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b253a] tracking-tight mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-slate-600 text-base">
              Find your perfect adventure — sunset, dolphin, snorkeling, sandbar, or a private charter.
            </p>
          </div>

          {/* Categories Grid (3 top, 2 bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {categories.slice(0, 3).map((cat, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white min-h-[320px] flex flex-col justify-end p-6 shadow-sm hover:shadow-xl transition-all"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f30] via-[#0b253a]/60 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                  <button
                    onClick={() => handleOpenBooking(cat.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2aa9c7] group-hover:text-white transition-colors"
                  >
                    Explore Tours <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.slice(3, 5).map((cat, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white min-h-[280px] flex flex-col justify-end p-6 shadow-sm hover:shadow-xl transition-all"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f30] via-[#0b253a]/60 to-transparent" />
                <div className="relative z-10">
                  {cat.hasStars && (
                    <div className="flex items-center gap-1 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                  <button
                    onClick={() => handleOpenBooking(cat.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2aa9c7] group-hover:text-white transition-colors"
                  >
                    View Packages <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: ABOUT US --- */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photos Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-xl overflow-hidden shadow-md h-64 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
                alt="Snorkeling Reef in Key West"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md h-44 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                alt="Key West Sailboat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md h-44 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1510525009512-ad7fc3c7baab?auto=format&fit=crop&w=600&q=80"
                alt="Couple on boat deck"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#2aa9c7] font-bold text-xs uppercase tracking-widest font-mono">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b253a] tracking-tight leading-tight">
              Your Guide to the <br />
              <span className="text-[#2aa9c7]">Best Boat Tours</span> in Key West
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                At KW Boat Tours, we make it simple to discover the best experiences on the water in Key West. Whether you're chasing a stunning sunset, snorkeling colorful reefs, exploring hidden sandbars, or booking a private charter, our goal is to connect you with unforgettable excursions led by trusted local captains and guides.
              </p>
              <p>
                We're not just a listing site — every tour we feature is carefully curated for quality, safety, and the overall experience. We take the guesswork out of planning, so you can spend more time enjoying the turquoise waters and less time searching.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleOpenBooking("Key West Curated Experience")}
                className="bg-[#2aa9c7] hover:bg-[#2390a8] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded shadow-sm hover:shadow transition-colors"
              >
                MORE ABOUT US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: WHY BOOK WITH US --- */}
      <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Value Props */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[#2aa9c7] font-bold text-xs uppercase tracking-widest font-mono">
                Why Book With Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b253a] tracking-tight mt-1">
                Why Our Key West Boat Tours Are the <span className="text-[#2aa9c7]">Best Choice</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Compass,
                  title: "Best Trips",
                  desc: "Curated selection of the top-rated excursions in Key West."
                },
                {
                  icon: CreditCard,
                  title: "Easy Booking",
                  desc: "Easy online booking with instant confirmation."
                },
                {
                  icon: Users,
                  title: "Professional Crew",
                  desc: "Trusted local captains and operators."
                },
                {
                  icon: Waves,
                  title: "Stress-Free",
                  desc: "Your time in Key West should be stress-free. We'll help you make the most of every moment on the water."
                },
                {
                  icon: ShieldCheck,
                  title: "Flexible Plan",
                  desc: "Free cancellation on most trips."
                }
              ].map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#2aa9c7]/10 text-[#2aa9c7] flex items-center justify-center shrink-0 mt-0.5">
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0b253a]">{item.title}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Images Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-xl overflow-hidden shadow-md h-72 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
                alt="Family snorkeling excursion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-md h-48 bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                  alt="Key West sunset sailing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md h-48 bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80"
                  alt="Turquoise ocean waters"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FAQ ACCORDION --- */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#2aa9c7] font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b253a] tracking-tight">
              Service <span className="text-[#2aa9c7]">Questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-[#2aa9c7] transition-colors"
                    >
                      <span className="text-sm sm:text-base">{faq.q}</span>
                      <div
                        className={`w-7 h-7 rounded flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-[#2aa9c7] text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Dining Boat Interior Photo */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <div className="h-96 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1510525009512-ad7fc3c7baab?auto=format&fit=crop&w=1000&q=80"
                  alt="Boat Interior and Dining Table"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-teal-300">VIP Amenities</div>
                  <div className="text-base font-bold">Premium Vessel Interior & Dining</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: GALLERY --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#2aa9c7] font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
              Our Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b253a] tracking-tight">
              Unforgettable <span className="text-[#2aa9c7]">Moments</span> Captured in Frames
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl h-60 sm:h-72 bg-slate-100"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f30]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs sm:text-sm font-semibold">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#081c2b] text-white pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
            {/* Col 1: Logo & Contact */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#e85038] text-white flex items-center justify-center p-2">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-lg font-bold tracking-tight text-white">KW BOAT TOURS</div>
                  <div className="text-[10px] text-teal-400 uppercase tracking-widest">Key West · Florida</div>
                </div>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-sm">
                Your premier source for sunset cruises, dolphin encounters, snorkeling reef trips, and private boat charters in Key West, Florida.
              </p>
              <div className="space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#2aa9c7]" />
                  <span>Kew West Boat Tours Duval St Key West 33040</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#2aa9c7]" />
                  <span>+1 (786) 705-7641</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#2aa9c7]" />
                  <span>kwsailingtours@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#home" className="hover:text-teal-400 transition-colors">Home</a></li>
                <li><a href="#tours" className="hover:text-teal-400 transition-colors">Tours</a></li>
                <li><a href="#categories" className="hover:text-teal-400 transition-colors">Adventures</a></li>
                <li><a href="#faq" className="hover:text-teal-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Information */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Information</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#about" className="hover:text-teal-400 transition-colors">About Us</a></li>
                <li><a href="#why-us" className="hover:text-teal-400 transition-colors">Why Choose Us</a></li>
                <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact Us</a></li>
                <li><a href="#home" className="hover:text-teal-400 transition-colors">Privacy Policy & Disclosure</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© Key West Boat Tours. All Right Reserved 2025.</p>
            <p className="font-mono text-[11px] text-slate-400">
              WordPress & Elementor Architecture by <strong className="text-teal-400">Mehma Qudsia</strong>
            </p>
          </div>
        </div>
      </footer>

      {/* --- INTERACTIVE BOOKING MODAL DEMO --- */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-5 bg-[#0b253a] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-teal-300">Live Booking Engine Demo</span>
                <h3 className="text-lg font-bold">{selectedTour}</h3>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {bookingSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0b253a]">Booking Reserved!</h4>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    In the production WordPress build, this triggers WooCommerce / FareHarbor webhook pipelines and instant SMS confirmation!
                  </p>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="mt-4 px-6 py-2.5 bg-[#2aa9c7] text-white font-bold text-xs uppercase rounded"
                  >
                    Close Demo
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSuccess(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Select Date</label>
                      <input
                        type="date"
                        defaultValue="2026-09-10"
                        className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#2aa9c7] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Guests</label>
                      <select className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#2aa9c7] outline-none">
                        <option>2 Adults ($298)</option>
                        <option>4 Adults (Group - $540)</option>
                        <option>6 Adults (Private - $790)</option>
                        <option>1 Adult ($149)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Captain Morgan"
                      defaultValue="Travel Enthusiast"
                      className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#2aa9c7] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email & Phone (For SMS Confirmation)</label>
                    <input
                      type="email"
                      placeholder="guest@keywest.com"
                      defaultValue="guest@keywesttours.com"
                      className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#2aa9c7] outline-none mb-2"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      defaultValue="+1 (786) 555-0199"
                      className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#2aa9c7] outline-none"
                      required
                    />
                  </div>

                  <div className="p-3 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                    <span>Payment Gateway</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Stripe / WooCommerce Bookings
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#2aa9c7] hover:bg-[#2390a8] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    Confirm & Reserve Instant Tour <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      {/* --- SCREENSHOT PROOF OVERLAY MODAL --- */}
      {showScreenshotProof && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm">Key West Boat Tours — Original High-Resolution Screenshot Proof</span>
              </div>
              <button
                onClick={() => setShowScreenshotProof(false)}
                className="p-1 rounded bg-slate-800 hover:bg-rose-900/50 hover:text-rose-300 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-slate-950 p-4 flex justify-center">
              <img
                src="/images/kw-boats-screenshot.png"
                alt="KW Boat Tours Original Screenshot"
                className="max-w-full h-auto object-contain rounded-lg border border-slate-800 shadow-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

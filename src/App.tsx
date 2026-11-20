import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Star,
  ChevronDown,
  X,
  Menu,
  Check,
  Send,
  Phone,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { AutomationChat } from './components/AutomationChat';

const CONTACT_PHONE = "+91 96262 32771";
const CONTACT_PHONE_RAW = "9626232771";
const WHATSAPP_URL = `https://wa.me/91${CONTACT_PHONE_RAW}`;

// Data Structures
interface PortfolioItem {
  id: number;
  title: string;
  category: 'Editorial' | 'Bridal' | 'Commercial' | 'Film';
  aspect: 'tall' | 'wide';
  image: string;
  client: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
}

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// 6 Curated High-Fashion Portfolio Items
// Exact brief:
// 1. Bridal makeup close-up, soft romantic skin, glowing natural light, warm tones (tall 3/4)
// 2. Editorial avant-garde makeup, model in profile, dark dramatic studio (wide 4/3)
// 3. Commercial beauty — lipstick close-up, vibrant red, fashion magazine style (tall 3/4)
// 4. Film set makeup — actress being touched up between takes, candid BTS (wide 4/3)
// 5. Bold editorial eye look, close-up, dark background, high contrast (tall 3/4)
// 6. Natural bridal party group, outdoor golden hour, soft elegant looks (wide 4/3)
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Ethereal Solstice",
    category: "Bridal",
    aspect: "tall",
    image: "/images/ethereal-solstice.jpg",
    client: "Somerset House Commission"
  },
  {
    id: 2,
    title: "Nocturne Profile",
    category: "Editorial",
    aspect: "wide",
    image: "/images/nocturne-profile.jpg",
    client: "Dazed & Confused Magazine"
  },
  {
    id: 3,
    title: "Velvet Crimson",
    category: "Commercial",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85",
    client: "Maison Dior Campaign"
  },
  {
    id: 4,
    title: "Continuity Take 4",
    category: "Film",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85",
    client: "BBC Period Drama Set"
  },
  {
    id: 5,
    title: "Obsidian Architecture",
    category: "Editorial",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=85",
    client: "Harper's Bazaar UK Editorial"
  },
  {
    id: 6,
    title: "Golden Hour Bloom",
    category: "Bridal",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    client: "Cotswolds Destination Wedding"
  }
];

const servicesData: ServiceItem[] = [
  {
    id: "editorial",
    title: "Editorial & Fashion",
    description: "shoots, campaigns, lookbooks — concept-driven makeup crafted to withstand high-output studio flash and creative direction.",
    price: "from £350 / day"
  },
  {
    id: "bridal",
    title: "Bridal",
    description: "trial + wedding day, bridal party available — skin prep, bespoke lash architecture, all-day longevity, and personal touch-up suite.",
    price: "from £280"
  },
  {
    id: "commercial",
    title: "Commercial & Film",
    description: "TV, advertising, product — camera-ready definition for 4K / 8K cinema lenses, rigorous continuity logging, and on-set speed.",
    price: "day rate available"
  },
  {
    id: "occasions",
    title: "Special Occasions",
    description: "events, galas, press nights — private red carpet appointments tailored to your gown architecture and ambient venue lighting.",
    price: "from £150"
  }
];

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    quote: "Ariel did my makeup for our wedding and then for a Vogue editorial the following month. The work on both was extraordinary.",
    author: "Sophie M.",
    role: "Bride & Creative Director, London"
  },
  {
    id: 2,
    quote: "A master of skin textures. Ariel manages to achieve full photographic impact while keeping the model's skin looking entirely real, alive, and luminous.",
    author: "Julian Thorne",
    role: "Fashion Photographer, Dazed & British Vogue"
  },
  {
    id: 3,
    quote: "Unflappable under tight filming schedules. Ariel understood the lighting ratios immediately and delivered sublime continuity take after take.",
    author: "Elena Rostova",
    role: "Lead Producer, BBC Film & Television"
  }
];

const faqData: FaqItem[] = [
  {
    question: "Do you travel for bookings?",
    answer: "Yes, absolutely. I am based in Central London and regularly travel across the UK, Europe, and worldwide for destination weddings, fashion weeks, and on-location shoots. Travel and accommodation expenses are billed transparently at cost."
  },
  {
    question: "How far in advance should I book for my wedding?",
    answer: "Bridal dates typically book 6 to 12 months in advance, especially during the peak May–September season. However, I always do my best to accommodate intimate ceremonies or last-minute dates whenever my shooting diary allows."
  },
  {
    question: "What's included in a bridal trial?",
    answer: "A bridal trial is a dedicated 2.5-hour private studio session. We analyze your skin biome, lighting conditions, neckline, veil or hair florals, and test 2 distinct variations. I map every pigment and skincare step so your wedding morning runs with peaceful precision."
  },
  {
    question: "Do you work internationally?",
    answer: "Yes. I hold valid international production travel credentials and work regularly in Paris, Milan, Lake Como, New York, and Ibiza. International day rates or flat project packages are available upon enquiry."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [automationChatOpen, setAutomationChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Editorial & Fashion');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setEnquiryModalOpen(false);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FAF7F2] font-inter selection:bg-[#c9a55a] selection:text-[#0a0a0a]">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#292929] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Left: Bodoni Moda italic wordmark "Ariel Beaumont" in warm gold */}
          <a
            href="#"
            className="font-bodoni italic text-2xl md:text-3xl font-bold tracking-tight text-[#c9a55a] hover:opacity-90 transition-opacity"
          >
            Ariel Beaumont
          </a>

          {/* Right: Work · Services · About · Contact + "Enquire →" gold outlined button */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#work" className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors">
              Work
            </a>
            <a href="#services" className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors">
              Services
            </a>
            <a href="#about" className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors">
              About
            </a>
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#FAF7F2]/75 hover:text-[#FAF7F2] transition-colors"
            >
              Contact
            </button>
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#c9a55a] hover:text-[#e2c176] transition-colors flex items-center gap-1.5"
              title="Call Artist Directly: 9626232771"
            >
              <Phone size={11} />
              <span>{CONTACT_PHONE_RAW}</span>
            </a>
          </nav>

          {/* Desktop CTA: Gold Outlined Button + Auto Chat */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setAutomationChatOpen(true)}
              className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#FAF7F2]/80 border border-[#333] px-3.5 py-2.5 rounded-none hover:border-[#c9a55a] hover:text-[#c9a55a] transition-all duration-300 flex items-center gap-1.5"
              title="Open Automated Client Enquiry Chat"
            >
              <Sparkles size={12} className="text-[#c9a55a]" />
              <span>Auto Chat</span>
            </button>
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#c9a55a] border border-[#c9a55a] px-6 py-2.5 rounded-none hover:bg-[#c9a55a] hover:text-[#0a0a0a] transition-all duration-300"
            >
              Enquire →
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FAF7F2] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-[#0e0e0e] border-b border-[#292929] px-6 py-8 space-y-6"
            >
              <div className="flex flex-col space-y-5">
                <a
                  href="#work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bodoni italic text-2xl text-[#FAF7F2] hover:text-[#c9a55a]"
                >
                  Work
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bodoni italic text-2xl text-[#FAF7F2] hover:text-[#c9a55a]"
                >
                  Services
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bodoni italic text-2xl text-[#FAF7F2] hover:text-[#c9a55a]"
                >
                  About
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setEnquiryModalOpen(true);
                  }}
                  className="text-left font-bodoni italic text-2xl text-[#FAF7F2] hover:text-[#c9a55a]"
                >
                  Contact
                </button>
                <a
                  href={`tel:${CONTACT_PHONE_RAW}`}
                  className="font-bodoni italic text-2xl text-[#c9a55a] flex items-center gap-2"
                >
                  <Phone size={20} />
                  <span>Call: {CONTACT_PHONE_RAW}</span>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAutomationChatOpen(true);
                  }}
                  className="w-full text-center text-[10px] uppercase tracking-[0.16em] font-medium text-[#FAF7F2] border border-[#c9a55a]/60 py-3.5 flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={12} className="text-[#c9a55a]" />
                  <span>Auto Chat</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setEnquiryModalOpen(true);
                  }}
                  className="w-full text-center text-[10px] uppercase tracking-[0.16em] font-medium text-[#0a0a0a] bg-[#c9a55a] py-3.5"
                >
                  Enquire →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[640px] max-h-[1080px] bg-[#0a0a0a] overflow-hidden flex items-center">
        {/* Right side: editorial beauty portrait with elegant framed scale */}
        <div className="absolute right-0 top-0 h-full w-full md:w-[55%] z-0 flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-hidden">
          {/* Subtle deep indigo ambient glow behind portrait */}
          <div className="absolute w-[360px] h-[480px] bg-[#162740]/45 rounded-full filter blur-3xl pointer-events-none" />

          {/* Framed portrait container: perfectly proportioned, crisp, showing complete hair, lips, and feathers */}
          <div className="relative w-full max-w-[440px] max-h-[82vh] aspect-[2/3] border border-[#2a2a2a] shadow-2xl overflow-hidden bg-[#0c1017] group">
            <img
              src="/images/hero-editorial.png"
              alt="Editorial beauty portrait with bold red lip, sculpted makeup, and dark blue hair"
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            {/* Subtle bottom vignette inside frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Left-side overlay for text */}
        <div
          className="absolute left-0 top-0 h-full w-full md:w-[52%] z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.95) 75%, transparent 100%)'
          }}
        />
        {/* Mobile vertical gradient scrim */}
        <div className="md:hidden absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent pointer-events-none" />

        {/* Content Container: z-index: 10, left padding: 0 5vw, centered vertically */}
        <div className="relative z-10 w-full px-[5vw] flex items-center pointer-events-auto">
          <div className="max-w-[620px] py-12 md:py-0">
            {/* Inter 500 uppercase 10px gold label: "Makeup Artist · London & International" */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#c9a55a] mb-5 flex items-center gap-2"
            >
              <span className="text-[#c9a55a]">✦</span>
              <span>Makeup Artist · London & International</span>
            </motion.div>

            {/* Bodoni Moda 700 italic clamp(58px, 8vw, 115px) pearl, line-height 0.88: "Art\non Skin." */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="font-bodoni italic font-bold leading-[0.88] text-[#FAF7F2] mb-6 tracking-tight text-[58px] sm:text-[76px] lg:text-[115px]"
            >
              Art<br />on Skin.
            </motion.h1>

            {/* Inter 300 muted: "Editorial, bridal, commercial, and film — makeup designed to be seen, photographed, and remembered" */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="font-inter font-light text-base md:text-lg text-[#FAF7F2]/70 leading-relaxed mb-8 max-w-[480px]"
            >
              Editorial, bridal, commercial, and film — makeup designed to be seen, photographed, and remembered
            </motion.p>

            {/* CTAs: "View my work →" (gold filled, dark text) + "Book a session" (ghost) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#c9a55a] text-[#0a0a0a] font-medium text-[10px] uppercase tracking-[0.16em] hover:bg-[#d9b870] transition-colors"
                >
                  View my work →
                </a>
                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#333] text-[#FAF7F2] font-medium text-[10px] uppercase tracking-[0.16em] hover:border-[#c9a55a] hover:text-[#c9a55a] transition-all"
                >
                  Book a session
                </button>
              </div>

              {/* Direct Contact & Automation Chat Sub-bar */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-inter text-[#FAF7F2]/65 pt-1">
                <a
                  href={`tel:${CONTACT_PHONE_RAW}`}
                  className="hover:text-[#c9a55a] transition-colors flex items-center gap-1.5"
                >
                  <Phone size={12} className="text-[#c9a55a]" />
                  <span>Call / WhatsApp: <strong className="text-[#FAF7F2] font-medium">{CONTACT_PHONE}</strong></span>
                </a>
                <span className="text-white/20 hidden sm:inline">|</span>
                <button
                  onClick={() => setAutomationChatOpen(true)}
                  className="text-[#c9a55a] hover:underline flex items-center gap-1"
                >
                  <Sparkles size={12} />
                  <span>Automated Enquiry Concierge</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* 3. SELECTED WORK */}
      <section id="work" className="py-28 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] font-medium block mb-2">
            Selected Portfolio
          </span>
          <h2 className="font-bodoni italic font-bold text-4xl md:text-5xl lg:text-6xl text-[#FAF7F2]">
            Selected Work
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a55a]/50 mx-auto mt-4" />
        </div>

        {/* Masonry grid, 6 images: 3 tall (3/4) + 3 wide (4/3), no border-radius, 3px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] bg-[#0a0a0a]">
          {/* Column 1: Tall (3/4) + Wide (4/3) */}
          <div className="flex flex-col gap-[3px]">
            {[portfolioData[0], portfolioData[1]].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.9, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative overflow-hidden group cursor-pointer rounded-none ${
                  item.aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105 ${
                    item.id === 2 ? 'object-[center_25%]' : 'object-center'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-white bg-black/70 px-3 py-1 w-max border border-white/20">
                    {item.category}
                  </span>
                  <div>
                    <h3 className="font-bodoni italic text-2xl text-white font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light font-inter">
                      {item.client}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2: Wide (4/3) + Tall (3/4) */}
          <div className="flex flex-col gap-[3px]">
            {[portfolioData[3], portfolioData[2]].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.9, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: (idx + 2) * 0.08 }}
                className={`relative overflow-hidden group cursor-pointer rounded-none ${
                  item.aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105 ${
                    item.id === 2 ? 'object-[center_25%]' : 'object-center'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-white bg-black/70 px-3 py-1 w-max border border-white/20">
                    {item.category}
                  </span>
                  <div>
                    <h3 className="font-bodoni italic text-2xl text-white font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light font-inter">
                      {item.client}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 3: Tall (3/4) + Wide (4/3) */}
          <div className="flex flex-col gap-[3px]">
            {[portfolioData[4], portfolioData[5]].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.9, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: (idx + 4) * 0.08 }}
                className={`relative overflow-hidden group cursor-pointer rounded-none ${
                  item.aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105 ${
                    item.id === 2 ? 'object-[center_25%]' : 'object-center'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0a0a0a] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-white bg-black/70 px-3 py-1 w-max border border-white/20">
                    {item.category}
                  </span>
                  <div>
                    <h3 className="font-bodoni italic text-2xl text-white font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light font-inter">
                      {item.client}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES ("What I Offer") */}
      <section id="services" className="py-24 bg-[#0e0e0e] border-y border-[#292929]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] font-medium block mb-2">
              Capabilities & Rates
            </span>
            <h2 className="font-bodoni italic font-bold text-4xl md:text-5xl text-[#FAF7F2]">
              What I Offer
            </h2>
            <div className="w-12 h-[1px] bg-[#c9a55a]/50 mt-4" />
          </div>

          {/* 4 service rows, hover-raise, border-bottom: 1px solid hsl(var(--border)) */}
          <div className="divide-y divide-[#292929]">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0.85, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => {
                  setSelectedService(service.title);
                  setEnquiryModalOpen(true);
                }}
                className="group py-10 px-4 md:px-6 transition-all duration-200 hover:bg-[#1f1f1f] hover:-translate-y-0.5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Bodoni italic large name left */}
                <div className="md:w-1/3">
                  <h3 className="font-bodoni italic font-bold text-2xl md:text-3xl text-[#FAF7F2] group-hover:text-[#c9a55a] transition-colors duration-200">
                    {service.title}
                  </h3>
                </div>

                {/* Inter 300 description right */}
                <div className="md:w-1/2">
                  <p className="font-inter font-light text-sm text-[#FAF7F2]/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Gold "→" + price */}
                <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/5">
                  <span className="font-inter font-light text-xs uppercase tracking-wider text-[#FAF7F2]/90">
                    {service.price}
                  </span>
                  <span className="text-[#c9a55a] group-hover:translate-x-1.5 transition-transform duration-200 text-lg">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT ("The Artist") */}
      <section id="about" className="py-28 px-6 md:px-12 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] font-medium block mb-2">
                Biography & Ethos
              </span>
              <h2 className="font-bodoni italic font-bold text-4xl md:text-5xl text-[#FAF7F2]">
                The Artist
              </h2>
              <div className="w-12 h-[1px] bg-[#c9a55a]/50 mt-4" />
            </div>

            {/* Bodoni Italic Pull Quote */}
            <blockquote className="font-bodoni italic text-2xl md:text-3xl text-[#FAF7F2] leading-snug border-l-2 border-[#c9a55a] pl-6 my-6">
              “Makeup is the one art form that disappears at the end of the day — which means every application is its own original.”
            </blockquote>

            {/* Inter 300 muted bio: 2 paragraphs */}
            <div className="space-y-5 text-sm md:text-base text-[#FAF7F2]/70 font-inter font-light leading-relaxed">
              <p>
                Trained at London College of Fashion. 12 years working across editorial, film, and bridal. Clients include Vogue, BBC, and independent brides who want something genuinely considered.
              </p>
              <p>
                My work spans high-contrast fashion editorials for British Vogue and Dazed, cinematic continuity for BBC drama, and bespoke bridal commissions across England and Europe. Whether on a dawn film location in Scotland or a private bridal suite in Mayfair, my objective remains constant: sublime skin architecture and deliberate, artistic poise.
              </p>
            </div>

            {/* Gold Chips: "LCF Trained · 12 Years · Film & Bridal Specialist" */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#c9a55a] bg-[#1a1711] border border-[#c9a55a]/40 px-3.5 py-1.5">
                LCF Trained
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#c9a55a] bg-[#1a1711] border border-[#c9a55a]/40 px-3.5 py-1.5">
                12 Years
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#c9a55a] bg-[#1a1711] border border-[#c9a55a]/40 px-3.5 py-1.5">
                Film & Bridal Specialist
              </span>
            </div>
          </div>

          {/* Right Portrait Image */}
          {/* Bridal Artistry in Action */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0.9, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] border border-[#292929] overflow-hidden group shadow-2xl"
            >
              <img
                src="/images/the-artist.jpg"
                alt="Ariel Beaumont bridal artistry session in action"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-sm px-3.5 py-1.5 border border-[#333]">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] font-medium">Bridal Artistry in Action</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      {/* Surface section: bg-[--surface] #141414 */}
      <section id="testimonials" className="py-24 bg-[#141414] border-t border-[#292929]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] font-medium block mb-2">
              Client Experiences
            </span>
            <h2 className="font-bodoni italic font-bold text-4xl md:text-5xl text-[#FAF7F2]">
              Reflections
            </h2>
            <div className="w-12 h-[1px] bg-[#c9a55a]/50 mx-auto mt-4" />
          </div>

          {/* 3 cards: 5-star gold row, Bodoni italic pearl quote, client name + project type Inter 10px muted */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0.85, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0a0a0a] border border-[#292929] p-8 flex flex-col justify-between"
              >
                <div>
                  {/* 5-star gold row */}
                  <div className="flex gap-1 text-[#c9a55a] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                  </div>

                  {/* Bodoni Italic Pearl Quote */}
                  <p className="font-bodoni italic text-xl md:text-2xl text-[#FAF7F2] leading-snug mb-8">
                    “{item.quote}”
                  </p>
                </div>

                {/* Client name + project type Inter 10px muted */}
                <div className="pt-6 border-t border-[#1f1f1f]">
                  <div className="font-medium text-sm text-[#FAF7F2]">{item.author}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/50 mt-1">
                    {item.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ (with gold left border on open item) */}
      <section id="faq" className="py-24 max-w-[900px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] font-medium block mb-2">
            Details & Logistics
          </span>
          <h2 className="font-bodoni italic font-bold text-4xl md:text-5xl text-[#FAF7F2]">
            Frequently Asked
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a55a]/50 mx-auto mt-4" />
        </div>

        {/* 4 items with gold left border on active item */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className={`bg-[#0e0e0e] border transition-all duration-300 ${
                  isOpen ? 'border-[#333] border-l-4 border-l-[#c9a55a]' : 'border-[#292929] border-l-4 border-l-transparent'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-6 px-6 md:px-8 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-bodoni italic text-xl md:text-2xl text-[#FAF7F2]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#c9a55a] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-6 md:px-8 pb-6"
                    >
                      <p className="text-sm md:text-base font-inter font-light text-[#FAF7F2]/75 leading-relaxed pt-3 border-t border-[#1f1f1f]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. ENQUIRY CTA (Full-width warm gold #c9a55a background) */}
      <section id="contact" className="w-full bg-[#c9a55a] text-[#0a0a0a] py-24 px-6 md:px-12 text-center">
        <div className="max-w-[860px] mx-auto space-y-6">
          {/* Bodoni 700 italic dark: "Let's Make Something Beautiful" */}
          <h2 className="font-bodoni italic font-bold text-4xl sm:text-5xl md:text-6xl text-[#0a0a0a] tracking-tight">
            Let's Make Something Beautiful
          </h2>
          {/* Inter 300 dark: "Every project starts with a conversation — tell me what you're creating and I'll tell you how I can help" */}
          <p className="font-inter font-light text-base md:text-lg text-[#0a0a0a]/85 max-w-[640px] mx-auto leading-relaxed">
            Every project starts with a conversation — tell me what you're creating and I'll tell you how I can help.
          </p>

          {/* Prominent Direct Phone & WhatsApp Hotline */}
          <div className="py-2">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 bg-[#0a0a0a]/10 border border-[#0a0a0a]/20 px-6 sm:px-8 py-3.5 shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#0a0a0a]/75">
                Direct Atelier Contact & WhatsApp:
              </span>
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="font-bodoni italic text-2xl sm:text-3xl font-bold text-[#0a0a0a] hover:opacity-80 transition-opacity tracking-wider flex items-center gap-2"
              >
                <Phone size={20} />
                <span>{CONTACT_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Enquiry Action Options: Form, Automated Chat, WhatsApp, Direct Call */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#0a0a0a] text-[#FAF7F2] font-medium text-[10px] uppercase tracking-[0.16em] hover:bg-[#1a1a1a] transition-all shadow-xl"
            >
              <span>Send an enquiry</span>
              <ArrowRight size={15} className="text-[#c9a55a]" />
            </button>

            <button
              onClick={() => setAutomationChatOpen(true)}
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#FAF7F2] text-[#0a0a0a] font-medium text-[10px] uppercase tracking-[0.16em] hover:bg-white transition-all shadow-xl border border-black/10"
            >
              <Sparkles size={15} className="text-[#c9a55a]" />
              <span>Automated Chat Concierge</span>
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-[10px] uppercase tracking-[0.16em] transition-all shadow-xl"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* "Based in London · Available nationwide and internationally" Inter 10px dark 70% */}
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#0a0a0a]/70 pt-3 font-inter font-medium">
            Contact Number: {CONTACT_PHONE} · Based in London & Available Nationwide / Internationally
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      {/* Near-black, Bodoni italic "Ariel Beaumont" in gold */}
      <footer className="bg-[#0a0a0a] border-t border-[#292929] py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Wordmark & Direct Phone */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="font-bodoni italic font-bold text-2xl text-[#c9a55a]">
              Ariel Beaumont
            </div>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="text-xs text-[#FAF7F2]/80 hover:text-[#c9a55a] transition-colors flex items-center gap-1.5 font-inter"
            >
              <Phone size={13} className="text-[#c9a55a]" />
              <span>Direct Line: <strong className="text-white font-medium">{CONTACT_PHONE}</strong></span>
            </a>
          </div>

          {/* Direct Channels · Automation Chat · Instagram · Pinterest · LinkedIn */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/65">
            <button
              onClick={() => setAutomationChatOpen(true)}
              className="hover:text-[#c9a55a] text-[#c9a55a] transition-colors flex items-center gap-1 font-medium"
            >
              <Sparkles size={12} />
              <span>Auto Chat</span>
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 text-emerald-400/90 transition-colors"
            >
              WhatsApp
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#c9a55a] transition-colors">
              Instagram
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#c9a55a] transition-colors">
              Pinterest
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#c9a55a] transition-colors">
              LinkedIn
            </a>
          </div>

          {/* "© 2026 Ariel Beaumont · Makeup Artist · London" */}
          <div className="text-xs text-[#FAF7F2]/45 font-inter font-light">
            © 2026 Ariel Beaumont · London & International
          </div>
        </div>
      </footer>

      {/* INTERACTIVE ENQUIRY MODAL */}
      <AnimatePresence>
        {enquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-[560px] bg-[#101010] border border-[#292929] p-8 md:p-10 shadow-2xl z-10"
            >
              <button
                onClick={() => setEnquiryModalOpen(false)}
                className="absolute top-6 right-6 text-[#FAF7F2]/60 hover:text-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#c9a55a]/10 border border-[#c9a55a] text-[#c9a55a] rounded-full flex items-center justify-center mx-auto">
                    <Check size={28} />
                  </div>
                  <h3 className="font-bodoni italic text-3xl text-[#FAF7F2]">Merci</h3>
                  <p className="text-sm font-light text-[#FAF7F2]/70 max-w-[380px] mx-auto">
                    Your enquiry has been delivered to Ariel Beaumont's private diary. You will receive a response within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] font-medium block mb-1">
                      Private Diary Reservation
                    </span>
                    <h3 className="font-bodoni italic text-3xl text-[#FAF7F2]">
                      Initiate an Enquiry
                    </h3>
                  </div>

                  {/* Immediate Assistance Banner */}
                  <div className="mb-6 p-3 bg-[#161616] border border-[#292929] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-inter">
                    <div className="flex items-center gap-2 text-white/80">
                      <Phone size={13} className="text-[#c9a55a]" />
                      <span>Direct Atelier Line: <a href={`tel:${CONTACT_PHONE_RAW}`} className="text-[#c9a55a] hover:underline font-medium">{CONTACT_PHONE}</a></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEnquiryModalOpen(false);
                        setAutomationChatOpen(true);
                      }}
                      className="text-[10px] uppercase tracking-[0.14em] text-[#c9a55a] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Sparkles size={11} />
                      <span>Launch Auto Chat →</span>
                    </button>
                  </div>

                  <form onSubmit={handleEnquirySubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/70 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Charlotte Gainsbourg"
                        className="w-full bg-[#161616] border border-[#292929] focus:border-[#c9a55a] px-4 py-3 text-sm text-[#FAF7F2] outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/70 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full bg-[#161616] border border-[#292929] focus:border-[#c9a55a] px-4 py-3 text-sm text-[#FAF7F2] outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/70 mb-2">
                          Telephone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+44 7700 900077"
                          className="w-full bg-[#161616] border border-[#292929] focus:border-[#c9a55a] px-4 py-3 text-sm text-[#FAF7F2] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/70 mb-2">
                          Service Discipline
                        </label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-[#161616] border border-[#292929] focus:border-[#c9a55a] px-4 py-3 text-sm text-[#FAF7F2] outline-none transition-colors"
                        >
                          <option value="Editorial & Fashion">Editorial & Fashion</option>
                          <option value="Bridal">Bridal</option>
                          <option value="Commercial & Film">Commercial & Film</option>
                          <option value="Special Occasions">Special Occasions</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/70 mb-2">
                          Proposed Date / Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 14 Oct 2026 · London"
                          className="w-full bg-[#161616] border border-[#292929] focus:border-[#c9a55a] px-4 py-3 text-sm text-[#FAF7F2] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.16em] text-[#FAF7F2]/70 mb-2">
                        Creative Brief / Project Scope
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell me about your lookbook, wedding styling, or production schedule..."
                        className="w-full bg-[#161616] border border-[#292929] focus:border-[#c9a55a] px-4 py-3 text-sm text-[#FAF7F2] outline-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#c9a55a] text-[#0a0a0a] text-[10px] uppercase tracking-[0.16em] font-medium hover:bg-[#d9b870] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Transmit Enquiry</span>
                      <Send size={14} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh] z-10 flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white"
                aria-label="Close preview"
              >
                <X size={28} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain border border-[#292929]"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#c9a55a] block mb-1">
                  {selectedImage.category} · {selectedImage.client}
                </span>
                <h4 className="font-bodoni italic text-2xl text-[#FAF7F2]">
                  {selectedImage.title}
                </h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AUTOMATION CHAT CONCIERGE */}
      <AutomationChat
        externalOpen={automationChatOpen}
        setExternalOpen={setAutomationChatOpen}
      />

    </div>
  );
}

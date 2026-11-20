import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Sparkles,
  RotateCcw,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  actionType?: 'whatsapp' | 'call' | 'form' | 'booking_summary';
  bookingSummary?: {
    service: string;
    dateLocation: string;
    clientContact: string;
  };
}

const CONTACT_PHONE = "+91 96262 32771";
const CONTACT_PHONE_RAW = "9626232771";
const WHATSAPP_URL = `https://wa.me/91${CONTACT_PHONE_RAW}`;

export function AutomationChat({
  externalOpen,
  setExternalOpen
}: {
  externalOpen?: boolean;
  setExternalOpen?: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  // Conversational state tracking
  const [conversationStep, setConversationStep] = useState<
    'initial' | 'awaiting_date_location' | 'awaiting_contact' | 'completed'
  >('initial');
  const [enquiryDetails, setEnquiryDetails] = useState({
    service: '',
    dateLocation: '',
    clientContact: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync external open request
  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
      setHasUnread(false);
    }
  }, [externalOpen]);

  // Initial welcome message
  useEffect(() => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: "Bonjour. Welcome to Ariel Beaumont's private atelier concierge. How may I assist your beauty or bridal enquiry today?",
        timestamp: now,
        options: [
          "💍 Bridal Artistry & Trials",
          "📸 Editorial & High Fashion",
          "🎬 Commercial & Film Rates",
          "✨ Special Occasion Glam",
          "📅 Check Date Availability",
          "📞 Call Artist Directly: 9626232771"
        ]
      }
    ]);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const addBotMessage = (text: string, options?: string[], actionType?: ChatMessage['actionType'], summary?: ChatMessage['bookingSummary']) => {
    setIsTyping(true);
    setTimeout(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text,
          timestamp: now,
          options,
          actionType,
          bookingSummary: summary
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleOptionSelect = (option: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option,
      timestamp: now
    };
    setMessages(prev => [...prev, userMsg]);

    if (option.includes("Call Artist")) {
      window.open(`tel:${CONTACT_PHONE_RAW}`, '_self');
      addBotMessage(
        `Dialing Ariel Beaumont at ${CONTACT_PHONE}. If the line is engaged on a shoot, you can also send a direct WhatsApp enquiry!`,
        ["Send WhatsApp Message", "Explore Bridal Packages", "Start New Enquiry"]
      );
      return;
    }

    if (option.includes("Send WhatsApp Message")) {
      const text = encodeURIComponent(`Hi Ariel, I would like to inquire about booking a makeup session.`);
      window.open(`${WHATSAPP_URL}?text=${text}`, '_blank');
      return;
    }

    if (option.includes("Bridal Artistry")) {
      setEnquiryDetails(prev => ({ ...prev, service: "Bridal Artistry & Bespoke Trial" }));
      setConversationStep('awaiting_date_location');
      addBotMessage(
        "Bridal reservations include bespoke trial preview, skin architecture prep, HD water-resistant airbrush finish, authentic jewellery setting, and personal touch-up suite (from £280 / ₹25,000).\n\nWhat is your wedding/reception date and planned venue or city?",
        ["Within 1-3 Months", "Within 3-6 Months", "Next Season (6+ Months)", "Destination Wedding"]
      );
    } else if (option.includes("Editorial & High Fashion")) {
      setEnquiryDetails(prev => ({ ...prev, service: "Editorial & High Fashion" }));
      setConversationStep('awaiting_date_location');
      addBotMessage(
        "Editorial & Fashion services cover campaigns, lookbooks, and high-fashion runways crafted for multi-angle strobe lighting and 4K+ cinema glass (from £350/day).\n\nWhat date and shoot location do you have scheduled?",
        ["Studio Shoot (London)", "On-Location / International", "Multi-day Campaign"]
      );
    } else if (option.includes("Commercial & Film")) {
      setEnquiryDetails(prev => ({ ...prev, service: "Commercial & Film" }));
      setConversationStep('awaiting_date_location');
      addBotMessage(
        "Commercial and Cinema bookings include rigorous continuity logging, sweat-resistant matte formulations, and swift set turnover.\n\nWhen is call-time and what is your production location?",
        ["Commercial Shoot (1-2 Days)", "Period Drama / Feature Film", "Request Day Rate Card"]
      );
    } else if (option.includes("Special Occasion")) {
      setEnquiryDetails(prev => ({ ...prev, service: "Special Occasion Glam" }));
      setConversationStep('awaiting_date_location');
      addBotMessage(
        "Red carpet, gala evenings, cocktail celebrations, or private portraits. Tailored to your outfit palette and lighting ambiance (from £150 / ₹12,000).\n\nWhat is the occasion date and location?",
        ["This Weekend", "Coming Month", "Destination Event"]
      );
    } else if (option.includes("Check Date Availability")) {
      setConversationStep('awaiting_date_location');
      addBotMessage(
        "Ariel Beaumont accepts limited private commissions per month to preserve absolute precision. What dates are you looking to secure?",
        ["Immediate (Next 14 Days)", "Next Month", "Custom Date"]
      );
    } else if (option === "Start New Enquiry" || option.includes("Restart")) {
      handleReset();
    } else if (conversationStep === 'awaiting_date_location') {
      setEnquiryDetails(prev => ({ ...prev, dateLocation: option }));
      setConversationStep('awaiting_contact');
      addBotMessage(
        `Noted: "${option}".\n\nPlease share your Name and WhatsApp / Mobile number so our atelier can lock in your consultation and send the rate proposal:`,
        ["Share via WhatsApp Directly", "Call: 9626232771"]
      );
    } else {
      processTextInput(option);
    }
  };

  const processTextInput = (text: string) => {
    const lower = text.toLowerCase();

    if (conversationStep === 'awaiting_date_location') {
      setEnquiryDetails(prev => ({ ...prev, dateLocation: text }));
      setConversationStep('awaiting_contact');
      addBotMessage(
        `Noted: "${text}".\n\nPlease enter your Full Name & WhatsApp / Contact Number so Ariel's team can confirm diary availability:`,
        ["Share via WhatsApp (+91 9626232771)", "Call: 9626232771"]
      );
      return;
    }

    if (conversationStep === 'awaiting_contact') {
      const updatedDetails = {
        ...enquiryDetails,
        clientContact: text
      };
      setEnquiryDetails(updatedDetails);
      setConversationStep('completed');

      const summaryText = `Parfait! Your enquiry is ready for instant transmission.\n\n` +
        `• Service: ${updatedDetails.service || 'Bespoke Artistry'}\n` +
        `• Schedule/Location: ${updatedDetails.dateLocation || 'Consultation'}\n` +
        `• Client Contact: ${text}\n\n` +
        `Click below to transmit directly to Ariel Beaumont's private WhatsApp (${CONTACT_PHONE}) or connect on call:`;

      addBotMessage(summaryText, undefined, 'booking_summary', updatedDetails);
      return;
    }

    // Natural Language FAQ responses
    if (lower.includes("price") || lower.includes("rate") || lower.includes("cost") || lower.includes("charge")) {
      addBotMessage(
        "Here is our standard rate overview:\n• Bridal: from £280 / ₹25,000 (includes trial & bridal kit)\n• Editorial & Lookbook: from £350/day\n• Commercial/Film: Day rate on request\n• Special Occasion: from £150 / ₹12,000\n\nWould you like to initiate a booking?",
        ["💍 Bridal Package", "📸 Editorial Booking", "📞 Call 9626232771"]
      );
    } else if (lower.includes("phone") || lower.includes("contact") || lower.includes("call") || lower.includes("number") || lower.includes("whatsapp")) {
      addBotMessage(
        `You can connect with Ariel Beaumont directly at:\n\n📞 Direct Line: ${CONTACT_PHONE}\n💬 WhatsApp: +91 ${CONTACT_PHONE_RAW}\n\nOur direct line is open for immediate consultations.`,
        ["Call 9626232771 Now", "Chat on WhatsApp", "Book via Form"]
      );
    } else if (lower.includes("travel") || lower.includes("international") || lower.includes("location") || lower.includes("city")) {
      addBotMessage(
        "Yes! Ariel Beaumont travels nationwide and internationally for weddings, destination events, and film productions. Standard travel arrangements are billed transparently.",
        ["Check Destination Availability", "Call: 9626232771"]
      );
    } else if (lower.includes("trial") || lower.includes("bridal trial")) {
      addBotMessage(
        "A 2.5-hour bridal trial is conducted prior to wedding day. We review gown neckline, lighting parameters, skin texture prep, and conduct a photographic flash test to ensure absolute perfection.",
        ["Book Bridal Trial", "Call: 9626232771"]
      );
    } else if (lower.includes("product") || lower.includes("brand") || lower.includes("kit")) {
      addBotMessage(
        "Ariel's kit is strictly curated with dermatologically vetted luxury cosmetics: Charlotte Tilbury, NARS, Dior Beauty, Pat McGrath Labs, Hourglass, and bespoke Japanese Hakuhodo brushes.",
        ["Book Consultation", "Contact: 9626232771"]
      );
    } else {
      addBotMessage(
        "Thank you for your message. Would you like to select a service discipline below, or speak directly with Ariel on " + CONTACT_PHONE + "?",
        ["💍 Bridal Artistry", "📸 Editorial Shoot", "💬 Open WhatsApp", "📞 Call: 9626232771"]
      );
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue('');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: now
      }
    ]);

    processTextInput(text);
  };

  const handleReset = () => {
    setConversationStep('initial');
    setEnquiryDetails({ service: '', dateLocation: '', clientContact: '' });
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Atelier diary reset. How can I help structure your enquiry?",
        timestamp: now,
        options: [
          "💍 Bridal Artistry & Trials",
          "📸 Editorial & High Fashion",
          "🎬 Commercial & Film Rates",
          "✨ Special Occasion Glam",
          "📞 Direct Line: 9626232771"
        ]
      }
    ]);
  };

  const openWhatsAppWithDetails = (summary?: ChatMessage['bookingSummary']) => {
    const s = summary || enquiryDetails;
    const msg = `*Ariel Beaumont Atelier Client Enquiry*\n\n` +
      `• *Service:* ${s.service || 'Makeup Artistry'}\n` +
      `• *Date & Venue:* ${s.dateLocation || 'Consultation'}\n` +
      `• *Client Contact:* ${s.clientContact || 'Direct Inquiry'}\n\n` +
      `Hello Ariel, I would like to confirm availability and discuss booking details.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* FLOATING CHAT TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-2 bg-[#121212]/95 border border-[#c9a55a]/40 text-[#FAF7F2] px-3.5 py-1.5 shadow-2xl backdrop-blur-md flex items-center gap-2 cursor-pointer hover:border-[#c9a55a] transition-all"
              onClick={() => {
                setIsOpen(true);
                setHasUnread(false);
                if (setExternalOpen) setExternalOpen(false);
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#c9a55a]">
                Enquiry Chat · Online
              </span>
              <span className="text-[10px] text-white/60 font-inter">| 9626232771</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const nextState = !isOpen;
            setIsOpen(nextState);
            if (nextState) setHasUnread(false);
            if (setExternalOpen) setExternalOpen(nextState);
          }}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isOpen
              ? 'bg-[#181818] border border-[#c9a55a] text-[#FAF7F2]'
              : 'bg-[#c9a55a] text-[#0a0a0a] shadow-[#c9a55a]/30'
          }`}
          aria-label="Toggle Automated Client Enquiry Chat"
        >
          {isOpen ? (
            <X size={22} className="text-[#c9a55a]" />
          ) : (
            <>
              <MessageSquare size={24} className="fill-current" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-black" />
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* AUTOMATION CHAT DRAWER / WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[80vh] bg-[#0e0e0e] border border-[#2b2b2b] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* CHAT HEADER */}
            <div className="bg-[#141414] border-b border-[#262626] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#c9a55a]/60 flex items-center justify-center text-[#c9a55a] font-bodoni italic font-bold text-lg">
                    AB
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#141414]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bodoni italic text-base text-[#FAF7F2] font-bold">
                      Ariel Beaumont
                    </h4>
                    <span className="text-[9px] uppercase tracking-wider font-medium px-1.5 py-0.5 bg-[#c9a55a]/15 text-[#c9a55a] border border-[#c9a55a]/30">
                      Automated
                    </span>
                  </div>
                  <p className="text-[10px] text-white/60 font-inter font-light">
                    Direct Diary & Enquiry Assistant
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${CONTACT_PHONE_RAW}`}
                  title={`Call directly: ${CONTACT_PHONE}`}
                  className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-white/10 hover:border-[#c9a55a] hover:text-[#c9a55a] text-white/80 flex items-center justify-center transition-colors"
                >
                  <Phone size={14} />
                </a>
                <button
                  onClick={handleReset}
                  title="Reset Conversation"
                  className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-white/10 hover:border-[#c9a55a] hover:text-[#c9a55a] text-white/80 flex items-center justify-center transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (setExternalOpen) setExternalOpen(false);
                  }}
                  className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-white/10 hover:text-white text-white/70 flex items-center justify-center transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* CALLOUT BANNER FOR INSTANT PHONE CONTACT */}
            <div className="bg-[#181818] px-4 py-2 border-b border-[#242424] flex items-center justify-between text-[11px] font-inter">
              <span className="text-white/70">Client Helpline:</span>
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="font-medium text-[#c9a55a] hover:underline flex items-center gap-1 tracking-wider"
              >
                <Phone size={11} /> {CONTACT_PHONE}
              </a>
            </div>

            {/* MESSAGES CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-inter text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 leading-relaxed rounded-none shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#c9a55a] text-[#0a0a0a] font-normal border border-[#d9b870]'
                        : 'bg-[#181818] text-[#FAF7F2] border border-[#2b2b2b]'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Booking Summary Card */}
                    {msg.actionType === 'booking_summary' && msg.bookingSummary && (
                      <div className="mt-3 pt-3 border-t border-[#333] space-y-2">
                        <button
                          onClick={() => openWhatsAppWithDetails(msg.bookingSummary)}
                          className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
                        >
                          <Send size={12} />
                          <span>Send to WhatsApp (+91 {CONTACT_PHONE_RAW})</span>
                        </button>
                        <a
                          href={`tel:${CONTACT_PHONE_RAW}`}
                          className="w-full py-2 px-3 bg-[#242424] hover:bg-[#303030] text-[#c9a55a] border border-[#c9a55a]/40 font-medium text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                        >
                          <Phone size={12} />
                          <span>Call Direct: {CONTACT_PHONE}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-white/40 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Interactive Option Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionSelect(opt)}
                          className="px-2.5 py-1.5 bg-[#1b1b1b] hover:bg-[#c9a55a] hover:text-[#0a0a0a] border border-[#333] hover:border-[#c9a55a] text-white/90 text-[11px] transition-all duration-200 text-left font-light flex items-center gap-1.5"
                        >
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Bot is typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-white/50 text-[11px] bg-[#181818] border border-[#2b2b2b] px-3 py-2 w-max">
                  <Sparkles size={12} className="text-[#c9a55a] animate-spin" />
                  <span>Ariel Concierge is composing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK ACTIONS BAR */}
            <div className="px-3 py-2 bg-[#121212] border-t border-[#222] flex items-center justify-between text-[10px] text-white/60">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:underline"
              >
                <span>WhatsApp: {CONTACT_PHONE_RAW}</span>
                <ExternalLink size={10} />
              </a>
              <span className="text-white/30">·</span>
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="flex items-center gap-1 text-[#c9a55a] hover:underline"
              >
                <Phone size={10} />
                <span>Call: {CONTACT_PHONE}</span>
              </a>
            </div>

            {/* CHAT INPUT FORM */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#161616] border-t border-[#262626] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  conversationStep === 'awaiting_date_location'
                    ? "Enter your date and location..."
                    : conversationStep === 'awaiting_contact'
                    ? "Enter your Name & Phone Number..."
                    : "Type your enquiry or question..."
                }
                className="flex-1 bg-[#0c0c0c] border border-[#333] focus:border-[#c9a55a] text-[#FAF7F2] text-xs px-3.5 py-2.5 outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-[#c9a55a] hover:bg-[#d9b870] disabled:opacity-40 text-[#0a0a0a] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

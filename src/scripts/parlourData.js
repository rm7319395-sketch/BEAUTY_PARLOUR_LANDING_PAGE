/**
 * LUMIÈRE BEAUTY STUDIO & WELLNESS SANCTUARY
 * Master Data Store for Services, Packages, Specialists, and Lookbook
 */

export const parlourData = {
  brand: {
    name: "Lumière Beauty Studio",
    tagline: "Haute Aesthetics & Wellness Sanctuary",
    phone: "+1 (555) 382-7432",
    whatsapp: "+15553827432",
    email: "concierge@lumierebeautystudio.com",
    address: "428 Belmont Boulevard, Suite 100, West Hollywood, CA 90048",
    rating: "4.9",
    reviewCount: "540+",
    hours: [
      { days: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
      { days: "Saturday", time: "9:00 AM – 7:00 PM" },
      { days: "Sunday", time: "10:00 AM – 5:00 PM" }
    ]
  },

  trustBadges: [
    { icon: "★", text: "4.9 Google Rating (540+ Happy Clients)" },
    { icon: "✦", text: "CIDESCO & Aveda Certified Specialists" },
    { icon: "🌿", text: "100% Organic & Cruelty-Free Botanical Products" },
    { icon: "☕", text: "Complimentary Herbal Tea & Artisanal Champagne Bar" }
  ],

  services: {
    hair: [
      {
        id: "french-balayage",
        name: "Artisanal French Balayage & Gloss",
        description: "Hand-painted sun-kissed dimension customized to your facial architecture, finished with a nourishing botanical silk gloss.",
        duration: "150 mins",
        price: "$240",
        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80",
        popular: true
      },
      {
        id: "caviar-hair-spa",
        name: "Botanical Caviar Hair Spa & Scalp Detox",
        description: "Deep micro-circulation scalp scrub, customized restorative ampoule infusion, and warm jade comb tension relief massage.",
        duration: "75 mins",
        price: "$145",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "couture-cut-blowout",
        name: "Couture Precision Cut & Velvet Blowout",
        description: "Personalized structural haircut tailored to texture and movement, followed by our signature bouncy cashmere blowout.",
        duration: "60 mins",
        price: "$110",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "keratin-silk-infusion",
        name: "Organic Bio-Keratin Smoothing Veil",
        description: "Formaldehyde-free amino acid smoothing treatment that eliminates frizz and locks in mirror shine for up to 16 weeks.",
        duration: "120 mins",
        price: "$280",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80"
      }
    ],

    skin: [
      {
        id: "diamond-hydrafacial",
        name: "Diamond Hydra-Infusion & Oxygen Glow",
        description: "Triple vortex deep pore cleansing, lactic peel, hyaluronic diamond infusion, and pure hyperbaric oxygen mist.",
        duration: "75 mins",
        price: "$195",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
        popular: true
      },
      {
        id: "sculpting-buccal-facial",
        name: "Lumière Sculpting Buccal & Gua Sha Facial",
        description: "Intra-oral buccal massage releasing jaw tension and sculpting cheekbones, combined with cold rose-quartz drainage.",
        duration: "90 mins",
        price: "$230",
        image: "https://images.unsplash.com/photo-1512290900672-1f5076b498f3?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "led-cellular-revival",
        name: "Cellular Phyto-Stem LED Therapy",
        description: "Alpine rose stem-cell infusion paired with medical-grade multi-wavelength LED light to stimulate natural collagen.",
        duration: "60 mins",
        price: "$165",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "glow-peel-barrier",
        name: "Bio-Ferment Barrier Peel & Calm",
        description: "Zero-downtime gentle fruit enzyme resurfacing followed by a calming colloidal oat and ceramide cocoon mask.",
        duration: "50 mins",
        price: "$135",
        image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=700&q=80"
      }
    ],

    bridal: [
      {
        id: "royal-bridal-day",
        name: "Haute Couture Bridal Makeup & Styling",
        description: "Complete ceremonial look with airbrush radiance, bespoke mink lashes, veil setting, and waterproof jewelry-proof setting.",
        duration: "180 mins",
        price: "$380",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
        popular: true
      },
      {
        id: "bridal-trial-session",
        name: "Bespoke Bridal Preview & Consultation",
        description: "Comprehensive 2-hour design preview testing skin compatibility, lighting tones, and floral/veil harmonization.",
        duration: "120 mins",
        price: "$190",
        image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "red-carpet-glam",
        name: "Red Carpet & Gala Evening Artistry",
        description: "Sculpted camera-ready complexion, smoky or editorial eye artistry, and customized long-wear lip architecture.",
        duration: "75 mins",
        price: "$160",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "bridal-party-glam",
        name: "Bridesmaid & Mother of the Bride Suite",
        description: "Luminous, unified skin finish and elegant soft updos or Hollywood waves for bridal attendants.",
        duration: "60 mins",
        price: "$130",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=700&q=80"
      }
    ],

    nails: [
      {
        id: "japanese-gel-art",
        name: "Artisanal Japanese Gel Manicure",
        description: "Gentle non-damaging organic gel with precision dry cuticle Russian care, micro-artistry, and cashmere hand massage.",
        duration: "75 mins",
        price: "$95",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=700&q=80",
        popular: true
      },
      {
        id: "botanical-pedicure",
        name: "Warm Milk & Honey Botanical Pedicure",
        description: "Epsom salt soak, organic raw sugar scrub, warm paraffin dip, hot stone lower leg massage, and long-wear gloss.",
        duration: "60 mins",
        price: "$110",
        image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "cashmere-lash-extensions",
        name: "Featherlight Cashmere Lash Extensions",
        description: "Weightless 1-to-1 individual lash extensions tailored to your eye shape. Natural flutter or dramatic volume.",
        duration: "90 mins",
        price: "$175",
        image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=700&q=80"
      },
      {
        id: "lash-lift-tint",
        name: "Keratin Lash Lift & Deep Ebony Tint",
        description: "Curls and darkens natural lashes for up to 8 weeks without extensions or mascara required.",
        duration: "50 mins",
        price: "$90",
        image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=700&q=80"
      }
    ]
  },

  packages: [
    {
      id: "essential-glow",
      name: "The Essential Glow",
      tagline: "Perfect for pre-event radiance or regular monthly maintenance.",
      price: "$180",
      value: "$235 Value",
      duration: "2 Hours",
      features: [
        "Express Diamond Hydra-Facial (45m)",
        "Signature Couture Blowout & Silk Finish",
        "Mini Japanese Gel Manicure",
        "Complimentary Herbal Collagen Elixir"
      ],
      popular: false
    },
    {
      id: "royal-bridal",
      name: "The Royal Bridal Experience",
      tagline: "The definitive bridal sanctuary ritual for the bride who demands perfection.",
      price: "$480",
      value: "$640 Value",
      duration: "4.5 Hours",
      badge: "MOST POPULAR",
      features: [
        "Diamond Hydra-Infusion & Oxygen Glow Facial",
        "Full Ceremonial Bridal Hair & Makeup Artistry",
        "Bespoke Mink Lash Architecture & Touch-Up Kit",
        "Japanese Gel Bridal Nail Art & Deluxe Pedicure",
        "Private VIP Suite Reservation",
        "Veuve Clicquot Champagne & Macaron Service"
      ],
      popular: true
    },
    {
      id: "ultimate-spa-retreat",
      name: "The Ultimate Spa Retreat",
      tagline: "A deep half-day journey of head-to-toe restorative serenity.",
      price: "$320",
      value: "$415 Value",
      duration: "3.5 Hours",
      features: [
        "90-min Sculpting Buccal & Gua Sha Facial",
        "Botanical Caviar Hair Spa & Tension Scalp Detox",
        "Warm Milk & Honey Deluxe Spa Pedicure",
        "Hot Stone Shoulder & Neck Tension Release",
        "Aromatherapy Sound Bath & Lounge Access"
      ],
      popular: false
    }
  ],

  lookbook: [
    {
      id: 1,
      category: "Hair",
      title: "Dimensional Hazelnut & Gold Balayage",
      subtitle: "Hand-painted seamless melting dimension",
      beforeImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      afterImg: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      category: "Skin",
      title: "Hydra-Infusion Glass Skin Revival",
      subtitle: "75-min cellular decongestion & plumping",
      beforeImg: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      afterImg: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      category: "Bridal",
      title: "Ethereal Sunset Rose Bridal Glam",
      subtitle: "Airbrushed velvety finish with winged mink lashes",
      beforeImg: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80",
      afterImg: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      category: "Nails",
      title: "Minimalist Gold Leaf & Oyster Japanese Gel",
      subtitle: "Hand-sculpted bespoke editorial nail art",
      beforeImg: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
      afterImg: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
    }
  ],

  specialists: [
    {
      id: "elise",
      name: "Élise Laurent",
      title: "Master Colorist & Founder",
      specialty: "French Balayage & Hair Architecture",
      experience: "14+ Years in Paris & Beverly Hills"
    },
    {
      id: "sophia",
      name: "Sophia Chen, LE",
      title: "Senior Medical Esthetician",
      specialty: "Buccal Sculpting & Cellular Hydra-Facials",
      experience: "CIDESCO International Diplôme"
    },
    {
      id: "maya",
      name: "Maya Al-Mansoor",
      title: "Lead Bridal & Editorial Artist",
      specialty: "Red Carpet & Ethereal Bridal Glamour",
      experience: "Featured in Vogue & Brides Magazine"
    },
    {
      id: "any",
      name: "First Available Master Specialist",
      title: "Concierge Allocation",
      specialty: "Matched to your treatment preferences",
      experience: "All specialists certified & vetted"
    }
  ],

  testimonials: [
    {
      name: "Camille d'Aubigny",
      location: "Beverly Hills, CA",
      service: "The Royal Bridal Experience",
      rating: 5,
      date: "2 weeks ago",
      quote: "Lumière transformed my wedding morning into the most serene, joyous experience. Élise and Maya listened to every detail of my dream look. My makeup remained flawless through 12 hours of dancing and emotion."
    },
    {
      name: "Dr. Rachel Sterling",
      location: "Santa Monica, CA",
      service: "Diamond Hydra-Facial & Buccal Massage",
      rating: 5,
      date: "1 month ago",
      quote: "As a dermatologist, I am intensely critical of spa treatments. Sophia’s buccal massage released months of jaw clenching and sculpted my cheekbones immediately. The atmosphere is true quiet luxury."
    },
    {
      name: "Vivienne Westwood-Sloane",
      location: "West Hollywood, CA",
      service: "French Balayage & Botanical Hair Spa",
      rating: 5,
      date: "3 weeks ago",
      quote: "The only salon I trust with my blonde. The hand-painted balayage blends out so seamlessly that I only need maintenance twice a year. The complimentary champagne and quiet treatment rooms are sublime."
    }
  ],

  instagramGrid: [
    { img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=500&q=80", caption: "Golden hour tones by @elise.lumiere ✦" },
    { img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80", caption: "Hydra-infusion glow season 🌿" },
    { img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80", caption: "Saturday bride moments in suite 100 🕊️" },
    { img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=500&q=80", caption: "Japanese gel precision & gold leaf art ✨" },
    { img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80", caption: "Restorative caviar scalp therapy 🤍" },
    { img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=500&q=80", caption: "Warm herbal pedicures in our botanical lounge 🪷" }
  ]
};

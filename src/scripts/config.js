/**
 * ÉLAN BOTANIQUE - Brand Configuration & Content Management
 * Easily customize text, products, pricing, ingredients, and brand settings here.
 */

export const brandConfig = {
  brand: {
    name: "ÉLAN BOTANIQUE",
    legalName: "Élan Botanique Labs Inc.",
    tagline: "Haute Skincare & Botanical Alchemy",
    established: "2024",
    location: "Provence & Geneva",
    badge: "Limited Seasonal Batch • No. 04",
    currency: "$",
    currencyCode: "USD",
    freeShippingThreshold: 120, // Free shipping on orders over $120
  },

  announcements: [
    "COMPLIMENTARY SHIPPING ON ORDERS OVER $120",
    "THE SPRING VINTAGE HARVEST HAS ARRIVED — HAND-NUMBERED BOTTLES",
    "ENJOY A DELUXE MINIATURE VELVET CREAM WITH EVERY ELIXIR ORDER",
    "FORMULATED WITH 100% COLD-PRESSED BOTANICALS & BIO-PEPTIDES"
  ],

  navigation: [
    { label: "The Collection", href: "#collection" },
    { label: "The Hero Elixir", href: "#hero-spotlight" },
    { label: "Botanical Science", href: "#ingredients" },
    { label: "Our Story", href: "#story" },
    { label: "Skin Ritual Finder", href: "#ritual-finder" },
    { label: "Reviews", href: "#reviews" }
  ],

  hero: {
    pretitle: "ANCIENT BOTANY × BIO-CELLULAR SCIENCE",
    title: "Awaken Your Skin’s Cellular Radiance",
    subtitle: "A transcendent facial nectar formulated with high-altitude Swiss Alpine rose phytocells, wild-harvested cold-pressed camellia, and copper tripeptides. Clinically proven to restore the lipid mantle and ignite an ethereal, lit-from-within glow.",
    primaryCta: "Shop The Luminous Elixir",
    secondaryCta: "Discover the Botanical Alchemy",
    price: "$148",
    size: "30 ml / 1.0 fl. oz.",
    clinicalStats: [
      { value: "98%", label: "Observed Immediate Radiance", detail: "Clinical perception study over 28 days" },
      { value: "72h", label: "Cellular Moisture Lock", detail: "Corneometer barrier evaluation" },
      { value: "100%", label: "Cold-Pressed Wild Harvest", detail: "Zero synthetic fillers or water dilution" }
    ]
  },

  products: [
    {
      id: "luminous-elixir",
      name: "The Luminous Elixir",
      subtitle: "Restorative Cellular Face Nectar",
      price: 148,
      rating: 4.97,
      reviewsCount: 142,
      size: "30 ml / 1.0 fl oz",
      category: "Serums & Elixirs",
      badge: "Signature Hero",
      isHero: true,
      colorAccent: "#E2A792", // Rose gold
      shortDescription: "A transformative, bio-active oil-serum crafted with alpine stem cells and cold-pressed botanical nectars for transcendent luminosity.",
      description: "Hand-poured in micro-batches, The Luminous Elixir delivers potent botanical bio-actives directly to the dermal matrix. Wild-harvested Swiss Alpine Rose Stem Cells defend against environmental stressors, while pure Cold-Pressed Camellia Seed Oil and 2% Natural Bakuchiol deeply nourish without clogging pores. Skin emerges firm, radiant, and intensely replenished.",
      keyActives: [
        "Swiss Alpine Rose Phyto-Cells (1.5%)",
        "Wild-Harvested Tsubaki Camellia Oil",
        "Bio-Retinol Bakuchiol (2%)",
        "Bio-Fermented Coenzyme Q10"
      ],
      benefits: [
        "Ignites an instant, non-greasy golden-hour glow",
        "Visibly reduces fine lines & strengthens dermal elasticity",
        "Calms redness and fortifies the lipid moisture barrier",
        "Protects against blue light & environmental free-radical damage"
      ],
      howToUse: "Warm 3–4 drops between palms to activate the botanical terpenes. Press gently into clean skin across face, neck, and décolleté in upward sweeping motions. Use morning and night as the sacred anchor of your ritual.",
      texture: "Silk-velvet golden nectar that absorbs in under 45 seconds.",
      scent: "Ethereal Damask rose petals, crushed bergamot leaves, and subtle sandalwood."
    },
    {
      id: "velvet-barrier-cream",
      name: "Velvet Barrier Cream",
      subtitle: "Lipid-Replenishing Moisture Cocoon",
      price: 128,
      rating: 4.95,
      reviewsCount: 98,
      size: "50 ml / 1.7 fl oz",
      category: "Moisturizers",
      badge: "Bestseller",
      colorAccent: "#D4AF37", // Warm Gold
      shortDescription: "A whipped, biomimetic ceramide cream that envelopes stressed skin in a breathable, protective velvet moisture shield.",
      description: "Engineered with 5 bio-identical skin ceramides, snow mushroom polysaccharides (holding 500x its weight in moisture), and organic squalane. This decadent cream repairs compromised skin barriers overnight, delivering plump, dewy bounce by sunrise.",
      keyActives: [
        "Ceramide NP, AP & EOP Complex",
        "Tremella Snow Mushroom Polysaccharide",
        "Plant-Derived Olive Squalane",
        "Colloidal Oat Bio-Ferment"
      ],
      benefits: [
        "Repairs over-exfoliated or compromised skin barriers",
        "Locks in hydration for up to 48 hours",
        "Leaves a smooth, velvet matte finish perfect under makeup"
      ],
      howToUse: "Smooth a marble-sized amount over face and neck after your serum or elixir.",
      texture: "Whipped cloud-like soufflé that melts to a soothing veil.",
      scent: "Gentle Roman chamomile and crisp green tea."
    },
    {
      id: "celestial-cleansing-nectar",
      name: "Celestial Cleansing Nectar",
      subtitle: "Melting Oil-to-Milk Purifier",
      price: 78,
      rating: 4.93,
      reviewsCount: 84,
      size: "100 ml / 3.4 fl oz",
      category: "Cleansers",
      badge: "Award Winner",
      colorAccent: "#8BA899", // Muted Sage
      shortDescription: "An artisanal oil-to-milk cleanser that effortlessly melts water-resistant makeup, pollutants, and excess sebum without stripping.",
      description: "Formulated with golden jojoba, cold-pressed papaya enzymes, and soothing blue tansy. As water touches this golden nectar, it blossoms into a milky emulsion that leaves skin cushiony-soft, deeply clean, and beautifully balanced.",
      keyActives: [
        "Cold-Pressed Golden Jojoba",
        "Fermented Papaya Bio-Enzymes",
        "Moroccan Blue Tansy Flower Oil",
        "Vitamin E Tocopherol"
      ],
      benefits: [
        "Dissolves waterproof makeup, SPF & impurities in seconds",
        "Zero eye stinging or oily residue",
        "Maintains the acid mantle's delicate pH 5.5 balance"
      ],
      howToUse: "Massage 2 pumps onto dry skin in circular motions. Add warm water to emulsify into a silky milk, then rinse thoroughly.",
      texture: "Rich golden honey-oil that emulsifies into velvet milk.",
      scent: "Cooling Moroccan blue tansy and sweet orange blossom."
    },
    {
      id: "botanical-eye-infusion",
      name: "Botanical Eye Infusion",
      subtitle: "Marine Tripeptide Awakening Balm",
      price: 94,
      rating: 4.98,
      reviewsCount: 112,
      size: "15 ml / 0.5 fl oz",
      category: "Treatments",
      badge: "Clinical Favorite",
      colorAccent: "#C59B7B", // Warm bronze
      shortDescription: "An ultra-nourishing eye concentrate with green coffee caffeine and marine peptides to banish puffiness and dark shadows.",
      description: "Specially calibrated for the delicate orbital zone. Green coffee bean extract boosts microcirculation, while marine tripeptides stimulate elastin synthesis to visibly lift and awaken tired eyes.",
      keyActives: [
        "Cold-Extracted Green Coffee Bean",
        "Marine Tripeptide-1 & Hexapeptide-8",
        "Organic Eyebright Extract",
        "Hyaluronic Acid Multi-Weights"
      ],
      benefits: [
        "De-puffs under-eye bags within 15 minutes of application",
        "Brightens persistent vascular dark circles",
        "Smooths crow's feet and prevents creasing under concealer"
      ],
      howToUse: "Using your ring finger, gently pat half a pump around the orbital bone morning and evening.",
      texture: "Cooling featherlight gel-cream that sinks in instantly.",
      scent: "Unscented / pure botanical neutrality for ultra-sensitive eyes."
    },
    {
      id: "verdant-cellular-mist",
      name: "Verdant Cellular Mist",
      subtitle: "Alchemical Mineral Hydrosol",
      price: 64,
      rating: 4.89,
      reviewsCount: 76,
      size: "100 ml / 3.4 fl oz",
      category: "Mists & Toners",
      badge: "Daily Essential",
      colorAccent: "#8BA899",
      shortDescription: "A micro-fine botanical hydrosol mist infused with copper PCA, Damask rose water, and electrolyte-rich birch sap.",
      description: "Recharge your skin throughout the day. This nutrient-dense hydrosol instantly douses parched skin in cellular moisture while shielding against urban smog, electromagnetic radiation, and air-conditioned dryness.",
      keyActives: [
        "Artisanal Damask Rose Hydrosol",
        "Copper PCA & Magnesium Complex",
        "Nordic Birch Tree Sap",
        "Centella Asiatica (Cica)"
      ],
      benefits: [
        "Instant thermal and atmospheric soothing",
        "Enhances absorption of serums and oils by 40%",
        "Sets makeup with a luminous satin veil"
      ],
      howToUse: "Mist generously over face and neck before applying serums, or throughout the day for an energizing sensory pick-me-up.",
      texture: "Ultra-fine cloud mist that gently settles without droplets.",
      scent: "Freshly harvested roses and clean mountain morning mist."
    },
    {
      id: "night-metamorphosis-mask",
      name: "Night Metamorphosis Mask",
      subtitle: "Resurfacing Bio-Ferment Treatment",
      price: 135,
      rating: 4.96,
      reviewsCount: 67,
      size: "50 ml / 1.7 fl oz",
      category: "Treatments",
      badge: "Limited Batch",
      colorAccent: "#E2A792",
      shortDescription: "An overnight exfoliating jelly treatment that gently polishes texture and re-sculpts radiance while you dream.",
      description: "A symphony of botanical AHAs, fermented pumpkin enzymes, and soothing reishi mushrooms. Works overnight to dissolve dead cellular debris, fade post-blemish marks, and unveil baby-smooth skin by morning.",
      keyActives: [
        "10% Gentle Fruit Acid Complex (Lactic + Glycolic)",
        "Fermented Pumpkin Enzymes",
        "Wild Reishi & Chaga Mushroom Adaptogens",
        "Prickly Pear Seed Nectar"
      ],
      benefits: [
        "Non-abrasive cellular exfoliation without irritation or peeling",
        "Fades stubborn hyperpigmentation and sun spots",
        "Unclogs pores and clarifies skin tone"
      ],
      howToUse: "Apply a thin layer to clean skin 2-3 nights per week. Leave on overnight; wake up and rinse with warm water.",
      texture: "Cooling amethyst jelly that transforms into a breathable silk cushion.",
      scent: "Grounding lavender blossoms, wild thyme, and frankincense."
    }
  ],

  ingredients: [
    {
      name: "Swiss Alpine Rose Phyto-Cells",
      source: "Grown at 2,800m elevation in Valais, Switzerland",
      role: "Cellular Longevity & DNA Protection",
      description: "Thriving amidst harsh UV radiation and extreme frost, the Alpine Rose produces unique dehydrins and polyphenols that protect skin stem cells from photo-aging and climatic degradation.",
      potency: "Clinically demonstrated to boost skin stem cell colony efficiency by +75%."
    },
    {
      name: "Cold-Pressed Tsubaki Camellia",
      source: "Wild-harvested on volcanic volcanic Jeju Island",
      role: "Deep Lipid Mantle Restoration",
      description: "Prized for centuries by geishas for porcelain radiance, our virgin cold-pressed camellia is exceptionally rich in Omega-9 oleic acids, plant squalene, and vitamins A, B, D, and E for weightless silk nourishment.",
      potency: "Absorbs into deeper dermis within 40 seconds with zero comedogenic residue."
    },
    {
      name: "Bio-Fermented Marine Kelp",
      source: "Sustainably hand-harvested off the Brittany Coast",
      role: "Mineral Mineralization & Collagen Synthesis",
      description: "Subjected to a 60-day slow fermentation process that unlocks ocean-derived peptides, bio-available iodine, and trace minerals to dramatically fortify skin firmness.",
      potency: "Stimulates pro-collagen 1 production by +92% in in-vitro tests."
    },
    {
      name: "Biomimetic Copper Tripeptides & Bakuchiol",
      source: "Psoralea Corylifolia & Cellular Bio-Synthesis",
      role: "Gentle Wrinkle Smoothing & Tone Uniformity",
      description: "The gold standard of natural cellular renewal. Bakuchiol provides all the collagen-stimulating benefits of medical-grade retinol without redness, peeling, or sun sensitivity.",
      potency: "97% of panelists experienced smoother skin texture without flaking."
    }
  ],

  philosophy: {
    quote: "We believe true luxury is not synthetic perfection, but the reverence of nature’s most resilient botanicals, elevated by uncompromising cellular science.",
    founderName: "Amélie & Céline Laurent",
    founderTitle: "Co-Founders & Botanical Chemists",
    pillars: [
      {
        icon: "leaf",
        title: "Wild-Harvested Integrity",
        desc: "All botanicals are ethically hand-gathered at peak potency from regenerative alpine and oceanic biomes."
      },
      {
        icon: "droplet",
        title: "Cold-Pressed & Undiluted",
        desc: "Zero water dilution, zero synthetic fillers. Every drop is dense with pure bio-active nourishment."
      },
      {
        icon: "shield",
        title: "Clinical Biocompatibility",
        desc: "Formulated at skin-mimicking pH 5.2 to deeply nourish and integrate seamlessly with your natural lipid mantle."
      },
      {
        icon: "sparkle",
        title: "Artisanal Micro-Batches",
        desc: "Hand-blended in small numbered runs to preserve the volatile antioxidants and ensure sublime freshness."
      }
    ],
    certifications: [
      "100% Leaping Bunny Certified Cruelty-Free",
      "Ecocert Organic Ingredients",
      "Forest Stewardship Council (FSC) Recycled Packaging",
      "Certified B-Corporation Pending",
      "Carbon-Neutral Shipping & Carbon Offset"
    ]
  },

  pressQuotes: [
    {
      publication: "Vogue International",
      quote: "The next great frontier of high-performance botanical alchemy. The Luminous Elixir gives skin that elusive, sculpted lit-from-within glow.",
      author: "Beauty Director"
    },
    {
      publication: "Harper's Bazaar",
      quote: "An ethereal glow in a hand-poured glass dropper. It replaced three steps in our editors’ holy grail evening ritual.",
      author: "Executive Editor"
    },
    {
      publication: "Elle Magazine",
      quote: "Finally, clean skincare with the clinical potency of medical-grade retinols, minus the irritation or dryness.",
      author: "Senior Skincare Writer"
    },
    {
      publication: "Vanity Fair",
      quote: "The bespoke beauty secret gracing every high-profile aesthetician's vanity in Paris and New York.",
      author: "Style & Culture"
    }
  ],

  reviews: [
    {
      id: 1,
      name: "Genevieve R.",
      location: "Paris, France",
      product: "The Luminous Elixir",
      rating: 5,
      skinType: "Dry / Sensitive",
      ageGroup: "30s",
      verified: true,
      title: "Worth every single cent. My skin has never looked so alive.",
      review: "I have struggled with dullness and dehydration after winter travel. Within three days of using The Luminous Elixir morning and night, my partner asked if I had had a professional facial. The texture is sublime—it feels like liquid silk and smells like an early morning rose garden in Grasse."
    },
    {
      id: 2,
      name: "Dr. Evelyn M.",
      location: "Zurich, Switzerland",
      product: "Velvet Barrier Cream",
      rating: 5,
      skinType: "Mature / Compromised",
      ageGroup: "40s",
      verified: true,
      title: "As a dermatologist, I am thoroughly impressed by this formulation.",
      review: "The biomimetic ceramide profile in this cream is exceptional. It repaired my post-laser skin in half the usual time. It doesn't sit on top of the skin like heavy petroleum creams; it truly integrates with the barrier."
    },
    {
      id: 3,
      name: "Sienna K.",
      location: "San Francisco, CA",
      product: "The Luminous Elixir",
      rating: 5,
      skinType: "Combination / Prone to redness",
      ageGroup: "20s",
      verified: true,
      title: "Replaced my retinol and heavy oils permanently.",
      review: "The bakuchiol in this is pure magic. Zero purging, zero flaking, just smooth, plump, radiant skin that looks luminous even without a drop of concealer. The bottle on my vanity looks like a piece of high art."
    },
    {
      id: 4,
      name: "Charlotte de V.",
      location: "London, UK",
      product: "Celestial Cleansing Nectar",
      rating: 5,
      skinType: "All Skin Types",
      ageGroup: "30s",
      verified: true,
      title: "My favorite moment of the entire day.",
      review: "The sensory experience of this cleanser is unmatched. It dissolves heavy waterproof mascara effortlessly and washes away completely clean with water. No film, just soft, cushiony skin."
    }
  ],

  routineSteps: [
    {
      step: "01",
      title: "Purify & Soften",
      product: "Celestial Cleansing Nectar",
      action: "Dissolve daily impurities with melting golden botanicals.",
      duration: "60 seconds"
    },
    {
      step: "02",
      title: "Cellular Activation",
      product: "Verdant Cellular Mist",
      action: "Drench skin with copper peptides and mountain hydrosol.",
      duration: "10 seconds"
    },
    {
      step: "03",
      title: "Targeted Elixir",
      product: "The Luminous Elixir",
      action: "Press alpine rose stem cells & bakuchiol into the dermis.",
      duration: "45 seconds"
    },
    {
      step: "04",
      title: "Barrier Lock",
      product: "Velvet Barrier Cream",
      action: "Seal hydration with bio-identical ceramides and squalane.",
      duration: "30 seconds"
    }
  ],

  skinQuiz: {
    title: "Discover Your Botanical Ritual",
    subtitle: "Answer 3 intuitive questions to reveal the personalized micro-batch regimen calibrated to your skin's unique cellular rhythm.",
    questions: [
      {
        id: "goal",
        question: "What is your primary skin intention?",
        options: [
          { label: "Radiance & Luminous Glow", description: "Target dullness, uneven tone, and fatigue", targetProduct: "luminous-elixir" },
          { label: "Barrier Repair & Deep Nourishment", description: "Soothe redness, flaking, or sensitized barrier", targetProduct: "velvet-barrier-cream" },
          { label: "Cellular Renewal & Firming", description: "Smooth fine lines and restore youthful bounce", targetProduct: "night-metamorphosis-mask" },
          { label: "Purifying & Pore Refinement", description: "Clear congestion while maintaining moisture", targetProduct: "celestial-cleansing-nectar" }
        ]
      },
      {
        id: "environment",
        question: "What climate or environmental stressors affect you most?",
        options: [
          { label: "Dry & High Altitude", description: "Low humidity, indoor heating, or mountain winds" },
          { label: "Urban & High Smog", description: "City pollution, blue light screen exposure, and transit dust" },
          { label: "Humid & Tropical", description: "High moisture, perspiration, and sebum imbalance" },
          { label: "Changing Seasons & Variable", description: "Fluctuating between dry cold and mild warmth" }
        ]
      },
      {
        id: "texture",
        question: "Which sensory texture brings you the deepest pleasure?",
        options: [
          { label: "Silk Nectar Oil", description: "Sublime golden drops that melt into velvety cashmere" },
          { label: "Whipped Cocoon Cream", description: "Dense, cloud-soft buttery nourishment" },
          { label: "Cooling Gel Hydrosol", description: "Refreshing, featherlight hydration with instant bounce" }
        ]
      }
    ]
  },

  faq: [
    {
      q: "Are Élan Botanique formulas suitable for highly sensitive skin?",
      a: "Yes. All our products are dermatologically evaluated, non-comedogenic, and hypoallergenic. We eschew synthetic perfumes, drying alcohols, essential oil overdoses, and harsh chemical preservatives. We recommend a 24-hour patch test before full facial application."
    },
    {
      q: "How does Bakuchiol compare to traditional Retinol?",
      a: "Bakuchiol is a botanical active extracted from the Ayurvedic Babchi plant. Clinical trials demonstrate it activates the same cellular collagen synthesis pathways as prescription retinol, without causing erythema, photo-sensitivity, or peeling. It is safe for day use and during pregnancy."
    },
    {
      q: "How long does a 30ml bottle of The Luminous Elixir last?",
      a: "Because our formulation is 100% active with zero water fillers, only 3-4 drops are required per ritual. Used twice daily, a 30ml bottle provides approximately 60 to 75 days of sacred daily care."
    },
    {
      q: "What is your return & guarantee policy?",
      a: "We offer our 30-Day Luminous Guarantee. If your skin does not visibly transform with radiant hydration and vitality within 30 days, we will gladly arrange a full refund or exchange with complimentary return shipping."
    }
  ],

  footer: {
    newsletterTitle: "Enter the Botanical Inner Circle",
    newsletterSubtitle: "Receive private previews of limited seasonal harvests, invitations to masterclasses with our botanical chemists, and 15% off your first ritual.",
    copyright: "© 2026 ÉLAN BOTANIQUE. All Rights Reserved. Crafted with reverence for skin and earth.",
    links: {
      shop: [
        { label: "All Formulations", href: "#collection" },
        { label: "The Luminous Elixir", href: "#hero-spotlight" },
        { label: "Barrier Care", href: "#collection" },
        { label: "Discovery Sets & Gifts", href: "#collection" }
      ],
      science: [
        { label: "Botanical Chemistry", href: "#ingredients" },
        { label: "Clinical Evaluations", href: "#hero-spotlight" },
        { label: "Alpine Wild Harvesting", href: "#story" },
        { label: "Sustainability & B-Corp", href: "#story" }
      ],
      legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Shipping & Returns", href: "#" },
        { label: "Accessibility Statement", href: "#" }
      ]
    }
  }
};

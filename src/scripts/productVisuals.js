/**
 * Ultra-crisp, high-fidelity luxury cosmetic product illustrations
 * Rendered with vector gradients, glass reflections, metallic foil highlights, and soft cast shadows.
 */

export const productVisuals = {
  'luminous-elixir': `
    <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="product-illustration">
      <defs>
        <!-- Gradients -->
        <linearGradient id="bg-glow-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#142c22" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#07130e" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="aura-gold" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stop-color="#d4af37" stop-opacity="0.25"/>
          <stop offset="60%" stop-color="#e2a792" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#0a1a14" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1b3d2f" stop-opacity="0.95"/>
          <stop offset="18%" stop-color="#2d5e4a" stop-opacity="0.8"/>
          <stop offset="35%" stop-color="#6ea38c" stop-opacity="0.4"/>
          <stop offset="50%" stop-color="#1a3b2e" stop-opacity="0.9"/>
          <stop offset="85%" stop-color="#0e231b" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#081611" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="liquid-nectar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e08e24" stop-opacity="0.9"/>
          <stop offset="30%" stop-color="#ffc666" stop-opacity="0.95"/>
          <stop offset="70%" stop-color="#e6962b" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#b86b11" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="rose-gold-metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b07969"/>
          <stop offset="25%" stop-color="#e8b1a2"/>
          <stop offset="50%" stop-color="#fae2db"/>
          <stop offset="75%" stop-color="#cf9483"/>
          <stop offset="100%" stop-color="#9e6656"/>
        </linearGradient>
        <linearGradient id="gold-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <filter id="shadow-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="12"/>
          <feOffset dx="0" dy="16" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Pedestal / Atmosphere Glow -->
      <rect width="100%" height="100%" rx="16" fill="url(#bg-glow-1)"/>
      <circle cx="200" cy="270" r="140" fill="url(#aura-gold)"/>

      <!-- Contact Shadow on Table -->
      <ellipse cx="200" cy="410" rx="95" ry="18" fill="#020704" opacity="0.85" filter="blur(8px)"/>
      <ellipse cx="200" cy="408" rx="60" ry="10" fill="#000000" opacity="0.9" filter="blur(4px)"/>

      <!-- Bottle Group -->
      <g filter="url(#shadow-drop)">
        <!-- Outer Glass Bottle Silhouette -->
        <rect x="130" y="180" width="140" height="215" rx="28" fill="url(#glass-body)" stroke="#4e7c69" stroke-width="1.2"/>

        <!-- Heavy Glass Base Bottom Thick Glass Line -->
        <rect x="135" y="375" width="130" height="15" rx="6" fill="#132a20" opacity="0.85"/>
        <line x1="145" y1="382" x2="255" y2="382" stroke="#487864" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>

        <!-- Inner Liquid Volume (The Luminous Elixir) -->
        <rect x="140" y="210" width="120" height="160" rx="14" fill="url(#liquid-nectar)"/>
        <!-- Meniscus Curve -->
        <path d="M 140 215 Q 200 224 260 215 L 260 210 Q 200 218 140 210 Z" fill="#ffdca8" opacity="0.9"/>

        <!-- Internal Borosilicate Pipette Tube -->
        <rect x="194" y="140" width="12" height="210" rx="4" fill="#ffffff" opacity="0.3"/>
        <rect x="196" y="140" width="3" height="210" fill="#ffffff" opacity="0.6"/>
        <!-- Pipette Tip Droplet -->
        <circle cx="200" cy="355" r="5" fill="#ffe299" opacity="0.95"/>

        <!-- Glass Specular Left Reflection Strip -->
        <path d="M 142 195 Q 146 360 148 380" stroke="url(#gold-highlight)" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.75"/>
        <path d="M 152 205 Q 155 350 156 370" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4"/>

        <!-- Embossed Label on Bottle -->
        <rect x="150" y="235" width="100" height="110" rx="4" fill="#fcf9f2" opacity="0.95" stroke="#d4af37" stroke-width="1.2"/>
        <rect x="154" y="239" width="92" height="102" rx="2" fill="none" stroke="#e0a899" stroke-width="0.8"/>
        <!-- Label Content -->
        <text x="200" y="258" font-family="'Cormorant Garamond', serif" font-size="8" font-weight="700" fill="#a4752c" text-anchor="middle" letter-spacing="2">✦  ÉLAN  ✦</text>
        <text x="200" y="274" font-family="'Cormorant Garamond', serif" font-size="12" font-weight="600" fill="#0b1e15" text-anchor="middle" letter-spacing="1">LUMINOUS</text>
        <text x="200" y="287" font-family="'Cormorant Garamond', serif" font-size="11" font-weight="400" font-style="italic" fill="#0b1e15" text-anchor="middle" letter-spacing="1">Elixir</text>
        <line x1="172" y1="294" x2="228" y2="294" stroke="#c59b7b" stroke-width="0.7"/>
        <text x="200" y="306" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" font-weight="500" fill="#46584e" text-anchor="middle" letter-spacing="1">ALPINE ROSE</text>
        <text x="200" y="316" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="400" fill="#6c8275" text-anchor="middle" letter-spacing="0.5">30 ML / 1.0 FL. OZ.</text>

        <!-- Glass Shoulder Transition -->
        <path d="M 175 180 L 175 160 L 225 160 L 225 180 Z" fill="#1b3f30" opacity="0.95"/>

        <!-- Rose Gold Dropper Collar -->
        <rect x="170" y="130" width="60" height="32" rx="3" fill="url(#rose-gold-metal)" stroke="#f7dad1" stroke-width="0.8"/>
        <!-- Collar knurling / rings -->
        <line x1="170" y1="138" x2="230" y2="138" stroke="#ffffff" stroke-width="0.7" opacity="0.7"/>
        <line x1="170" y1="154" x2="230" y2="154" stroke="#7e4d3f" stroke-width="0.8" opacity="0.6"/>

        <!-- Soft-Touch Dark Green Rubber Bulb -->
        <path d="M 180 130 C 172 110, 175 80, 194 72 C 197 70, 203 70, 206 72 C 225 80, 228 110, 220 130 Z" fill="#091b13" stroke="#254335" stroke-width="1"/>
        <!-- Bulb Specular Highlight -->
        <path d="M 188 120 C 185 105, 188 88, 196 82" stroke="#4a6d5c" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.55"/>
      </g>

      <!-- Sparkle Accents -->
      <path d="M 290 150 L 293 160 L 303 163 L 293 166 L 290 176 L 287 166 L 277 163 L 287 160 Z" fill="#fce4b8" opacity="0.85"/>
      <circle cx="105" cy="220" r="2.5" fill="#e8b1a2" opacity="0.7"/>
      <circle cx="315" cy="290" r="2" fill="#ffd999" opacity="0.6"/>
    </svg>
  `,

  'velvet-barrier-cream': `
    <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="product-illustration">
      <defs>
        <linearGradient id="bg-glow-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#142c22" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#07130e" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="aura-gold-2" cx="50%" cy="58%" r="48%">
          <stop offset="0%" stop-color="#d4af37" stop-opacity="0.22"/>
          <stop offset="70%" stop-color="#8ba899" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#0a1a14" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="jar-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#163729" stop-opacity="0.92"/>
          <stop offset="25%" stop-color="#2d5e49" stop-opacity="0.75"/>
          <stop offset="50%" stop-color="#73a992" stop-opacity="0.35"/>
          <stop offset="75%" stop-color="#163729" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#0b1e15" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="cream-fill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f2ebe0"/>
          <stop offset="40%" stop-color="#faf6ee"/>
          <stop offset="70%" stop-color="#ede3d2"/>
          <stop offset="100%" stop-color="#dbcebc"/>
        </linearGradient>
        <linearGradient id="gold-lid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8f6b28"/>
          <stop offset="20%" stop-color="#d4af37"/>
          <stop offset="45%" stop-color="#fff1c4"/>
          <stop offset="70%" stop-color="#d4af37"/>
          <stop offset="100%" stop-color="#7c5c20"/>
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" rx="16" fill="url(#bg-glow-2)"/>
      <circle cx="200" cy="275" r="145" fill="url(#aura-gold-2)"/>

      <!-- Contact Shadow -->
      <ellipse cx="200" cy="395" rx="115" ry="20" fill="#010603" opacity="0.85" filter="blur(8px)"/>
      <ellipse cx="200" cy="392" rx="75" ry="12" fill="#000000" opacity="0.95" filter="blur(4px)"/>

      <!-- Heavy Luxury Glass Cream Jar -->
      <g>
        <!-- Heavy Glass Jar Base Body -->
        <rect x="100" y="240" width="200" height="140" rx="32" fill="url(#jar-glass)" stroke="#4e7c69" stroke-width="1.2"/>

        <!-- Heavy Bottom Base Glass Slab -->
        <rect x="108" y="355" width="184" height="20" rx="8" fill="#10251c" opacity="0.8"/>
        <line x1="120" y1="365" x2="280" y2="365" stroke="#52836f" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>

        <!-- Inner Rich Velvet Cream Chamber -->
        <rect x="115" y="255" width="170" height="98" rx="18" fill="url(#cream-fill)"/>
        <!-- Cream swirl surface texture -->
        <path d="M 125 265 Q 165 258 200 268 Q 240 278 275 264" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.7"/>

        <!-- Front Frosted Label Plaque -->
        <rect x="135" y="280" width="130" height="65" rx="4" fill="#faf6ef" opacity="0.95" stroke="#d4af37" stroke-width="1"/>
        <text x="200" y="297" font-family="'Cormorant Garamond', serif" font-size="8" font-weight="700" fill="#a4752c" text-anchor="middle" letter-spacing="2">ÉLAN BOTANIQUE</text>
        <text x="200" y="315" font-family="'Cormorant Garamond', serif" font-size="12" font-weight="600" fill="#0b1e15" text-anchor="middle" letter-spacing="0.8">VELVET BARRIER</text>
        <text x="200" y="327" font-family="'Cormorant Garamond', serif" font-size="10.5" font-weight="400" font-style="italic" fill="#0b1e15" text-anchor="middle">Moisture Cocoon</text>
        <text x="200" y="337" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="500" fill="#5c7165" text-anchor="middle" letter-spacing="0.5">CERAMIDE NP • 50 ML</text>

        <!-- Glass Left Highlight Streak -->
        <path d="M 112 250 Q 116 350 120 370" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.5"/>

        <!-- Brushed Gold Metal Lid -->
        <rect x="92" y="195" width="216" height="48" rx="8" fill="url(#gold-lid)" stroke="#fff1c4" stroke-width="0.8"/>
        <!-- Beveled Lid Edge -->
        <rect x="96" y="235" width="208" height="8" rx="2" fill="#75561a"/>
        <!-- Lid Top Specular Chamfer -->
        <line x1="102" y1="202" x2="298" y2="202" stroke="#ffffff" stroke-width="1.4" opacity="0.75"/>
      </g>

      <!-- Sparkle Accents -->
      <path d="M 85 220 L 88 227 L 95 229 L 88 231 L 85 238 L 82 231 L 75 229 L 82 227 Z" fill="#ffd999" opacity="0.85"/>
      <circle cx="310" cy="185" r="2.5" fill="#fce4b8" opacity="0.8"/>
    </svg>
  `,

  'celestial-cleansing-nectar': `
    <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="product-illustration">
      <defs>
        <linearGradient id="bg-glow-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#142c22" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#07130e" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="aura-gold-3" cx="50%" cy="55%" r="48%">
          <stop offset="0%" stop-color="#8ba899" stop-opacity="0.25"/>
          <stop offset="60%" stop-color="#d4af37" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#0a1a14" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="tall-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#183a2b" stop-opacity="0.95"/>
          <stop offset="25%" stop-color="#2a5845" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#6ea38c" stop-opacity="0.3"/>
          <stop offset="80%" stop-color="#153326" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#0b1e15" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="cleanser-honey" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e3a13d"/>
          <stop offset="40%" stop-color="#f7cf6d"/>
          <stop offset="70%" stop-color="#e8a846"/>
          <stop offset="100%" stop-color="#c47e1d"/>
        </linearGradient>
        <linearGradient id="brushed-gold-pump" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8f6b28"/>
          <stop offset="25%" stop-color="#d4af37"/>
          <stop offset="50%" stop-color="#fff1c4"/>
          <stop offset="75%" stop-color="#c99f2b"/>
          <stop offset="100%" stop-color="#7c5c20"/>
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" rx="16" fill="url(#bg-glow-3)"/>
      <circle cx="200" cy="270" r="140" fill="url(#aura-gold-3)"/>

      <ellipse cx="200" cy="415" rx="85" ry="16" fill="#010603" opacity="0.85" filter="blur(8px)"/>
      <ellipse cx="200" cy="412" rx="55" ry="10" fill="#000000" opacity="0.9" filter="blur(4px)"/>

      <g>
        <!-- Tall Cylindrical Bottle -->
        <rect x="140" y="180" width="120" height="225" rx="22" fill="url(#tall-glass)" stroke="#4e7c69" stroke-width="1.2"/>
        <rect x="145" y="388" width="110" height="14" rx="5" fill="#10251c" opacity="0.85"/>

        <!-- Cleansing Honey Fluid Interior -->
        <rect x="148" y="200" width="104" height="185" rx="14" fill="url(#cleanser-honey)"/>
        <!-- Meniscus -->
        <path d="M 148 205 Q 200 214 252 205 L 252 200 Q 200 208 148 200 Z" fill="#fff0b8" opacity="0.8"/>

        <!-- Glass Left Highlight -->
        <path d="M 150 195 Q 153 370 155 390" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>

        <!-- Label Strip -->
        <rect x="156" y="235" width="88" height="115" rx="3" fill="#faf6ef" opacity="0.95" stroke="#d4af37" stroke-width="1"/>
        <text x="200" y="254" font-family="'Cormorant Garamond', serif" font-size="8" font-weight="700" fill="#a4752c" text-anchor="middle" letter-spacing="2">ÉLAN BOTANIQUE</text>
        <text x="200" y="272" font-family="'Cormorant Garamond', serif" font-size="11.5" font-weight="600" fill="#0b1e15" text-anchor="middle" letter-spacing="0.5">CELESTIAL</text>
        <text x="200" y="285" font-family="'Cormorant Garamond', serif" font-size="10.5" font-weight="400" font-style="italic" fill="#0b1e15" text-anchor="middle">Cleansing Nectar</text>
        <line x1="175" y1="292" x2="225" y2="292" stroke="#c59b7b" stroke-width="0.7"/>
        <text x="200" y="306" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="500" fill="#46584e" text-anchor="middle" letter-spacing="1">OIL-TO-MILK</text>
        <text x="200" y="318" font-family="'Plus Jakarta Sans', sans-serif" font-size="5.5" font-weight="400" fill="#6c8275" text-anchor="middle">100 ML / 3.4 FL. OZ.</text>

        <!-- Pump Collar -->
        <rect x="175" y="152" width="50" height="28" rx="3" fill="url(#brushed-gold-pump)" stroke="#fff1c4" stroke-width="0.8"/>
        <!-- Pump Head & Spout -->
        <path d="M 188 152 L 188 135 L 212 135 L 212 152 Z" fill="url(#brushed-gold-pump)"/>
        <path d="M 180 135 C 180 128, 185 125, 200 125 C 215 125, 220 128, 220 135 L 180 135 Z" fill="#fff1c4"/>
        <path d="M 182 130 C 160 130, 150 134, 142 140 C 141 141, 140 144, 142 145 C 145 146, 148 144, 155 140 C 165 136, 175 135, 185 135 Z" fill="url(#brushed-gold-pump)"/>
      </g>
      <circle cx="280" cy="190" r="2.5" fill="#fce4b8" opacity="0.8"/>
    </svg>
  `,

  'botanical-eye-infusion': `
    <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="product-illustration">
      <defs>
        <linearGradient id="bg-glow-4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#142c22" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#07130e" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="aura-gold-4" cx="50%" cy="55%" r="48%">
          <stop offset="0%" stop-color="#c59b7b" stop-opacity="0.25"/>
          <stop offset="65%" stop-color="#d4af37" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#0a1a14" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="eye-vial" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#183628"/>
          <stop offset="30%" stop-color="#2d5e49"/>
          <stop offset="55%" stop-color="#588b75"/>
          <stop offset="85%" stop-color="#183628"/>
          <stop offset="100%" stop-color="#0d2017"/>
        </linearGradient>
        <linearGradient id="rose-gold-cap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#a87161"/>
          <stop offset="25%" stop-color="#e8b1a2"/>
          <stop offset="50%" stop-color="#fae2db"/>
          <stop offset="75%" stop-color="#cf9483"/>
          <stop offset="100%" stop-color="#945f50"/>
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" rx="16" fill="url(#bg-glow-4)"/>
      <circle cx="200" cy="270" r="135" fill="url(#aura-gold-4)"/>

      <ellipse cx="200" cy="410" rx="75" ry="14" fill="#010603" opacity="0.85" filter="blur(7px)"/>
      <ellipse cx="200" cy="408" rx="45" ry="8" fill="#000000" opacity="0.95" filter="blur(3px)"/>

      <g>
        <!-- Sleek Petite Dropper / Slim Vial Body -->
        <rect x="155" y="195" width="90" height="205" rx="18" fill="url(#eye-vial)" stroke="#4e7c69" stroke-width="1.2"/>
        <rect x="160" y="386" width="80" height="10" rx="4" fill="#0d2017" opacity="0.85"/>

        <!-- Glass Specular Highlight -->
        <path d="M 164 205 Q 166 360 168 385" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" fill="none" opacity="0.6"/>

        <!-- Fine Label Plaque -->
        <rect x="166" y="240" width="68" height="95" rx="2" fill="#faf6ef" opacity="0.95" stroke="#d4af37" stroke-width="0.9"/>
        <text x="200" y="258" font-family="'Cormorant Garamond', serif" font-size="7" font-weight="700" fill="#a4752c" text-anchor="middle" letter-spacing="1.5">ÉLAN</text>
        <text x="200" y="274" font-family="'Cormorant Garamond', serif" font-size="10" font-weight="600" fill="#0b1e15" text-anchor="middle" letter-spacing="0.5">BOTANICAL</text>
        <text x="200" y="286" font-family="'Cormorant Garamond', serif" font-size="9" font-weight="400" font-style="italic" fill="#0b1e15" text-anchor="middle">Eye Infusion</text>
        <line x1="178" y1="292" x2="222" y2="292" stroke="#c59b7b" stroke-width="0.6"/>
        <text x="200" y="303" font-family="'Plus Jakarta Sans', sans-serif" font-size="5" font-weight="500" fill="#46584e" text-anchor="middle" letter-spacing="0.5">PEPTIDES & CAFFEINE</text>
        <text x="200" y="313" font-family="'Plus Jakarta Sans', sans-serif" font-size="5" font-weight="400" fill="#6c8275" text-anchor="middle">15 ML / 0.5 FL. OZ.</text>

        <!-- Tall Rose Gold Metal Cap -->
        <rect x="160" y="105" width="80" height="90" rx="6" fill="url(#rose-gold-cap)" stroke="#fae2db" stroke-width="0.8"/>
        <!-- Cap micro-fluting and top specular line -->
        <line x1="164" y1="112" x2="236" y2="112" stroke="#ffffff" stroke-width="1.2" opacity="0.8"/>
        <line x1="160" y1="190" x2="240" y2="190" stroke="#754235" stroke-width="1"/>
      </g>
      <circle cx="115" cy="180" r="2" fill="#ffd999" opacity="0.7"/>
    </svg>
  `,

  'verdant-cellular-mist': `
    <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="product-illustration">
      <defs>
        <linearGradient id="bg-glow-5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#142c22" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#07130e" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="aura-gold-5" cx="50%" cy="55%" r="48%">
          <stop offset="0%" stop-color="#8ba899" stop-opacity="0.3"/>
          <stop offset="70%" stop-color="#d4af37" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#0a1a14" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="mist-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1b3f30" stop-opacity="0.9"/>
          <stop offset="25%" stop-color="#2d5e49" stop-opacity="0.75"/>
          <stop offset="50%" stop-color="#73a992" stop-opacity="0.4"/>
          <stop offset="75%" stop-color="#1b3f30" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#0b1e15" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="hydrosol-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#6ea38c" stop-opacity="0.8"/>
          <stop offset="40%" stop-color="#a6c8b9" stop-opacity="0.9"/>
          <stop offset="70%" stop-color="#7eb09a" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#4d826c" stop-opacity="0.85"/>
        </linearGradient>
        <linearGradient id="spray-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8f6b28"/>
          <stop offset="25%" stop-color="#d4af37"/>
          <stop offset="50%" stop-color="#fff1c4"/>
          <stop offset="75%" stop-color="#c99f2b"/>
          <stop offset="100%" stop-color="#7c5c20"/>
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" rx="16" fill="url(#bg-glow-5)"/>
      <circle cx="200" cy="270" r="140" fill="url(#aura-gold-5)"/>

      <ellipse cx="200" cy="415" rx="85" ry="16" fill="#010603" opacity="0.85" filter="blur(8px)"/>
      <ellipse cx="200" cy="412" rx="55" ry="10" fill="#000000" opacity="0.9" filter="blur(4px)"/>

      <g>
        <!-- Mist Cylinder Bottle -->
        <rect x="145" y="185" width="110" height="220" rx="20" fill="url(#mist-glass)" stroke="#4e7c69" stroke-width="1.2"/>
        <rect x="150" y="390" width="100" height="12" rx="4" fill="#10251c" opacity="0.85"/>

        <!-- Hydrosol Liquid inside -->
        <rect x="152" y="210" width="96" height="175" rx="12" fill="url(#hydrosol-liquid)"/>

        <!-- Glass Left Highlight -->
        <path d="M 154 200 Q 156 365 158 390" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>

        <!-- Label Plaque -->
        <rect x="158" y="240" width="84" height="110" rx="3" fill="#faf6ef" opacity="0.95" stroke="#d4af37" stroke-width="1"/>
        <text x="200" y="258" font-family="'Cormorant Garamond', serif" font-size="8" font-weight="700" fill="#a4752c" text-anchor="middle" letter-spacing="2">ÉLAN BOTANIQUE</text>
        <text x="200" y="276" font-family="'Cormorant Garamond', serif" font-size="11" font-weight="600" fill="#0b1e15" text-anchor="middle" letter-spacing="0.8">VERDANT</text>
        <text x="200" y="289" font-family="'Cormorant Garamond', serif" font-size="10" font-weight="400" font-style="italic" fill="#0b1e15" text-anchor="middle">Cellular Mist</text>
        <line x1="175" y1="296" x2="225" y2="296" stroke="#c59b7b" stroke-width="0.7"/>
        <text x="200" y="309" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="500" fill="#46584e" text-anchor="middle" letter-spacing="1">MINERAL HYDROSOL</text>
        <text x="200" y="321" font-family="'Plus Jakarta Sans', sans-serif" font-size="5.5" font-weight="400" fill="#6c8275" text-anchor="middle">100 ML / 3.4 FL. OZ.</text>

        <!-- Fine Mist Spray Atomizer & Golden Cap -->
        <rect x="175" y="145" width="50" height="40" rx="3" fill="url(#spray-gold)" stroke="#fff1c4" stroke-width="0.8"/>
        <!-- Clear acrylic overcap -->
        <rect x="165" y="105" width="70" height="80" rx="8" fill="#ffffff" opacity="0.25" stroke="#ffffff" stroke-width="0.8"/>
        <path d="M 168 112 L 168 180" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      </g>
      <!-- Sparkle Droplets -->
      <circle cx="285" cy="140" r="2.5" fill="#a6c8b9" opacity="0.9"/>
      <circle cx="300" cy="155" r="1.5" fill="#ffffff" opacity="0.7"/>
      <circle cx="275" cy="165" r="2" fill="#ffd999" opacity="0.8"/>
    </svg>
  `,

  'night-metamorphosis-mask': `
    <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="product-illustration">
      <defs>
        <linearGradient id="bg-glow-6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#142c22" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#07130e" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="aura-gold-6" cx="50%" cy="58%" r="48%">
          <stop offset="0%" stop-color="#e2a792" stop-opacity="0.25"/>
          <stop offset="70%" stop-color="#d4af37" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#0a1a14" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="mask-jar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#163729" stop-opacity="0.92"/>
          <stop offset="25%" stop-color="#2d5e49" stop-opacity="0.75"/>
          <stop offset="50%" stop-color="#73a992" stop-opacity="0.35"/>
          <stop offset="75%" stop-color="#163729" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#0b1e15" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="jelly-fill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#5c3852"/>
          <stop offset="40%" stop-color="#93577d"/>
          <stop offset="70%" stop-color="#7c4669"/>
          <stop offset="100%" stop-color="#4d2843"/>
        </linearGradient>
        <linearGradient id="rose-gold-lid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#9e6656"/>
          <stop offset="20%" stop-color="#cf9483"/>
          <stop offset="45%" stop-color="#fae2db"/>
          <stop offset="70%" stop-color="#e8b1a2"/>
          <stop offset="100%" stop-color="#8a5344"/>
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" rx="16" fill="url(#bg-glow-6)"/>
      <circle cx="200" cy="275" r="145" fill="url(#aura-gold-6)"/>

      <ellipse cx="200" cy="395" rx="115" ry="20" fill="#010603" opacity="0.85" filter="blur(8px)"/>
      <ellipse cx="200" cy="392" rx="75" ry="12" fill="#000000" opacity="0.95" filter="blur(4px)"/>

      <g>
        <!-- Glass Jar Body -->
        <rect x="100" y="240" width="200" height="140" rx="32" fill="url(#mask-jar)" stroke="#4e7c69" stroke-width="1.2"/>
        <rect x="108" y="355" width="184" height="20" rx="8" fill="#10251c" opacity="0.8"/>
        <line x1="120" y1="365" x2="280" y2="365" stroke="#52836f" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>

        <!-- Amethyst Resurfacing Jelly Chamber -->
        <rect x="115" y="255" width="170" height="98" rx="18" fill="url(#jelly-fill)"/>
        <path d="M 125 265 Q 165 258 200 268 Q 240 278 275 264" stroke="#e0b3d1" stroke-width="2.5" fill="none" opacity="0.7"/>

        <!-- Frosted Label -->
        <rect x="135" y="280" width="130" height="65" rx="4" fill="#faf6ef" opacity="0.95" stroke="#d4af37" stroke-width="1"/>
        <text x="200" y="297" font-family="'Cormorant Garamond', serif" font-size="8" font-weight="700" fill="#a4752c" text-anchor="middle" letter-spacing="2">ÉLAN BOTANIQUE</text>
        <text x="200" y="315" font-family="'Cormorant Garamond', serif" font-size="11.5" font-weight="600" fill="#0b1e15" text-anchor="middle" letter-spacing="0.8">METAMORPHOSIS</text>
        <text x="200" y="327" font-family="'Cormorant Garamond', serif" font-size="10.5" font-weight="400" font-style="italic" fill="#0b1e15" text-anchor="middle">Night Mask</text>
        <text x="200" y="337" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="500" fill="#5c7165" text-anchor="middle" letter-spacing="0.5">AHA ENZYME COMPLEX • 50 ML</text>

        <!-- Glass Highlight -->
        <path d="M 112 250 Q 116 350 120 370" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.5"/>

        <!-- Rose Gold Lid -->
        <rect x="92" y="195" width="216" height="48" rx="8" fill="url(#rose-gold-lid)" stroke="#fae2db" stroke-width="0.8"/>
        <rect x="96" y="235" width="208" height="8" rx="2" fill="#784436"/>
        <line x1="102" y1="202" x2="298" y2="202" stroke="#ffffff" stroke-width="1.4" opacity="0.75"/>
      </g>
      <circle cx="85" cy="210" r="2.5" fill="#fce4b8" opacity="0.8"/>
    </svg>
  `
};

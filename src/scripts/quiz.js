import confetti from 'canvas-confetti';
import { brandConfig } from './config.js';
import { productVisuals } from './productVisuals.js';

export class BotanicalQuiz {
  constructor(cartInstance) {
    this.cart = cartInstance;
    this.container = null;
    this.currentStep = 0;
    this.answers = {};
    this.quizData = brandConfig.skinQuiz;
  }

  init() {
    this.container = document.getElementById('quiz-container');
    if (!this.container) return;
    this.render();
  }

  render() {
    if (this.currentStep < this.quizData.questions.length) {
      this.renderQuestion(this.currentStep);
    } else {
      this.renderResults();
    }
  }

  renderQuestion(index) {
    const q = this.quizData.questions[index];
    const total = this.quizData.questions.length;
    const progressPercent = ((index + 1) / total) * 100;

    this.container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-bar" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="quiz-step-label">Step 0${index + 1} of 0${total}</div>
        <h3 class="quiz-question-title">${q.question}</h3>

        <div class="quiz-options-grid">
          ${q.options.map((opt, i) => `
            <button class="quiz-option-btn ${this.answers[q.id] === i ? 'selected' : ''}" data-index="${i}">
              <div class="quiz-opt-marker">✦</div>
              <div class="quiz-opt-text">
                <span class="quiz-opt-title">${opt.label}</span>
                <span class="quiz-opt-desc">${opt.description}</span>
              </div>
            </button>
          `).join('')}
        </div>

        <div class="quiz-nav-row">
          ${index > 0 ? `<button class="btn btn-ghost" id="quiz-back-btn">← Previous Question</button>` : `<div></div>`}
          <span class="quiz-hint">Select one option to continue</span>
        </div>
      </div>
    `;

    // Bind option clicks
    const optionBtns = this.container.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
        this.answers[q.id] = selectedIdx;
        
        // Brief visual selection highlight then proceed smoothly
        btn.classList.add('selected');
        setTimeout(() => {
          this.currentStep++;
          this.render();
        }, 220);
      });
    });

    // Back button
    const backBtn = this.container.querySelector('#quiz-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.currentStep--;
        this.render();
      });
    }
  }

  renderResults() {
    // Determine curated regimen based on answers
    const goalOptionIdx = this.answers['goal'] || 0;
    const goalOption = this.quizData.questions[0].options[goalOptionIdx];
    
    // Choose primary product
    let primaryId = goalOption.targetProduct || 'luminous-elixir';
    let secondaryId = 'velvet-barrier-cream';
    let tertiaryId = 'verdant-cellular-mist';

    if (primaryId === 'velvet-barrier-cream') {
      secondaryId = 'luminous-elixir';
      tertiaryId = 'celestial-cleansing-nectar';
    } else if (primaryId === 'celestial-cleansing-nectar') {
      secondaryId = 'luminous-elixir';
      tertiaryId = 'velvet-barrier-cream';
    }

    const p1 = brandConfig.products.find(p => p.id === primaryId) || brandConfig.products[0];
    const p2 = brandConfig.products.find(p => p.id === secondaryId) || brandConfig.products[1];
    const p3 = brandConfig.products.find(p => p.id === tertiaryId) || brandConfig.products[4];

    const bundleOriginalPrice = p1.price + p2.price + p3.price;
    const bundleDiscountedPrice = Math.round(bundleOriginalPrice * 0.85); // 15% ritual savings
    const bundleSavings = bundleOriginalPrice - bundleDiscountedPrice;

    this.container.innerHTML = `
      <div class="quiz-results-card">
        <div class="quiz-results-badge">✦ DIAGNOSTIC CALIBRATION COMPLETE ✦</div>
        <h3 class="quiz-results-title">Your Bespoke 3-Step Botanical Ritual</h3>
        <p class="quiz-results-desc">
          Formulated specifically to target <strong>${goalOption.label}</strong>. These three formulations work in synergistic biocompatibility to restore cellular energy and shield your moisture mantle.
        </p>

        <!-- Curated 3-Product Bundle Grid -->
        <div class="quiz-bundle-grid">
          <div class="bundle-item">
            <div class="bundle-badge">Step 1: Prep & Mist</div>
            <div class="bundle-visual">${productVisuals[p3.id] || ''}</div>
            <h4 class="bundle-name">${p3.name}</h4>
            <span class="bundle-price">$${p3.price}</span>
          </div>

          <div class="bundle-item featured">
            <div class="bundle-badge gold">Step 2: Core Cellular Elixir</div>
            <div class="bundle-visual">${productVisuals[p1.id] || ''}</div>
            <h4 class="bundle-name">${p1.name}</h4>
            <span class="bundle-price">$${p1.price}</span>
          </div>

          <div class="bundle-item">
            <div class="bundle-badge">Step 3: Seal Barrier</div>
            <div class="bundle-visual">${productVisuals[p2.id] || ''}</div>
            <h4 class="bundle-name">${p2.name}</h4>
            <span class="bundle-price">$${p2.price}</span>
          </div>
        </div>

        <!-- Bundle Pricing & 1-Click Action -->
        <div class="quiz-bundle-cta-box">
          <div class="bundle-price-details">
            <div class="bundle-saving-tag">BUNDLE PRIVILEGE • 15% SAVINGS</div>
            <div class="bundle-prices-row">
              <span class="bundle-old-price">$${bundleOriginalPrice}</span>
              <span class="bundle-new-price">$${bundleDiscountedPrice} USD</span>
              <span class="bundle-save-amt">(You save $${bundleSavings})</span>
            </div>
            <p class="bundle-perk-text">Includes complimentary worldwide shipping & deluxe miniature sample.</p>
          </div>

          <button class="btn btn-primary btn-gold-shimmer" id="quiz-add-bundle-btn">
            Add Complete 3-Step Ritual to Bag • $${bundleDiscountedPrice}
          </button>
        </div>

        <div class="quiz-retake-row">
          <button class="btn btn-ghost" id="quiz-retake-btn">Retake Diagnostic Quiz</button>
        </div>
      </div>
    `;

    // Trigger celebration confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e2a792', '#d4af37', '#8ba899']
    });

    // Add bundle to bag button
    const addBundleBtn = this.container.querySelector('#quiz-add-bundle-btn');
    if (addBundleBtn) {
      addBundleBtn.addEventListener('click', () => {
        // Add all 3 items to cart
        this.cart.addItem(p1.id, 1, false);
        this.cart.addItem(p2.id, 1, false);
        this.cart.addItem(p3.id, 1, false);
        // Automatically apply 15% discount
        this.cart.applyPromo('BOTANICAL15');
        this.cart.showToast(`Bespoke 3-Step Ritual added to your bag with 15% savings!`);
        this.cart.open();

        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e2a792', '#d4af37', '#ffffff']
        });
      });
    }

    // Retake button
    const retakeBtn = this.container.querySelector('#quiz-retake-btn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        this.currentStep = 0;
        this.answers = {};
        this.render();
      });
    }
  }
}

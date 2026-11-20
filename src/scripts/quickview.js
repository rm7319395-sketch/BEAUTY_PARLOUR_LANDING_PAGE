import { brandConfig } from './config.js';
import { productVisuals } from './productVisuals.js';

export class QuickViewModal {
  constructor(cartInstance) {
    this.cart = cartInstance;
    this.modalEl = null;
    this.currentProduct = null;
    this.selectedQuantity = 1;
    this.init();
  }

  init() {
    this.modalEl = document.getElementById('quickview-modal');
    if (!this.modalEl) return;

    // Close button
    const closeBtn = this.modalEl.querySelector('[data-action="close-quickview"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    const backdrop = this.modalEl.querySelector('.quickview-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open(productId) {
    const product = brandConfig.products.find(p => p.id === productId);
    if (!product || !this.modalEl) return;

    this.currentProduct = product;
    this.selectedQuantity = 1;
    this.renderContent();

    this.modalEl.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove('visible');
      document.body.style.overflow = '';
    }
  }

  isOpen() {
    return this.modalEl && this.modalEl.classList.contains('visible');
  }

  renderContent() {
    const p = this.currentProduct;
    const bodyEl = this.modalEl.querySelector('.quickview-body');
    if (!bodyEl) return;

    const visual = productVisuals[p.id] || '';

    bodyEl.innerHTML = `
      <div class="quickview-grid">
        <!-- Visual Column -->
        <div class="quickview-media">
          ${visual}
          <div class="quickview-floating-badge">${p.badge}</div>
        </div>

        <!-- Details Column -->
        <div class="quickview-info">
          <div class="quickview-header">
            <span class="quickview-category">${p.category}</span>
            <div class="product-rating">
              <span class="stars">★★★★★</span>
              <span class="rating-num">${p.rating}</span>
              <span class="reviews-count">(${p.reviewsCount} reviews)</span>
            </div>
          </div>

          <h2 class="quickview-title">${p.name}</h2>
          <p class="quickview-subtitle">${p.subtitle}</p>

          <div class="quickview-price-row">
            <span class="quickview-price">$${p.price}</span>
            <span class="quickview-size">${p.size}</span>
          </div>

          <!-- Editorial Tabs -->
          <div class="quickview-tabs">
            <button class="qv-tab active" data-tab="formulation">Formulation</button>
            <button class="qv-tab" data-tab="actives">Bio-Actives</button>
            <button class="qv-tab" data-tab="benefits">Benefits</button>
            <button class="qv-tab" data-tab="ritual">The Ritual</button>
          </div>

          <div class="qv-tab-content active" id="qv-tab-formulation">
            <p class="qv-desc">${p.description}</p>
            <div class="qv-sensory-grid">
              <div class="sensory-item">
                <span class="sensory-label">Texture</span>
                <span class="sensory-val">${p.texture}</span>
              </div>
              <div class="sensory-item">
                <span class="sensory-label">Aroma</span>
                <span class="sensory-val">${p.scent}</span>
              </div>
            </div>
          </div>

          <div class="qv-tab-content" id="qv-tab-actives">
            <ul class="qv-list actives-list">
              ${p.keyActives.map(act => `<li><span class="bullet-gold">✦</span> <strong>${act}</strong></li>`).join('')}
            </ul>
          </div>

          <div class="qv-tab-content" id="qv-tab-benefits">
            <ul class="qv-list">
              ${p.benefits.map(b => `<li><span class="check-icon">✓</span> ${b}</li>`).join('')}
            </ul>
          </div>

          <div class="qv-tab-content" id="qv-tab-ritual">
            <p class="qv-desc">${p.howToUse}</p>
            <div class="qv-guarantee-note">
              <span class="icon">✨</span>
              <span>Pair with our Velvet Barrier Cream to seal active phytocells overnight.</span>
            </div>
          </div>

          <!-- Purchase Action Row -->
          <div class="quickview-actions">
            <div class="qv-qty-selector">
              <button class="qv-qty-btn" id="qv-qty-minus" aria-label="Decrease quantity">−</button>
              <span id="qv-qty-val">1</span>
              <button class="qv-qty-btn" id="qv-qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn-primary btn-gold-shimmer qv-add-btn" id="qv-submit-add">
              Add to Ritual Bag • $${p.price}
            </button>
          </div>

          <div class="quickview-perks">
            <span>✦ 100% Leaping Bunny Certified</span>
            <span>✦ Glass Recyclable Packaging</span>
            <span>✦ 30-Day Luminous Guarantee</span>
          </div>
        </div>
      </div>
    `;

    // Tab switching logic
    const tabBtns = bodyEl.querySelectorAll('.qv-tab');
    const tabPanes = bodyEl.querySelectorAll('.qv-tab-content');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const activePane = bodyEl.querySelector(`#qv-tab-${target}`);
        if (activePane) activePane.classList.add('active');
      });
    });

    // Quantity selector logic
    const qtyValEl = bodyEl.querySelector('#qv-qty-val');
    const addBtn = bodyEl.querySelector('#qv-submit-add');
    const minusBtn = bodyEl.querySelector('#qv-qty-minus');
    const plusBtn = bodyEl.querySelector('#qv-qty-plus');

    minusBtn.addEventListener('click', () => {
      if (this.selectedQuantity > 1) {
        this.selectedQuantity--;
        qtyValEl.textContent = this.selectedQuantity;
        addBtn.innerHTML = `Add to Ritual Bag • $${p.price * this.selectedQuantity}`;
      }
    });

    plusBtn.addEventListener('click', () => {
      this.selectedQuantity++;
      qtyValEl.textContent = this.selectedQuantity;
      addBtn.innerHTML = `Add to Ritual Bag • $${p.price * this.selectedQuantity}`;
    });

    // Add to cart click
    addBtn.addEventListener('click', () => {
      this.cart.addItem(p.id, this.selectedQuantity, true);
      this.close();
      this.cart.open();
    });
  }
}

import confetti from 'canvas-confetti';
import { brandConfig } from './config.js';
import { productVisuals } from './productVisuals.js';

/**
 * Luxury Cart Management System
 * Handles state, local storage, slide-over drawer, free shipping tier,
 * promo codes, complimentary deluxe gift tiers, and checkout simulation.
 */

export class LuxuryCart {
  constructor() {
    this.items = [];
    this.promoCode = null;
    this.discountPercent = 0;
    this.freeShippingThreshold = brandConfig.brand.freeShippingThreshold || 120;
    this.deluxeGiftThreshold = 180;

    this.drawerEl = null;
    this.overlayEl = null;
    this.countBadgeEl = null;

    this.loadFromStorage();
  }

  initUI() {
    this.drawerEl = document.getElementById('cart-drawer');
    this.overlayEl = document.getElementById('cart-overlay');
    this.countBadgeEl = document.getElementById('cart-badge');

    // Bind triggers
    const openButtons = document.querySelectorAll('[data-action="open-cart"]');
    openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    const closeButtons = document.querySelectorAll('[data-action="close-cart"]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    if (this.overlayEl) {
      this.overlayEl.addEventListener('click', () => this.close());
    }

    // ESC key closes cart
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Promo code form
    const promoForm = document.getElementById('cart-promo-form');
    if (promoForm) {
      promoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('cart-promo-input');
        if (input) this.applyPromo(input.value.trim());
      });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }

    this.render();
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('elan_botanique_cart');
      if (saved) {
        this.items = JSON.parse(saved);
      } else {
        // Initial welcome item: The Luminous Elixir already in cart for demo convenience
        const heroProduct = brandConfig.products.find(p => p.id === 'luminous-elixir');
        if (heroProduct) {
          this.items = [{
            id: heroProduct.id,
            name: heroProduct.name,
            subtitle: heroProduct.subtitle,
            price: heroProduct.price,
            size: heroProduct.size,
            quantity: 1
          }];
        }
      }
    } catch {
      this.items = [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('elan_botanique_cart', JSON.stringify(this.items));
    } catch (err) {
      console.warn('Could not save cart:', err);
    }
  }

  addItem(productId, quantity = 1, showToast = true) {
    const product = brandConfig.products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        size: product.size,
        quantity: quantity
      });
    }

    this.saveToStorage();
    this.render();

    if (showToast) {
      this.showToast(`Added ${product.name} to your ritual bag`);
      // Trigger subtle celebratory sparkle confetti on adding hero
      if (productId === 'luminous-elixir') {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#e2a792', '#d4af37', '#8ba899']
        });
      }
    }
  }

  updateQuantity(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i.id !== productId);
    }

    this.saveToStorage();
    this.render();
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveToStorage();
    this.render();
  }

  applyPromo(code) {
    const cleanCode = code.toUpperCase();
    const promoMsgEl = document.getElementById('cart-promo-msg');

    if (cleanCode === 'BOTANICAL15' || cleanCode === 'WELCOME15' || cleanCode === 'AURA15') {
      this.promoCode = cleanCode;
      this.discountPercent = 0.15;
      if (promoMsgEl) {
        promoMsgEl.textContent = `Promo code applied: 15% VIP Savings`;
        promoMsgEl.className = 'promo-feedback success';
      }
      this.render();
    } else {
      if (promoMsgEl) {
        promoMsgEl.textContent = 'Invalid code. Try "BOTANICAL15" for 15% off.';
        promoMsgEl.className = 'promo-feedback error';
      }
    }
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDiscountAmount() {
    return this.getSubtotal() * this.discountPercent;
  }

  getFinalTotal() {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    return Math.max(0, subtotal - discount);
  }

  render() {
    // 1. Update Cart Badge Count
    const totalCount = this.getTotalCount();
    if (this.countBadgeEl) {
      this.countBadgeEl.textContent = totalCount;
      this.countBadgeEl.classList.toggle('visible', totalCount > 0);
      // Small pulse animation
      this.countBadgeEl.classList.add('pulse');
      setTimeout(() => this.countBadgeEl.classList.remove('pulse'), 400);
    }

    // 2. Render Free Shipping Progress Bar
    const subtotal = this.getSubtotal();
    const progressBar = document.getElementById('free-shipping-progress');
    const shippingText = document.getElementById('free-shipping-text');

    if (progressBar && shippingText) {
      const percentage = Math.min(100, (subtotal / this.freeShippingThreshold) * 100);
      progressBar.style.width = `${percentage}%`;

      if (subtotal >= this.deluxeGiftThreshold) {
        shippingText.innerHTML = `<strong>Unlocked:</strong> Complimentary Express Shipping & Deluxe Velvet Cream Miniature!`;
      } else if (subtotal >= this.freeShippingThreshold) {
        const giftDiff = this.deluxeGiftThreshold - subtotal;
        shippingText.innerHTML = `<strong>Complimentary Shipping Unlocked!</strong> Add <strong>$${giftDiff.toFixed(0)}</strong> to receive a deluxe miniature.`;
      } else {
        const remaining = this.freeShippingThreshold - subtotal;
        shippingText.innerHTML = `Add <strong>$${remaining.toFixed(0)}</strong> more to enjoy complimentary worldwide shipping.`;
      }
    }

    // 3. Render Cart Item List
    const itemsListEl = document.getElementById('cart-items-container');
    const emptyStateEl = document.getElementById('cart-empty-state');
    const footerEl = document.getElementById('cart-footer-details');

    if (itemsListEl && emptyStateEl && footerEl) {
      if (this.items.length === 0) {
        itemsListEl.innerHTML = '';
        emptyStateEl.style.display = 'block';
        footerEl.style.display = 'none';
      } else {
        emptyStateEl.style.display = 'none';
        footerEl.style.display = 'block';

        itemsListEl.innerHTML = this.items.map(item => {
          const visual = productVisuals[item.id] || '';
          return `
            <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-visual">
                ${visual}
              </div>
              <div class="cart-item-details">
                <div class="cart-item-header">
                  <h4 class="cart-item-title">${item.name}</h4>
                  <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                <p class="cart-item-subtitle">${item.subtitle}</p>
                <p class="cart-item-size">${item.size}</p>
                <div class="cart-item-bottom">
                  <div class="quantity-control">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                  </div>
                  <div class="cart-item-price">$${(item.price * item.quantity).toFixed(0)}</div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        // Rebind item buttons
        itemsListEl.querySelectorAll('.cart-item-remove').forEach(btn => {
          btn.addEventListener('click', () => {
            this.removeItem(btn.getAttribute('data-id'));
          });
        });

        itemsListEl.querySelectorAll('.qty-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const action = btn.getAttribute('data-action');
            this.updateQuantity(id, action === 'increase' ? 1 : -1);
          });
        });
      }
    }

    // 4. Update Totals
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountRow = document.getElementById('cart-discount-row');
    const discountValEl = document.getElementById('cart-discount-val');
    const shippingEl = document.getElementById('cart-shipping-val');
    const totalEl = document.getElementById('cart-total-val');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(0)}`;

    if (discountRow && discountValEl) {
      if (this.discountPercent > 0) {
        discountRow.style.display = 'flex';
        discountValEl.textContent = `-$${this.getDiscountAmount().toFixed(0)} (15%)`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (shippingEl) {
      if (subtotal >= this.freeShippingThreshold) {
        shippingEl.innerHTML = `<span class="free-tag">COMPLIMENTARY</span>`;
      } else {
        shippingEl.textContent = `$15`;
      }
    }

    if (totalEl) {
      const shippingCost = subtotal >= this.freeShippingThreshold ? 0 : 15;
      const finalAmount = this.getFinalTotal() + (this.items.length > 0 ? shippingCost : 0);
      totalEl.textContent = `$${finalAmount.toFixed(0)}`;
    }
  }

  open() {
    if (this.drawerEl && this.overlayEl) {
      this.drawerEl.classList.add('open');
      this.overlayEl.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.drawerEl && this.overlayEl) {
      this.drawerEl.classList.remove('open');
      this.overlayEl.classList.remove('visible');
      document.body.style.overflow = '';
    }
  }

  isOpen() {
    return this.drawerEl && this.drawerEl.classList.contains('open');
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'luxury-toast';
    toast.innerHTML = `
      <div class="toast-icon">✦</div>
      <div class="toast-text">${message}</div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  handleCheckout() {
    // Elegant simulated checkout dialog
    const modal = document.createElement('div');
    modal.className = 'checkout-modal-backdrop';
    modal.innerHTML = `
      <div class="checkout-modal-box">
        <button class="checkout-close" aria-label="Close modal">&times;</button>
        <div class="checkout-crest">✦   ÉLAN BOTANIQUE   ✦</div>
        <h3 class="checkout-title">Preparing Your Botanical Ritual</h3>
        <p class="checkout-desc">Your order is being calibrated for artisanal micro-batch bottling. All elixirs are hand-numbered and packed in recyclable FSC-certified packaging.</p>
        
        <div class="checkout-summary-box">
          <div class="checkout-summary-row">
            <span>Ritual Items (${this.getTotalCount()})</span>
            <strong>$${this.getFinalTotal().toFixed(0)} USD</strong>
          </div>
          <div class="checkout-summary-row">
            <span>Carbon-Neutral Shipping</span>
            <span class="free-tag">COMPLIMENTARY</span>
          </div>
          <div class="checkout-summary-row total">
            <span>Total Amount</span>
            <strong>$${this.getFinalTotal().toFixed(0)} USD</strong>
          </div>
        </div>

        <div class="checkout-benefits">
          <div class="c-benefit">✓ 30-Day Luminous Guarantee</div>
          <div class="c-benefit">✓ Complimentary Deluxe Samples Included</div>
          <div class="c-benefit">✓ 100% Carbon Offset Delivery</div>
        </div>

        <button class="btn btn-primary btn-block checkout-submit-btn">
          Confirm Sacred Order (Demo Mode)
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('visible'), 20);

    modal.querySelector('.checkout-close').addEventListener('click', () => {
      modal.classList.remove('visible');
      setTimeout(() => modal.remove(), 300);
    });

    modal.querySelector('.checkout-submit-btn').addEventListener('click', () => {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e2a792', '#d4af37', '#8ba899', '#ffffff']
      });

      modal.querySelector('.checkout-modal-box').innerHTML = `
        <div class="checkout-crest">✦   ORDER CONFIRMED   ✦</div>
        <h3 class="checkout-title">Welcome to the Inner Circle</h3>
        <p class="checkout-desc">Thank you for inviting Élan Botanique into your sacred skincare sanctuary. Your confirmation order <strong>#EB-2026-${Math.floor(1000 + Math.random() * 9000)}</strong> has been registered.</p>
        <div class="checkout-summary-box" style="text-align: center; padding: 1.5rem;">
          <p style="margin: 0; color: #8ba899; font-size: 0.9rem;">A tracking dispatch notification with batch analysis will be sent to your inbox upon formulation.</p>
        </div>
        <button class="btn btn-primary btn-block modal-done-btn">Return to Sanctuary</button>
      `;

      modal.querySelector('.modal-done-btn').addEventListener('click', () => {
        modal.classList.remove('visible');
        setTimeout(() => modal.remove(), 300);
        this.items = [];
        this.saveToStorage();
        this.render();
        this.close();
      });
    });
  }
}

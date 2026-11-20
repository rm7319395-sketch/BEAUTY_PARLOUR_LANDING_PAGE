import confetti from 'canvas-confetti';
import { brandConfig } from './config.js';
import { productVisuals } from './productVisuals.js';
import { LuxuryBottleExperience } from './threeBottle.js';
import { LuxuryCart } from './cart.js';
import { QuickViewModal } from './quickview.js';
import { BotanicalQuiz } from './quiz.js';

/**
 * Main Application Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Cart
  const cart = new LuxuryCart();
  cart.initUI();

  // 2. Initialize Quick View Modal
  const quickView = new QuickViewModal(cart);

  // 3. Initialize Botanical Quiz
  const quiz = new BotanicalQuiz(cart);
  quiz.init();

  // 4. Initialize 3D Skincare Bottle Centerpiece
  const bottleContainer = document.getElementById('three-bottle-canvas');
  let bottleExperience = null;

  if (bottleContainer) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    bottleExperience = new LuxuryBottleExperience(bottleContainer, {
      reducedMotion: prefersReducedMotion
    });

    // 3D Canvas Controls
    const resetBtn = document.getElementById('btn-reset-3d');
    const pauseBtn = document.getElementById('btn-pause-3d');

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        bottleExperience.resetView();
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        const isPaused = bottleExperience.togglePause();
        pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
      });
    }
  }

  // 5. Reduced Motion Toggle Support
  const reducedMotionToggle = document.getElementById('reduced-motion-toggle');
  let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateReducedMotion(enabled) {
    isReducedMotion = enabled;
    document.body.classList.toggle('reduced-motion', isReducedMotion);
    if (bottleExperience) {
      bottleExperience.setReducedMotion(isReducedMotion);
    }
    if (reducedMotionToggle) {
      reducedMotionToggle.setAttribute('aria-pressed', isReducedMotion ? 'true' : 'false');
      reducedMotionToggle.innerHTML = isReducedMotion
        ? `<span>✦ Motion: <strong>Reduced</strong></span>`
        : `<span>✦ Motion: <strong>Full Fluid</strong></span>`;
    }
  }

  if (reducedMotionToggle) {
    updateReducedMotion(isReducedMotion);
    reducedMotionToggle.addEventListener('click', () => {
      updateReducedMotion(!isReducedMotion);
    });
  }

  // 6. Header Scroll Detection
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 7. Announcement Bar Cycling
  const announcementTextEl = document.getElementById('announcement-ticker');
  if (announcementTextEl && brandConfig.announcements.length > 1) {
    let announcementIdx = 0;
    setInterval(() => {
      announcementIdx = (announcementIdx + 1) % brandConfig.announcements.length;
      announcementTextEl.style.opacity = '0';
      setTimeout(() => {
        announcementTextEl.textContent = brandConfig.announcements[announcementIdx];
        announcementTextEl.style.opacity = '1';
      }, 300);
    }, 4500);
  }

  // 8. Render Product Cards Grid with Filters
  const productsGrid = document.getElementById('products-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderProducts(category = 'all') {
    if (!productsGrid) return;

    const filtered = category === 'all'
      ? brandConfig.products
      : brandConfig.products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));

    productsGrid.innerHTML = filtered.map(p => {
      const visual = productVisuals[p.id] || '';
      return `
        <article class="product-card" data-id="${p.id}" data-category="${p.category}">
          <div class="card-media">
            <span class="card-badge">${p.badge}</span>
            <button class="card-wishlist-btn" data-id="${p.id}" aria-label="Add ${p.name} to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            ${visual}
            <div class="card-quickview-overlay">
              <button class="btn btn-outline btn-block card-qv-trigger" data-id="${p.id}">
                Quick View Formulation
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="card-meta-row">
              <span class="card-category">${p.category}</span>
              <div class="product-rating">
                <span class="stars">★★★★★</span>
                <span class="rating-num">${p.rating}</span>
                <span class="reviews-count">(${p.reviewsCount})</span>
              </div>
            </div>

            <h3 class="card-title">${p.name}</h3>
            <p class="card-subtitle">${p.subtitle}</p>

            <div class="card-actives-row">
              ${p.keyActives.slice(0, 2).map(act => `<span class="active-pill">${act.split('(')[0].trim()}</span>`).join('')}
            </div>

            <div class="card-footer">
              <div class="card-price-wrap">
                <span class="card-price">$${p.price}</span>
                <span class="card-size">${p.size}</span>
              </div>
              <button class="btn btn-primary card-add-btn" data-id="${p.id}">
                Add to Bag
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Rebind Card Triggers
    productsGrid.querySelectorAll('.card-qv-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        quickView.open(id);
      });
    });

    productsGrid.querySelectorAll('.card-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        cart.addItem(id, 1, true);
      });
    });

    productsGrid.querySelectorAll('.card-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const svg = btn.querySelector('svg');
        const isFav = svg.getAttribute('fill') === 'currentColor';
        if (isFav) {
          svg.setAttribute('fill', 'none');
          cart.showToast('Removed from wishlist');
        } else {
          svg.setAttribute('fill', 'currentColor');
          btn.style.color = '#e2a792';
          cart.showToast('Saved to your sacred wishlist');
        }
      });
    });
  }

  renderProducts('all');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProducts(cat);
    });
  });

  // 9. FAQ Accordion Behavior
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // 10. Newsletter Subscription Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const email = input?.value.trim();

      if (email && email.includes('@')) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#e2a792', '#d4af37', '#ffffff']
        });

        newsletterForm.innerHTML = `
          <div style="padding: 1.5rem; background: rgba(10, 26, 19, 0.8); border: 1px solid #d4af37; border-radius: 30px; text-align: center;">
            <p style="color: #f5df97; font-family: var(--font-serif); font-size: 1.4rem; margin-bottom: 0.35rem;">✦ Welcome to the Botanical Inner Circle ✦</p>
            <p style="color: #8fa89b; font-size: 0.88rem; margin: 0;">Your 15% invitation code <strong>BOTANICAL15</strong> has been applied to your sanctuary bag.</p>
          </div>
        `;
        cart.applyPromo('BOTANICAL15');
        cart.showToast('VIP Code BOTANICAL15 applied to your bag!');
      }
    });
  }

  // 11. Mobile Menu Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-trigger');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileCloseBtn = document.getElementById('mobile-nav-close');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    mobileCloseBtn?.addEventListener('click', () => {
      mobileNavDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });

    mobileNavDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 12. Hero CTA Button - smooth jump to hero product or instant add
  const heroShopBtn = document.getElementById('hero-shop-btn');
  if (heroShopBtn) {
    heroShopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cart.addItem('luminous-elixir', 1, true);
      cart.open();
    });
  }

  // 13. Search Modal Trigger (Fast search across products)
  const searchBtn = document.getElementById('header-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = prompt('Search formulations by name, active ingredient, or concern:');
      if (query && query.trim()) {
        const clean = query.trim().toLowerCase();
        const match = brandConfig.products.find(p =>
          p.name.toLowerCase().includes(clean) ||
          p.description.toLowerCase().includes(clean) ||
          p.keyActives.some(a => a.toLowerCase().includes(clean))
        );
        if (match) {
          quickView.open(match.id);
        } else {
          cart.showToast(`No formulations matching "${query}". Showing all.`);
          renderProducts('all');
        }
      }
    });
  }
});

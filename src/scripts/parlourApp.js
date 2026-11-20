import confetti from 'canvas-confetti';
import { parlourData } from './parlourData.js';

export class LumiereApp {
  constructor() {
    this.currentCategory = 'hair';
    this.bookingState = {
      service: null,
      specialist: 'any',
      date: new Date().toISOString().split('T')[0],
      time: '11:30 AM',
      name: '',
      phone: '',
      notes: ''
    };
    this.currentBookingStep = 1;
    this.init();
  }

  init() {
    this.renderServices(this.currentCategory);
    this.bindServiceTabs();
    this.bindBeforeAfterSliders();
    this.initBookingEngine();
    this.bindScrollEffects();
    this.bindMobileMenu();
    this.bindDirectBookButtons();
  }

  // 1. Render Services Menu by Category
  renderServices(category) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    const items = parlourData.services[category] || [];
    grid.innerHTML = items.map(s => `
      <article class="service-card" data-id="${s.id}">
        <div class="service-card-media">
          <img src="${s.image}" alt="${s.name}" loading="lazy" />
          ${s.popular ? `<span class="service-card-badge">POPULAR</span>` : ''}
        </div>
        <div class="service-card-body">
          <h3 class="service-card-title">${s.name}</h3>
          <p class="service-card-desc">${s.description}</p>
          <div class="service-card-footer">
            <div class="service-meta-price">
              <span class="service-price">${s.price}</span>
              <span class="service-duration">${s.duration}</span>
            </div>
            <button class="btn btn-primary service-book-btn" data-action="quick-book" data-service="${s.name}" data-price="${s.price}">
              Book Service
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Rebind Quick Book buttons
    grid.querySelectorAll('[data-action="quick-book"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const serviceName = btn.getAttribute('data-service');
        this.selectServiceAndJumpToBooking(serviceName);
      });
    });
  }

  bindServiceTabs() {
    const tabButtons = document.querySelectorAll('.service-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        this.currentCategory = cat;
        this.renderServices(cat);
      });
    });
  }

  // 2. Interactive Before & After Transformation Slider
  bindBeforeAfterSliders() {
    const wrappers = document.querySelectorAll('.comparison-wrapper');
    wrappers.forEach(wrap => {
      const beforeImg = wrap.querySelector('.comparison-img.before');
      const divider = wrap.querySelector('.comparison-divider');
      let isDragging = false;

      const setPosition = (x) => {
        const rect = wrap.getBoundingClientRect();
        let posX = x - rect.left;
        posX = Math.max(0, Math.min(rect.width, posX));
        const percent = (posX / rect.width) * 100;

        beforeImg.style.width = `${percent}%`;
        divider.style.left = `${percent}%`;
      };

      const onStart = (e) => {
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setPosition(clientX);
      };

      const onMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setPosition(clientX);
      };

      const onEnd = () => {
        isDragging = false;
      };

      divider.addEventListener('mousedown', onStart);
      wrap.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);

      divider.addEventListener('touchstart', onStart, { passive: true });
      wrap.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onEnd);
    });
  }

  // 3. Multi-Step Interactive Booking Engine
  initBookingEngine() {
    this.renderStep1Services();
    this.renderStep2Specialists();
    this.bindStepNavigation();
    this.bindWhatsAppBooking();
    this.bindFormSubmission();
  }

  renderStep1Services() {
    const container = document.getElementById('step-1-services-list');
    if (!container) return;

    // Flatten all category services
    const allServices = [
      ...parlourData.services.hair.map(s => ({ ...s, cat: 'Hair' })),
      ...parlourData.services.skin.map(s => ({ ...s, cat: 'Skin' })),
      ...parlourData.services.bridal.map(s => ({ ...s, cat: 'Bridal' })),
      ...parlourData.services.nails.map(s => ({ ...s, cat: 'Nails' }))
    ];

    container.innerHTML = allServices.map((s, idx) => `
      <div class="selection-card ${idx === 0 ? 'selected' : ''}" data-service-name="${s.name}" data-service-price="${s.price}">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.35rem;">
          <strong style="font-size: 0.95rem;">${s.name}</strong>
          <span style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--accent-rose); font-weight: 600;">${s.price}</span>
        </div>
        <div style="font-size: 0.78rem; color: var(--text-espresso-muted); display: flex; gap: 0.75rem;">
          <span>${s.cat}</span>
          <span>•</span>
          <span>${s.duration}</span>
        </div>
      </div>
    `).join('');

    this.bookingState.service = allServices[0].name;

    container.querySelectorAll('.selection-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.bookingState.service = card.getAttribute('data-service-name');
      });
    });
  }

  renderStep2Specialists() {
    const container = document.getElementById('step-2-specialists-list');
    if (!container) return;

    container.innerHTML = parlourData.specialists.map(sp => `
      <div class="selection-card ${sp.id === 'any' ? 'selected' : ''}" data-specialist-id="${sp.id}" data-specialist-name="${sp.name}">
        <strong style="display: block; font-size: 1rem; margin-bottom: 0.25rem;">${sp.name}</strong>
        <span style="display: block; font-size: 0.78rem; color: var(--accent-rose); font-weight: 600; margin-bottom: 0.25rem;">${sp.title}</span>
        <span style="display: block; font-size: 0.75rem; color: var(--text-espresso-muted);">${sp.specialty}</span>
      </div>
    `).join('');

    container.querySelectorAll('.selection-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.bookingState.specialist = card.getAttribute('data-specialist-name');
      });
    });

    // Time slot picker
    const timeSlots = document.querySelectorAll('.time-slot-btn');
    timeSlots.forEach(btn => {
      btn.addEventListener('click', () => {
        timeSlots.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.bookingState.time = btn.getAttribute('data-time');
      });
    });
  }

  bindStepNavigation() {
    const nextBtn1 = document.getElementById('btn-step-1-next');
    const nextBtn2 = document.getElementById('btn-step-2-next');
    const prevBtn2 = document.getElementById('btn-step-2-prev');
    const prevBtn3 = document.getElementById('btn-step-3-prev');

    nextBtn1?.addEventListener('click', () => this.goToStep(2));
    nextBtn2?.addEventListener('click', () => this.goToStep(3));
    prevBtn2?.addEventListener('click', () => this.goToStep(1));
    prevBtn3?.addEventListener('click', () => this.goToStep(2));
  }

  goToStep(step) {
    this.currentBookingStep = step;

    // Update Indicators
    for (let i = 1; i <= 3; i++) {
      const ind = document.getElementById(`step-ind-${i}`);
      const panel = document.getElementById(`booking-panel-${i}`);
      if (ind && panel) {
        ind.classList.toggle('active', i === step);
        ind.classList.toggle('completed', i < step);
        panel.classList.toggle('active', i === step);
      }
    }

    // If step 3, update review summary box
    if (step === 3) {
      const summaryEl = document.getElementById('booking-summary-box');
      if (summaryEl) {
        summaryEl.innerHTML = `
          <div style="background: var(--bg-blush); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--accent-rose-border); margin-bottom: 1.5rem;">
            <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--accent-rose); margin-bottom: 0.35rem;">SELECTED RESERVATION</div>
            <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 0.35rem;">${this.bookingState.service}</h4>
            <div style="font-size: 0.85rem; color: var(--text-espresso-muted); display: flex; flex-wrap: wrap; gap: 0.85rem;">
              <span>Specialist: <strong>${this.bookingState.specialist}</strong></span>
              <span>•</span>
              <span>Time: <strong>${this.bookingState.time}</strong></span>
            </div>
          </div>
        `;
      }
    }
  }

  bindFormSubmission() {
    const form = document.getElementById('booking-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('client-name')?.value.trim();
      const phone = document.getElementById('client-phone')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number for reservation confirmation.');
        return;
      }

      this.bookingState.name = name;
      this.bookingState.phone = phone;

      // Celebrate with confetti
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C58F79', '#D4AF37', '#FAF7F2']
      });

      this.showBookingConfirmationModal();
    });
  }

  bindWhatsAppBooking() {
    const waBtn = document.getElementById('btn-whatsapp-book');
    if (!waBtn) return;

    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('client-name')?.value.trim() || 'Aesthetic Guest';
      const text = encodeURIComponent(
        `Bonjour Lumière Beauty Studio! My name is ${name}. I would like to reserve an appointment for:
✦ Treatment: ${this.bookingState.service}
✦ Specialist: ${this.bookingState.specialist}
✦ Time Preference: ${this.bookingState.time}
Please confirm availability!`
      );
      const url = `https://wa.me/${parlourData.brand.whatsapp}?text=${text}`;
      window.open(url, '_blank');
    });
  }

  showBookingConfirmationModal() {
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal-backdrop';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(44, 36, 32, 0.8); backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center; z-index: 3000;
      padding: 1.5rem; animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
      <div style="background: #FFFFFF; border-radius: 24px; max-width: 500px; width: 100%; padding: 2.5rem; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border: 1px solid var(--accent-rose-border);">
        <div style="font-size: 2.5rem; color: var(--accent-rose); margin-bottom: 1rem;">✦</div>
        <span style="font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.15em; color: var(--accent-rose);">RESERVATION REGISTERED</span>
        <h3 style="font-family: var(--font-serif); font-size: 2rem; margin: 0.5rem 0 1rem;">We Await Your Radiance</h3>
        <p style="color: var(--text-espresso-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.75rem;">
          Merci, <strong>${this.bookingState.name}</strong>. Your session for <strong>${this.bookingState.service}</strong> with <strong>${this.bookingState.specialist}</strong> has been tentatively held for <strong>${this.bookingState.time}</strong>. An SMS confirmation will be sent to <strong>${this.bookingState.phone}</strong> within 15 minutes.
        </p>
        <button class="btn btn-primary btn-block" id="btn-close-confirm">Return to Sanctuary</button>
      </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('btn-close-confirm')?.addEventListener('click', () => {
      modal.remove();
      this.goToStep(1);
    });
  }

  selectServiceAndJumpToBooking(serviceName) {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Auto-select in list
    const cards = document.querySelectorAll('#step-1-services-list .selection-card');
    cards.forEach(card => {
      if (card.getAttribute('data-service-name').toLowerCase().includes(serviceName.toLowerCase())) {
        card.click();
      }
    });

    this.goToStep(2);
  }

  bindDirectBookButtons() {
    // Top nav, hero, package buttons
    document.querySelectorAll('[data-action="book-appointment"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pkg = btn.getAttribute('data-package');
        if (pkg) {
          this.selectServiceAndJumpToBooking(pkg);
        } else {
          document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  bindScrollEffects() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  bindMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const closeBtn = document.getElementById('mobile-nav-close');

    toggle?.addEventListener('click', () => {
      drawer?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const close = () => {
      drawer?.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', close);
    drawer?.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LumiereApp();
});

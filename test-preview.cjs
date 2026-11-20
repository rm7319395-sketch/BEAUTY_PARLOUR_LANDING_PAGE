const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.svg': 'image/svg+xml'
};

function createStaticServer(port = 5174) {
  const distDir = path.join(__dirname, 'dist');
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    let filePath = path.join(distDir, reqPath);

    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      console.log(`Self-hosted preview server running at http://127.0.0.1:${port}`);
      resolve(server);
    });
  });
}

async function testArielBeaumont() {
  const port = 5174;
  const server = await createStaticServer(port);
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Launching browser for Ariel Beaumont verification...');
  const tmpUserDir = path.join(__dirname, 'tmp_chrome_' + Date.now());
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: tmpUserDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Browser Console Error:', msg.text());
        errors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      console.log('Page Error:', err.message);
      errors.push(err.message);
    });

    console.log(`Navigating to http://127.0.0.1:${port} ...`);
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll through page to trigger all in-view animations
    console.log('Triggering in-view animations across page...');
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight + 1000) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    await new Promise(r => setTimeout(r, 2000));

    // Scroll back to top for hero capture
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 1000));

    console.log('Capturing Hero Section...');
    const heroEl = await page.$('section:first-of-type');
    if (heroEl) {
      await heroEl.screenshot({ path: path.join(screenshotsDir, '30-ariel-hero.png') });
    }

    console.log('Capturing Selected Work Section...');
    await page.evaluate(() => {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    const workEl = await page.$('#work');
    if (workEl) {
      await workEl.screenshot({ path: path.join(screenshotsDir, '31-ariel-work.png') });
    }

    console.log('Capturing Services Section...');
    await page.evaluate(() => {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    const servicesEl = await page.$('#services');
    if (servicesEl) {
      await servicesEl.screenshot({ path: path.join(screenshotsDir, '32-ariel-services.png') });
    }

    console.log('Capturing About Section...');
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    const aboutEl = await page.$('#about');
    if (aboutEl) {
      await aboutEl.screenshot({ path: path.join(screenshotsDir, '33-ariel-about.png') });
    }

    console.log('Capturing Testimonials Section...');
    await page.evaluate(() => {
      const el = document.getElementById('testimonials');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    const testimonialsEl = await page.$('#testimonials');
    if (testimonialsEl) {
      await testimonialsEl.screenshot({ path: path.join(screenshotsDir, '34-ariel-testimonials.png') });
    }

    console.log('Capturing FAQ & Gold CTA Section...');
    await page.evaluate(() => {
      const el = document.getElementById('faq');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    const faqEl = await page.$('#faq');
    if (faqEl) {
      await faqEl.screenshot({ path: path.join(screenshotsDir, '35-ariel-faq.png') });
    }

    console.log('Capturing Contact Hotline & Enquiry Section...');
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));
    const contactEl = await page.$('#contact');
    if (contactEl) {
      await contactEl.screenshot({ path: path.join(screenshotsDir, '38-contact-section.png') });
    }

    console.log('Testing and Capturing Automated Concierge Chat...');
    // Click the floating chat button
    const chatBtn = await page.$('button[aria-label="Toggle Automated Client Enquiry Chat"]');
    if (chatBtn) {
      await chatBtn.click();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(screenshotsDir, '39-automation-chat-open.png') });

      // Click Bridal option in the chat
      console.log('Interacting with Automated Chat: selecting Bridal option...');
      const bridalBtn = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => b.textContent && b.textContent.includes('Bridal Artistry'));
      });

      if (bridalBtn) {
        await bridalBtn.click();
        await new Promise(r => setTimeout(r, 1800));
        await page.screenshot({ path: path.join(screenshotsDir, '40-automation-chat-bridal-flow.png') });
      }
    }

    console.log('Testing Mobile Viewport...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, '36-ariel-mobile.png') });

    console.log('Capturing Full Page...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const interval = setInterval(() => {
          window.scrollBy(0, 500);
          total += 500;
          if (total >= document.body.scrollHeight + 500) {
            clearInterval(interval);
            resolve();
          }
        }, 60);
      });
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(screenshotsDir, '37-ariel-full-page.png'), fullPage: true });

    console.log('Ariel Beaumont visual capture completed. Error count:', errors.length);
  } finally {
    await browser.close();
    server.close();
  }
}

testArielBeaumont().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

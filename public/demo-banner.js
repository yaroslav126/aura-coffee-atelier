(function() {
  if (window.__DEV_DEMO_BANNER_INITIALIZED__) return;
  window.__DEV_DEMO_BANNER_INITIALIZED__ = true;

  const style = document.createElement('style');
  style.id = 'dev-demo-banner-styles';
  style.textContent = `
    #dev-demo-banner-root {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      pointer-events: auto;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    }
    #dev-demo-banner-root * {
      box-sizing: border-box;
    }
    .dev-demo-banner-bar {
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
      color: #f8fafc;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 13px;
      line-height: 1.45;
    }
    .dev-demo-banner-content {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
    }
    .dev-demo-banner-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(234, 179, 8, 0.18);
      border: 1px solid rgba(234, 179, 8, 0.45);
      color: #fde047;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 9999px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .dev-demo-banner-text {
      color: #cbd5e1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dev-demo-banner-text strong {
      color: #ffffff;
      font-weight: 600;
    }
    .dev-demo-banner-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .dev-demo-banner-btn-tg {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #0284c7;
      color: #ffffff !important;
      text-decoration: none !important;
      font-weight: 600;
      font-size: 12px;
      padding: 6px 12px;
      border-radius: 6px;
      transition: background 0.2s ease, transform 0.1s ease;
      white-space: nowrap;
    }
    .dev-demo-banner-btn-tg:hover {
      background: #0369a1;
      transform: translateY(-1px);
    }
    .dev-demo-banner-btn-close {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #94a3b8;
      cursor: pointer;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 1;
      padding: 0;
      transition: all 0.2s ease;
    }
    .dev-demo-banner-btn-close:hover {
      background: rgba(255, 255, 255, 0.18);
      color: #ffffff;
    }
    #dev-demo-pill-restore {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 2147483646;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(234, 179, 8, 0.4);
      color: #fde047;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      font-weight: 600;
      padding: 7px 12px;
      border-radius: 9999px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
      cursor: pointer;
      display: none;
      align-items: center;
      gap: 6px;
      transition: transform 0.2s ease, background 0.2s ease;
    }
    #dev-demo-pill-restore:hover {
      transform: translateY(-2px);
      background: rgba(30, 41, 59, 0.98);
    }
    @media (max-width: 768px) {
      .dev-demo-banner-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 8px 12px;
      }
      .dev-demo-banner-actions {
        width: 100%;
        justify-content: space-between;
      }
      .dev-demo-banner-text {
        font-size: 12px;
      }
    }
  `;

  function initBanner() {
    if (document.getElementById('dev-demo-banner-root')) return;
    document.head.appendChild(style);

    const bannerRoot = document.createElement('div');
    bannerRoot.id = 'dev-demo-banner-root';
    bannerRoot.innerHTML = `
      <div class="dev-demo-banner-bar" role="region" aria-label="Portfolio Demo Notice">
        <div class="dev-demo-banner-content">
          <span class="dev-demo-banner-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            DEMO ONLY
          </span>
          <div class="dev-demo-banner-text">
            <strong>Belongs to site developer:</strong> <a href="https://t.me/Slava_Dev_bot" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;text-decoration:underline;">@Slava_Dev_bot</a>. 
            All rights reserved — <em>do not copy</em>. This website is a functional prototype built strictly to demonstrate visual design, calculations, transitions, and animations (no real orders or backend data are processed).
          </div>
        </div>
        <div class="dev-demo-banner-actions">
          <a class="dev-demo-banner-btn-tg" href="https://t.me/Slava_Dev_bot" target="_blank" rel="noopener noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Contact Developer
          </a>
          <button class="dev-demo-banner-btn-close" id="dev-demo-banner-close-btn" title="Minimize notice" aria-label="Minimize notice">&times;</button>
        </div>
      </div>
    `;

    const pillRestore = document.createElement('div');
    pillRestore.id = 'dev-demo-pill-restore';
    pillRestore.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
      <span>Demo by @Slava_Dev_bot</span>
    `;

    document.body.prepend(bannerRoot);
    document.body.appendChild(pillRestore);

    const updateBodyPadding = () => {
      if (bannerRoot.style.display !== 'none') {
        const h = bannerRoot.offsetHeight;
        document.body.style.paddingTop = h + 'px';
      } else {
        document.body.style.paddingTop = '';
      }
    };

    updateBodyPadding();
    window.addEventListener('resize', updateBodyPadding);

    const closeBtn = document.getElementById('dev-demo-banner-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        bannerRoot.style.display = 'none';
        document.body.style.paddingTop = '';
        pillRestore.style.display = 'flex';
      });
    }

    pillRestore.addEventListener('click', () => {
      pillRestore.style.display = 'none';
      bannerRoot.style.display = '';
      updateBodyPadding();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
})();

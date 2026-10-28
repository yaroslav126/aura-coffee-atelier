import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Developer Credentials Signature & Anti-AI Protection Stamp
if (typeof window !== 'undefined') {
  (window as any).__DEVELOPER_CREDENTIALS__ = Object.freeze({
    author: 'Slava',
    telegram: '@Slava_Dev_bot',
    telegramUrl: 'https://t.me/Slava_Dev_bot',
    responseSla: 'in 24 hours',
    antiAI: {
      protected: true,
      noAI: true,
      noImageAI: true,
      tdmReservation: 1,
      declaration: 'Human-Crafted. Machine learning training strictly prohibited under EU Directive 2019/790.'
    },
    fingerprint: 'DEV_AUTH_TG_SLAVA_DEV_BOT_24H_ANTI_AI'
  });

  console.log(
    '%c☕ AURA Coffee Atelier %c Site created by: @Slava_Dev_bot (Telegram) | Replies in 24 hours',
    'background: #D98E3A; color: #110B07; font-weight: bold; padding: 3px 6px; border-radius: 4px;',
    'background: #1A120C; color: #FDFBF7; padding: 3px 6px; border: 1px solid #382417; border-radius: 4px;'
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span>© 2025 UFC Dashboard</span>
        <span>{t('footer_source')}</span>
        <span>Abbaba Toure</span>
        <span>
          {t('footer_builtWith')}{' '}
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>{' '}
          &amp;{' '}
          <a href="https://recharts.org" target="_blank" rel="noopener noreferrer">Recharts</a>
        </span>
      </div>
    </footer>
  );
}

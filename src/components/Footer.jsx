import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span>© 2025 UFC Dashboard</span>
        <span>Data source: UFC Official Rankings</span>
        <span>Abbaba Toure</span>
        <span>
          Built with <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a> &amp; <a href="https://recharts.org" target="_blank" rel="noopener noreferrer">Recharts</a>
        </span>
      </div>
    </footer>
  );
}

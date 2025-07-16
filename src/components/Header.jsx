import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Header({ lang, setLang }) {
  const { t } = useTranslation();
  return (
    <header>
      <h1>UFC Dashboard</h1>
      <div>
        <button
          className={lang==='en'?'active':''}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        |
        <button
          className={lang==='fr'?'active':''}
          onClick={() => setLang('fr')}
        >
          FR
        </button>
      </div>
    </header>
  );
}

// src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import { useTranslation } from 'react-i18next';

import Header from './components/Header';
import RankingChart from './components/RankingChart';
import RankingTable from './components/RankingTable';
import CompareSection from './components/CompareSection';
import Footer from './components/Footer';


import fightersData from './data/fighters.json';

export default function App() {
  const { i18n, t } = useTranslation();
  const [lang, setLang]         = useState('en');
  const [topN, setTopN]         = useState(10);
  const [fighter1, setFighter1] = useState('');
  const [fighter2, setFighter2] = useState('');

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div className="app-container">
      {/* Fixed header */}
      <Header lang={lang} setLang={setLang} />

      {/* Intro banner */}
      <section className="intro-banner card">
        <h2>{t('intro_title')}</h2>
        <p>{t('intro_text')}</p>
      </section>

      {/* Ranking section */}
      <section className="card">
        <div className="controls">
          <label htmlFor="top-select">{t('select_top')}:</label>
          <select
            id="top-select"
            value={topN}
            onChange={e => setTopN(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="chart-wrapper">
          <div className="chart-content">
            <RankingChart data={fightersData} topN={topN} />
          </div>
        </div>

                {/* Detailed stats table immediately under the chart */}
        <RankingTable topN={topN} />
      </section>
      

      {/* Compare section with two dropdowns */}
      <section className="card">
        <CompareSection
          data={fightersData.slice(0, topN)}
          fighter1={fighter1}
          fighter2={fighter2}
          setFighter1={setFighter1}
          setFighter2={setFighter2}
        />
      </section>
       {/* Global footer */}
+     <Footer />
    </div>
  );
}

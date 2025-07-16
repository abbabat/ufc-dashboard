// src/components/RankingTable.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './RankingTable.css';
import fightersData from '../data/fighters.json';

export default function RankingTable({ topN }) {
  const { t } = useTranslation();

  const slice = [...fightersData]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, topN);

  const fmtPct = (num, denom) =>
    denom > 0 ? `${((num / denom) * 100).toFixed(1)}%` : '–';

  return (
    <div className="table-container">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>{t('rank')}</th>
            <th>{t('fighter')}</th>
            <th>{t('wins')}</th>
            <th>{t('losses')}</th>
            <th>{t('total')}</th>
            <th>{t('win_pct')}</th>
            <th>{t('ko')}</th>
            <th>{t('ko_pct')}</th>
            <th>{t('sub')}</th>
            <th>{t('sub_pct')}</th>
          </tr>
        </thead>
        <tbody>
          {slice.map(f => {
            const total = f.wins + f.losses;
            return (
              <tr key={f.rank}>
                <td>{f.rank}</td>
                <td>{f.name}</td>
                <td>{f.wins}</td>
                <td>{f.losses}</td>
                <td>{total}</td>
                <td>{fmtPct(f.wins, total)}</td>
                <td>{f.ko}</td>
                <td>{fmtPct(f.ko, total)}</td>
                <td>{f.submissions}</td>
                <td>{fmtPct(f.submissions, total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

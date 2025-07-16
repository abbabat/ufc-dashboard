// src/components/RankingChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';

export default function RankingChart({ data, topN }) {
  const { t } = useTranslation();

  // Take the topN fighters, sorted by rank ascending
  const slice = [...data]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, topN);

  // For each fighter, compute an inverted bar length:
  // barValue = (topN + 1) - rank
  // so rank=1 => bar=topN, rank=topN => bar=1
  const chartData = slice.map(f => ({
    name: f.name,
    barValue: topN + 1 - f.rank,
    rank: f.rank
  }));

  // Generate ticks 1,2,...,topN
  const ticks = Array.from({ length: topN }, (_, i) => i + 1);

  // Height: 40px per bar
  const chartHeight = Math.max(300, chartData.length * 40);

  return (
    <div style={{ width: '100%', height: chartHeight + 60 }}>
      <h2 className="text-lg font-semibold">
        {t('title_ranking', { n: topN })}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 20, bottom: 20, left: 150 }}
          barCategoryGap="20%"
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="barValue"
            // Domain from 1 (worst) up to topN (best)
            domain={[1, topN]}
            ticks={ticks}
            allowDecimals={false}
            tickFormatter={v => `${v}`}
            label={{
              value: t('ranking_position'),
              position: 'bottom',
              offset: 0
            }}
          />

          <YAxis
            dataKey="name"
            type="category"
            width={150}
            tick={{ width: 140, style: { whiteSpace: 'normal' } }}
          />

          <Tooltip
            formatter={(value, name, entry) => {
              // show actual rank, not barValue
              const actualRank = topN + 1 - value;
              return [`#${actualRank}`, t('ranking')];
            }}
          />

          <Bar dataKey="barValue" fill="var(--accent)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

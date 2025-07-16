// src/components/CompareSection.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ScatterChart, Scatter, LabelList, ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';

export default function CompareSection({
  data, fighter1, fighter2, setFighter1, setFighter2
}) {
  const { t } = useTranslation();

  const f1 = data.find(f => f.name === fighter1);
  const f2 = data.find(f => f.name === fighter2);
  const isReady = f1 && f2;

  // Bar data as before
  const barData = isReady
    ? [
        { name: f1.name, [t('wins')]: f1.wins, [t('losses')]: f1.losses },
        { name: f2.name, [t('wins')]: f2.wins, [t('losses')]: f2.losses }
      ]
    : [];

  // Single scatter series with both points
  const scatterPoints = isReady
    ? [
        { name: f1.name, submissions: f1.submissions, ko: f1.ko },
        { name: f2.name, submissions: f2.submissions, ko: f2.ko }
      ]
    : [];

  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Dropdown selectors */}
      <div className="compare-sidebar">
        <h3>{t('select_fighters')}</h3>
        <div className="fighter-dropdowns">
          <div className="mb-4">
            <label className="block mb-1">{t('fighter')} 1:</label>
            <select
              value={fighter1}
              onChange={e => setFighter1(e.target.value)}
            >
              <option value="">{t('select_one')}</option>
              {data.map(f => (
                <option key={f.name} value={f.name}>
                  {`${f.rank}. ${f.name}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">{t('fighter')} 2:</label>
            <select
              value={fighter2}
              onChange={e => setFighter2(e.target.value)}
            >
              <option value="">{t('select_one')}</option>
              {data.map(f => (
                <option key={f.name} value={f.name}>
                  {`${f.rank}. ${f.name}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="md:ml-6 flex-1 space-y-6 p-4">
        {!isReady ? (
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <p>{t('select_two_dropdown')}</p>
          </div>
        ) : (
          <>
            {/* Bar Chart */}
            <div>
              <h3 className="font-semibold mb-2">{t('bar_title')}</h3>
              <BarChart
                width={600} height={300} data={barData}
                margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={t('wins')} fill="var(--accent)" />
                <Bar dataKey={t('losses')} fill="var(--accent-dark)" />
              </BarChart>
            </div>

            {/* Scatter Chart */}
            <div>
              <h3 className="font-semibold mb-2">{t('scatter_title')}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, left: 60, bottom: 60 }}>
                  <CartesianGrid />

                  <XAxis
                    type="number"
                    dataKey="submissions"
                    name={t('submissions')}
                    domain={[0, dMax => dMax + 5]}
                    label={{ value: t('submissions'), position: 'bottom', offset: 20 }}
                  />

                  <YAxis
                    type="number"
                    dataKey="ko"
                    name={t('ko')}
                    label={{ value: t('ko'), angle: -90, position: 'insideLeft', offset: 10 }}
                  />

                  {/* Custom Tooltip for single hovered point */}
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const point = payload[0].payload;
                        return (
                          <div style={{
                            background: '#fff',
                            border: '1px solid rgba(0,0,0,0.1)',
                            padding: '8px',
                            borderRadius: '4px'
                          }}>
                            <strong>{point.name}</strong>
                            <div>{t('ko')}: {point.ko}</div>
                            <div>{t('submissions')}: {point.submissions}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  <Legend />

                  {/* Single series for both points */}
                  <Scatter
                    name={t('compare_title')}
                    data={scatterPoints}
                    fill="var(--accent)"
                  >
                    <LabelList
                      dataKey="name"
                      position="right"
                      style={{ pointerEvents: 'all', cursor: 'pointer' }}
                    />
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

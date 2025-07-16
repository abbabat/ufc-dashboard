import React from 'react';

export default function FighterSelect({ fighters, selected, onChange }) {
  return (
    <select
      multiple
      value={selected}
      onChange={e => onChange(Array.from(e.target.selectedOptions).map(o => o.value))}
      className="border p-2"
    >
      {fighters.map(f => <option key={f.name} value={f.name}>{f.rank}. {f.name}</option>)}
    </select>
  );
}
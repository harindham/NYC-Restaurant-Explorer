// src/components/Filters.js

import React from "react";

const BORO_OPTIONS = ["Bronx", "Brooklyn", "Queens", "Manhattan"];

export default function Filters({ filters, setFilters, data }) {
  const cuisines = [...new Set(data.map((d) => d.cuisine_description))].filter(Boolean);

  const toggleBoro = (boro) => {
    const hasBoro = filters.boro.includes(boro);
    const nextBoros = hasBoro
      ? filters.boro.filter((item) => item !== boro)
      : [...filters.boro, boro];
    setFilters({ ...filters, boro: nextBoros });
  };

  return (
    <div className="filter-card">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Borough</label>
        <div className="boro-pills">
          {BORO_OPTIONS.map((boro) => (
            <button
              key={boro}
              className={`boro-pill ${filters.boro.includes(boro) ? "selected" : ""}`}
              onClick={() => toggleBoro(boro)}
              type="button"
            >
              {boro}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Cuisine</label>
        <select
          value={filters.cuisine}
          onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
        >
          <option value="">All Cuisines</option>
          {cuisines.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Inspection Grade</label>
        <select
          value={filters.grade}
          onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
        >
          <option value="">All Grades</option>
          <option value="A">Grade A (Best)</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C (Needs Improvement)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Minimum Inspection Score</label>
        <input
          type="number"
          placeholder="0–100"
          value={filters.minScore}
          onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
        />
      </div>
    </div>
  );
}
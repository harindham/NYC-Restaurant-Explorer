// src/components/Filters.js

import React from "react";

export default function Filters({ filters, setFilters, data }) {
  const cuisines = [...new Set(data.map((d) => d.cuisine_description))].filter(Boolean);

  return (
    <div className="filter-card">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Cuisine</label>
        <select
          value={filters.cuisine}
          onChange={(e) =>
            setFilters({ ...filters, cuisine: e.target.value })
          }
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
          onChange={(e) =>
            setFilters({ ...filters, grade: e.target.value })
          }
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
          onChange={(e) =>
            setFilters({ ...filters, minScore: e.target.value })
          }
        />
      </div>
    </div>
  );
}
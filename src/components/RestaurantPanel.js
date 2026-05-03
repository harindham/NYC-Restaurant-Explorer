// src/components/RestaurantPanel.js

import React from "react";

const GRADE_COLOR = {
  A: { bg: "#d1fae5", text: "#065f46", label: "Grade A" },
  B: { bg: "#fef3c7", text: "#92400e", label: "Grade B" },
  C: { bg: "#fee2e2", text: "#991b1b", label: "Grade C" },
};

function ScoreBar({ score }) {
  const val = Math.min(Math.max(Number(score) || 0, 0), 100);
  // Lower score = better in NYC inspections, so invert the fill color
  const pct = val;
  const color = val <= 13 ? "#10b981" : val <= 27 ? "#f59e0b" : "#ef4444";
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="score-bar-label">{val} pts</span>
    </div>
  );
}

export default function RestaurantPanel({ restaurant, onClose }) {
  if (!restaurant) return null;

  const r = restaurant;
  const grade = r.grade?.toUpperCase();
  const gradeStyle = GRADE_COLOR[grade] || { bg: "#f3f4f6", text: "#374151", label: `Grade ${grade || "N/A"}` };

  const fields = [
    { label: "Address", value: [r.building, r.street, r.zipcode].filter(Boolean).join(" ") || "N/A" },
    { label: "Borough", value: r.boro || "N/A" },
    { label: "Phone", value: r.phone ? r.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") : "N/A" },
    { label: "Cuisine", value: r.cuisine_description || "N/A" },
    { label: "Inspection Date", value: r.inspection_date ? new Date(r.inspection_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A" },
    { label: "Action", value: r.action || "N/A" },
    { label: "Violation", value: r.violation_description || "No violation on record" },
  ];

  return (
    <aside className="restaurant-panel">
      <button className="panel-close" onClick={onClose} aria-label="Close panel">
        ✕
      </button>

      <div className="panel-header">
        <span
          className="panel-grade-badge"
          style={{ background: gradeStyle.bg, color: gradeStyle.text }}
        >
          {gradeStyle.label}
        </span>
        <h2 className="panel-name">{r.dba || "Unknown Restaurant"}</h2>
        <p className="panel-cuisine">{r.cuisine_description || ""}</p>
      </div>

      <div className="panel-score-section">
        <p className="panel-section-label">Inspection Score <span className="panel-score-note">(lower is better)</span></p>
        <ScoreBar score={r.score} />
      </div>

      <div className="panel-details">
        {fields.map(({ label, value }) => (
          <div key={label} className="panel-field">
            <span className="panel-field-label">{label}</span>
            <span className="panel-field-value">{value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
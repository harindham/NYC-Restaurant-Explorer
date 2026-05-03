// src/components/MapView.js

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "../config";

mapboxgl.accessToken = MAPBOX_TOKEN;

const GRADE_COLOR = (grade) =>
  grade === "A" ? "#10b981" : grade === "B" ? "#f59e0b" : "#ef4444";

function buildMarkerEl(r, isSelected) {
  const color = GRADE_COLOR(r.grade);

  const el = document.createElement("div");
  el.className = "map-marker";
  el.style.display = "flex";
  el.style.flexDirection = "column";
  el.style.alignItems = "center";
  el.style.cursor = "pointer";
  el.style.transition = "transform 0.2s ease";
  el.style.transform = isSelected ? "scale(1.5)" : "scale(1)";

  // Label
  const label = document.createElement("div");
  label.innerText = r.dba || "Unknown";
  label.style.fontSize = "10px";
  label.style.background = isSelected ? color : "white";
  label.style.color = isSelected ? "white" : "#10233d";
  label.style.padding = "2px 6px";
  label.style.borderRadius = "4px";
  label.style.marginBottom = "2px";
  label.style.whiteSpace = "nowrap";
  label.style.boxShadow = isSelected
    ? `0 0 0 2px ${color}, 0 2px 8px rgba(0,0,0,0.25)`
    : "0 0 3px rgba(0,0,0,0.2)";
  label.style.fontWeight = isSelected ? "700" : "400";
  label.style.transition = "all 0.2s ease";

  // Pin circle
  const pin = document.createElement("div");
  pin.style.width = "14px";
  pin.style.height = "14px";
  pin.style.borderRadius = "50%";
  pin.style.backgroundColor = color;
  pin.style.border = isSelected ? "3px solid white" : "2px solid white";
  pin.style.boxShadow = isSelected
    ? `0 0 0 3px ${color}, 0 4px 12px rgba(0,0,0,0.35)`
    : "0 0 4px rgba(0,0,0,0.3)";
  pin.style.transition = "all 0.2s ease";

  // Triangle tip
  const tip = document.createElement("div");
  tip.style.width = "0";
  tip.style.height = "0";
  tip.style.borderLeft = "6px solid transparent";
  tip.style.borderRight = "6px solid transparent";
  tip.style.borderTop = `10px solid ${color}`;
  tip.style.marginTop = "-2px";

  el.appendChild(label);
  el.appendChild(pin);
  el.appendChild(tip);

  return el;
}

export default function MapView({ data, selectedRestaurant, onSelect }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRefs = useRef([]); // [{ marker, r, el }]

  // Init map once
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 11,
    });
  }, []);

  // Rebuild markers when data changes
  useEffect(() => {
    if (!map.current) return;

    markerRefs.current.forEach(({ marker }) => marker.remove());
    markerRefs.current = [];

    const selectedId = selectedRestaurant?.camis;

    data.forEach((r) => {
      const lat = parseFloat(r.latitude || r?.location?.latitude);
      const lng = parseFloat(r.longitude || r?.location?.longitude);

      if (
        isNaN(lat) || isNaN(lng) ||
        lat < 40 || lat > 41 ||
        lng < -75 || lng > -73
      ) return;

      const isSelected = r.camis === selectedId;
      const el = buildMarkerEl(r, isSelected);

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(r);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current);

      markerRefs.current.push({ marker, r, el });
    });
  }, [data, selectedRestaurant, onSelect]);

  // Fly to selected marker without rebuilding all markers
  useEffect(() => {
    if (!map.current || !selectedRestaurant) return;

    const lat = parseFloat(selectedRestaurant.latitude || selectedRestaurant?.location?.latitude);
    const lng = parseFloat(selectedRestaurant.longitude || selectedRestaurant?.location?.longitude);

    if (!isNaN(lat) && !isNaN(lng)) {
      map.current.flyTo({ center: [lng, lat], zoom: 14, duration: 800, offset: [0, -80] });
    }
  }, [selectedRestaurant]);

  return (
    <div
      className="map-canvas"
      ref={mapContainer}
      style={{ height: "600px", width: "100%", borderRadius: "10px" }}
    />
  );
}
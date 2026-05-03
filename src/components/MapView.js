// src/components/MapView.js

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "../config";

mapboxgl.accessToken = MAPBOX_TOKEN;

export default function MapView({ data }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 11,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markers.current.forEach((m) => m.remove());
    markers.current = [];

    data.forEach((r) => {
      const lat = r.latitude || r?.location?.latitude;
      const lng = r.longitude || r?.location?.longitude;

      if (!lat || !lng) return;

      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      if (
        isNaN(latitude) ||
        isNaN(longitude) ||
        latitude < 40 || latitude > 41 ||
        longitude < -75 || longitude > -73
      ) return;

      // 🎯 Create custom marker container
      const el = document.createElement("div");
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.alignItems = "center";
      el.style.cursor = "pointer";

      // 📍 Pointer (pin)
      const pin = document.createElement("div");
      pin.style.width = "12px";
      pin.style.height = "12px";
      pin.style.borderRadius = "50%";
      pin.style.backgroundColor =
        r.grade === "A"
          ? "green"
          : r.grade === "B"
          ? "orange"
          : "red";
      pin.style.border = "2px solid white";
      pin.style.boxShadow = "0 0 4px rgba(0,0,0,0.4)";

      // 🔽 Pointer tip (triangle)
      const tip = document.createElement("div");
      tip.style.width = "0";
      tip.style.height = "0";
      tip.style.borderLeft = "6px solid transparent";
      tip.style.borderRight = "6px solid transparent";
      tip.style.borderTop = `10px solid ${
        r.grade === "A"
          ? "green"
          : r.grade === "B"
          ? "orange"
          : "red"
      }`;
      tip.style.marginTop = "-2px";

      // 🏷 Label (restaurant name)
      const label = document.createElement("div");
      label.innerText = r.dba || "Unknown";
      label.style.fontSize = "10px";
      label.style.background = "white";
      label.style.padding = "2px 4px";
      label.style.borderRadius = "4px";
      label.style.marginBottom = "2px";
      label.style.whiteSpace = "nowrap";
      label.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";

      // Assemble marker
      el.appendChild(label);
      el.appendChild(pin);
      el.appendChild(tip);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <strong>${r.dba || "Unknown"}</strong><br/>
            Cuisine: ${r.cuisine_description || "N/A"}<br/>
            Grade: ${r.grade || "N/A"}<br/>
            Score: ${r.score || "N/A"}
          `)
        )
        .addTo(map.current);

      markers.current.push(marker);
    });
  }, [data]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "600px",
        width: "100%",
        borderRadius: "10px",
      }}
    />
  );
}
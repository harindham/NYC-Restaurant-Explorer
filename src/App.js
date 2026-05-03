// src/App.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import Filters from "./components/Filters";
import RestaurantPanel from "./components/RestaurantPanel";
import "./App.css";

const API_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    boro: ["Manhattan"],
    cuisine: "",
    grade: "",
    minScore: 0,
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(API_URL, { params: { $limit: 500 } });
    setRestaurants(res.data);
  };

  const filteredData = restaurants.filter((r) => {
    return (
      (!filters.boro.length || filters.boro.includes(r.boro)) &&
      (!filters.cuisine || r.cuisine_description === filters.cuisine) &&
      (!filters.grade || r.grade === filters.grade) &&
      (!filters.minScore || Number(r.score) >= filters.minScore)
    );
  });

  // Stable callback so MapView doesn't re-render on every keystroke
  const handleSelect = useCallback((r) => {
    setSelectedRestaurant((prev) => (prev?.camis === r.camis ? null : r));
  }, []);

  const handleClose = useCallback(() => {
    setSelectedRestaurant(null);
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-brand">
          <span className="header-kicker">NYC Open Data Visualization</span>
          <h1>NYC Restaurant Explorer</h1>
        </div>
        <p>Explore restaurant inspection results across New York City.</p>
      </header>

      <div className="content">
        <Filters filters={filters} setFilters={setFilters} data={restaurants} />

        <section className="map-panel">
          <div className="map-panel-header">
            <div>
              <h2>Restaurant Map</h2>
              <p>{filteredData.length} locations match your current filters.</p>
            </div>
          </div>

          <div className={`map-and-detail ${selectedRestaurant ? "has-selection" : ""}`}>
            <MapView
              data={filteredData}
              selectedRestaurant={selectedRestaurant}
              onSelect={handleSelect}
            />
            <RestaurantPanel
              restaurant={selectedRestaurant}
              onClose={handleClose}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import Filters from "./components/Filters";
import "./App.css";

const API_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    cuisine: "",
    grade: "",
    minScore: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(API_URL, {
      params: { $limit: 500 },
    });
    setRestaurants(res.data);
  };

  const filteredData = restaurants.filter((r) => {
    return (
      (!filters.cuisine || r.cuisine_description === filters.cuisine) &&
      (!filters.grade || r.grade === filters.grade) &&
      (!filters.minScore || Number(r.score) >= filters.minScore)
    );
  });

  return (
  <div className="app-container">
    <header className="header">
      <h1>NYC Restaurant Health Explorer</h1>
      <p>
        Explore restaurant inspection results across New York City.
        Filter by cuisine, grade, and inspection severity.
      </p>
    </header>

    <div className="content">
      <Filters
        filters={filters}
        setFilters={setFilters}
        data={restaurants}
      />

      <MapView data={filteredData} />
    </div>
  </div>
);
}
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import CountryDetail from "./pages/CountryDetail";
import NarBar from "./components/NarBar";
import { fetchAllCountries } from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setAllCountries(data);
        setFilteredCountries(data);
        setIsFiltering(false);
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  const filterBySearch = (value) => {
    const searchValue = value.trim().toLowerCase();
    if (searchValue === "") {
      setFilteredCountries(allCountries);
      setIsFiltering(false);
      return;
    }
    const result = allCountries.filter((c) =>
      c.name.common.toLowerCase().includes(searchValue)
    );
    setFilteredCountries(result);
    setIsFiltering(true);
  };

  const filterByRegion = (region) => {
    const selected = region.trim();
    if (!selected) {
      setFilteredCountries(allCountries);
      setIsFiltering(false);
      return;
    }
    const result = allCountries.filter((c) => c.region === selected);
    setFilteredCountries(result);
    setIsFiltering(true);
  };

  return (
    <BrowserRouter>
      <header>
        <NarBar />
      </header>
      <main id="main-content" role="main" tabIndex="-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                allCountries={filteredCountries}
                filterBySearch={filterBySearch}
                filterByRegion={filterByRegion}
                loading={loading}
                isFiltering={isFiltering}
              />
            }
          />
          <Route path="/:countryName" element={<CountryDetail />} />
        </Routes>
      </main>
      <footer className="text-center py-4 mt-5 small custom-text-color bg-elements">
        <p className="mb-0">
          © {new Date().getFullYear()} Cosmas Onyekwelu. All rights reserved.
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;

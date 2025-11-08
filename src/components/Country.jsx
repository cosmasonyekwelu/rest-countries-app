import React from "react";
import { Link } from "react-router-dom";

const Country = ({ allCountries }) => {
  if (!allCountries || !Array.isArray(allCountries)) return null;

  return (
    <>
      {allCountries.map((country) => (
        <Link
          to={`/${country.name.common}`}
          className="text-decoration-none text-dark country-card"
          key={country.cca3 || country.name.common}
        >
          <div className="shadow rounded-2 bg-elements custom-text-color h-100">
            <img
              className="rounded-top-2 w-100 country-flag"
              src={country.flags?.png}
              alt={country.name?.common}
              style={{ height: "160px", objectFit: "cover" }}
            />
            <div className="text-start p-4">
              <h3 className="mb-3 fs-5 fw-bold">{country.name.common}</h3>
              <p className="mb-1">
                <b>Population:</b> {country.population.toLocaleString()}
              </p>
              <p className="mb-1">
                <b>Region:</b> {country.region}
              </p>
              <p className="mb-0">
                <b>Capital:</b> {country.capital || "N/A"}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Country;
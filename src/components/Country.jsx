import React from "react";
import { Link } from "react-router-dom";

const Country = ({ allCountries }) => {
  if (!allCountries || !Array.isArray(allCountries)) return null;

  return (
    <div className="all-countries p-5">
      {allCountries.map((country) => (
        <Link
          to={`/${country.name.common}`}
          className="text-decoration-none text-dark"
          key={country.cca3 || country.name.common}
        >
          <div className="shadow rounded-2 bg-elements custom-text-color">
            <img
              className="rounded-top-2 w-100"
              src={country.flags?.png}
              alt={country.name?.common}
            />
            <div className="text-start p-5">
              <h3 className="mb-3">{country.name.common}</h3>
              <p className="mb-1">
                <b>Population:</b> {country.population.toLocaleString()}
              </p>
              <p className="mb-1">
                <b>Region:</b> {country.region}
              </p>
              <p className="mb-1">
                <b>Capital:</b> {country.capital}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Country;

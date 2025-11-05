import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCountryByName, fetchAllCountries } from "../services/api";
import { Spinner } from "react-bootstrap";

const CountryDetail = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [c, all] = await Promise.all([
          fetchCountryByName(countryName),
          fetchAllCountries(),
        ]);
        setCountry(c);
        setAllCountries(all);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [countryName]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );

  if (!country) return <p className="text-center mt-5 fs-5">Country not found.</p>;

  const nativeName = country.name?.nativeName
    ? Object.values(country.name.nativeName)[0].official
    : "No native name";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "—";

  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => c.name).join(", ")
    : "—";

  const borderCountries =
    country.borders?.map((code) => allCountries.find((c) => c.cca3 === code)).filter(Boolean) || [];

  return (
    <div className="text-start p-5 route-fade">
      <button
        className="shadow d-inline-flex gap-3 align-items-center px-4 py-2 rounded-2 mb-5 back-btn bg-elements custom-text-color border-0"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>

      <div className="imgcondiv d-flex flex-column flex-md-row gap-5 align-items-start">
        <img
          className="cdimg me-md-5 rounded shadow-sm"
          src={country.flags?.png || country.flags?.svg}
          alt={`${country.name?.common} flag`}
          loading="lazy"
        />

        <div className="eachcountry ms-md-5 d-flex flex-column gap-4 custom-text-color">
          <h2 className="fw-800">{country.name?.common}</h2>

          <div className="cnames d-flex flex-column flex-md-row align-items-start gap-5">
            <div>
              <p className="mb-1"><b>Native Name:</b> {nativeName}</p>
              <p className="mb-1"><b>Population:</b> {country.population?.toLocaleString()}</p>
              <p className="mb-1"><b>Region:</b> {country.region}</p>
              <p className="mb-1"><b>Sub Region:</b> {country.subregion || "—"}</p>
              <p className="mb-1"><b>Capital:</b> {country.capital?.join(", ") || "—"}</p>
            </div>

            <div>
              <p className="mb-1"><b>Top Level Domain:</b> {country.tld?.join(", ") || "—"}</p>
              <p className="mb-1"><b>Currencies:</b> {currencies}</p>
              <p className="mb-1"><b>Languages:</b> {languages}</p>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-3">
            <p className="mb-0"><b>Border Countries:</b></p>
            <div className="borders d-flex flex-wrap gap-2" role="list">
              {borderCountries.length > 0 ? (
                borderCountries.map((b) => (
                  <Link
                    role="listitem"
                    key={b.cca3}
                    to={`/${b.name.common}`}
                    className="chip bg-elements shadow text-decoration-none"
                    aria-label={`View details for ${b.name.common}`}
                  >
                    {b.name.common}
                  </Link>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;

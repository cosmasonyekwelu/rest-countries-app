import React, { useState } from "react";
import { Container, Spinner, Pagination } from "react-bootstrap";
import Country from "../components/Country";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";

const HomePage = ({ allCountries, filterBySearch, filterByRegion, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 20;

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  const totalCountries = allCountries?.length || 0;
  const totalPages = Math.ceil(totalCountries / countriesPerPage);

  const startIndex = (currentPage - 1) * countriesPerPage;
  const currentCountries = allCountries.slice(
    startIndex,
    startIndex + countriesPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="mt-4">
      {/* Keep the filter row */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 px-4 px-md-5 gap-3">
        <div className="w-100" style={{ maxWidth: "480px" }}>
          <Search filterBySearch={filterBySearch} />
        </div>
        <div className="w-100" style={{ maxWidth: "200px" }}>
          <Dropdown filterByRegion={filterByRegion} />
        </div>
      </div>

      {/* Replace Row/Col with your custom grid */}
      <div className="all-countries px-4 px-md-5">
        {Array.isArray(currentCountries) && currentCountries.length > 0 ? (
          currentCountries.map((country, index) => (
            <Country
              key={country.cca3 || country.name?.common || index}
              allCountries={[country]}
            />
          ))
        ) : (
          <div className="text-center mt-5 w-100">
            <h5 className="fw-semibold custom-text-color">No countries found</h5>
            <p className="text-muted">
              Try a different search term or clear your filters.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
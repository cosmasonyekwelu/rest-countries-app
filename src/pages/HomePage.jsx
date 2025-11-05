import React, { useState } from "react";
import { Container, Row, Col, Spinner, Pagination } from "react-bootstrap";
import Country from "../components/Country";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";

const HomePage = ({ allCountries, filterBySearch, filterByRegion, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 24;

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
      <Row className="mb-4 px-4 px-md-5">
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <Search filterBySearch={filterBySearch} />
        </Col>
        <Col xs={12} md={3} className="ms-md-auto">
          <Dropdown filterByRegion={filterByRegion} />
        </Col>
      </Row>

      <Row className="px-4 px-md-5">
        {Array.isArray(currentCountries) && currentCountries.length > 0 ? (
          currentCountries.map((country, index) => (
            <Col
              key={country.cca3 || country.name?.common || index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4 d-flex"
            >
              <Country allCountries={[country]} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center mt-5">
            <h5 className="fw-semibold custom-text-color">No countries found</h5>
            <p className="text-muted">
              Try a different search term or clear your filters.
            </p>
          </Col>
        )}
      </Row>

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

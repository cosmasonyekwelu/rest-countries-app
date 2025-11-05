import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { BsMoon, BsMoonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const NarBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("dark-mode")) || false;
  });

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleMode = () => setDarkMode((prev) => !prev);

  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-3 bg-elements custom-text-color"
      sticky="top"
      role="banner"
    >
      <Container className="d-flex justify-content-between align-items-center">
        <h1 className="fs-4 fw-bold mb-0">
          <Navbar.Brand as={Link} to="/" className="custom-text-color text-decoration-none">
            Where in the world?
          </Navbar.Brand>
        </h1>

        <button
          type="button"
          onClick={toggleMode}
          className="btn btn-link text-decoration-none d-flex align-items-center gap-2 custom-text-color"
          aria-label={`Activate ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? <BsMoonFill /> : <BsMoon />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </Container>
    </Navbar>
  );
};

export default NarBar;

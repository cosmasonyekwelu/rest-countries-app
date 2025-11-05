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

    if (darkMode) {
      body.removeAttribute("data-bs-theme");
      body.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("dark-mode", JSON.stringify(true));
    } else {
      body.removeAttribute("data-bs-theme");
      body.setAttribute("data-bs-theme", "light");
      localStorage.setItem("dark-mode", JSON.stringify(false));
    }
  }, [darkMode]);

  const toggleMode = () => setDarkMode((prev) => !prev);

  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-3 bg-elements custom-text-color"
      sticky="top"
    >
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-5">
          Where in the world?
        </Navbar.Brand>

        <div
          onClick={toggleMode}
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
        >
          {darkMode ? <BsMoonFill /> : <BsMoon />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </div>
      </Container>
    </Navbar>
  );
};

export default NarBar;

import { Form } from "react-bootstrap";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function Search({ filterBySearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);
    filterBySearch(value);
  };

  return (
    <div
      className="position-relative shadow-sm rounded-2 bg-elements"
      style={{ maxWidth: "380px", width: "100%" }}
    >
      <BsSearch
        className="position-absolute top-50 translate-middle-y ms-3 custom-text-color"
        aria-hidden="true"
      />
      <Form.Label htmlFor="country-search" className="visually-hidden">
        Search for a country
      </Form.Label>
      <Form.Control
        id="country-search"
        type="search"
        placeholder="Search for a country..."
        value={input}
        onChange={handleChange}
        className="ps-5 py-3 border-0 bg-elements custom-text-color"
        style={{
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "none",
          borderRadius: "0.5rem",
        }}
      />
    </div>
  );
}

export default Search;

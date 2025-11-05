import { Form } from "react-bootstrap";

function DropdownMenu({ filterByRegion }) {
  const handleSelect = (e) => {
    filterByRegion(e.target.value);
  };

  return (
    <Form.Group controlId="regionFilter">
      <Form.Label className="visually-hidden">
        Filter countries by region
      </Form.Label>
      <Form.Select
        aria-label="Filter countries by region"
        onChange={handleSelect}
        defaultValue=""
        className="shadow-sm"
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </Form.Select>
    </Form.Group>
  );
}

export default DropdownMenu;

import { Form } from "react-bootstrap";

function DropdownMenu({ filterByRegion }) {
  const handleSelect = (e) => {
    filterByRegion(e.target.value);
  };

  return (
    <Form.Select onChange={handleSelect} defaultValue="">
      <option value="">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </Form.Select>
  );
}

export default DropdownMenu;

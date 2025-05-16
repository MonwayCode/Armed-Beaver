import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function NavScroll() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; id: string }[]>([]);
  const [allTanks, setAllTanks] = useState<{ name: string; id: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5114/tanks")
      .then((res) => {
        const tanks = res.data?.$values || res.data || [];
        const simplified = tanks.map((tank: any) => ({
          name: tank.name,
          id: tank.tankId,
        }));
        setAllTanks(simplified);
      })
      .catch((err) => console.error("Błąd ładowania czołgów:", err));
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length === 0) {
      setSuggestions([]);
    } else {
      const filtered = allTanks.filter((tank) =>
        tank.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const handleSelect = (id: string) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/tank/${id}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0].id);
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Armed Beaver</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Strona Główna</Nav.Link>
            <NavDropdown title="Kraj" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/country/usa">USA</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/country/germany">Niemcy</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/country/zsrr">ZSRR/Rosja</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/country/uk">Wielka Brytania</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/country/china">Chiny</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Typ" id="navbarScrollingDropdownType">
              <NavDropdown.Item href="/type/light">Czołgi Lekkie</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/type/medium">Czołgi Średnie</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/type/heavy">Czołgi Ciężkie</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/type/tk">Niszczyciele Czołgów</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/type/aa">Maszyny Przeciwlotnicze</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/compare">Porównywarka</Nav.Link>
          </Nav>

          <Form className="d-flex position-relative" onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
            <Form.Control
              type="search"
              placeholder="Szukaj..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleChange}
              autoComplete="off"
            />
            <Button variant="outline-warning" type="submit">
              Szukaj
            </Button>

            {suggestions.length > 0 && (
              <ul
                className="list-group position-absolute"
                style={{
                  top: "100%",
                  zIndex: 1000,
                  width: "100%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  backgroundColor: "white",
                }}
              >
                {suggestions.map((tank, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(tank.id)}
                  >
                    {tank.name}
                  </li>
                ))}
              </ul>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;

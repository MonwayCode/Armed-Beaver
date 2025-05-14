import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScroll() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/">Armed Beaver</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
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
              <NavDropdown.Item href='/country/uk'>Wielka Brytania</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/country/china'>Chiny</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Typ" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/type/light">Czołgi Lekkie</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/type/medium">Czołgi Średnie</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/type/heavy">Czołgi Ciężkie</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/type/tk'>Niszczyciele Czołgów</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/type/aa'>Maszyny Przeciwlotnicze</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="/amunicja">Amunicja</Nav.Link>
            <Nav.Link href="/porownywarka">Porównywarka</Nav.Link>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Szukaj..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Szukaj</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavScroll() 
{
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
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
              <NavDropdown.Item href="/USA">USA</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href="/Niemcy">Niemcy</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href="/ZSRR">ZSRR/Rosja</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href='/UK'>Wielka Brytania</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href='/Chiny'>Chiny</NavDropdown.Item>

            </NavDropdown>

            <NavDropdown title="Typ" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/lekkie">Czołgi Lekkie</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href="/srednie">Czołgi Średnie</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href="/ciezkie">Czołgi Ciężkie</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href='/nieszczyciele'>Nieszczyciele Czołgów</NavDropdown.Item>
              <NavDropdown.Divider/>

              <NavDropdown.Item href='/przeciwlotnicze'>Maszyny Przeciwlotnicze</NavDropdown.Item>

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
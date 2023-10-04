import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { Badge, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/esm/Stack";

function ENavbar() {
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Fashion Fusion</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <a className="btn btn-light" href="/cart">
            <FiShoppingCart />
            &nbsp;
            <Badge bg="secondary">0</Badge>
          </a>
          <a className="btn btn-light" href="/login">
            <FiLogIn />
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ENavbar;

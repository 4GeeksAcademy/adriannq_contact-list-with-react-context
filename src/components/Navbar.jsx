import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router";

export function Navbar1() {
  let navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "default" }}
          >
            Home
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

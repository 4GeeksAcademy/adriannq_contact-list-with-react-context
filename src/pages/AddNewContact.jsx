import { Container, Button, Form } from "react-bootstrap";

import { useNavigate, useParams } from "react-router";

import { useState } from "react";

export function AddNewContact() {
  const [inputNametValue, setNameInputValue] = useState("");
  const [inputEmailValue, setEmailInputValue] = useState("");
  const [inputPhoneValue, setPhoneInputValue] = useState("");
  const [inputAddressValue, setAddressInputValue] = useState("");

  let navigate = useNavigate();

  let { slug } = useParams();

  const addContact = (inputName, inputPhone, inputEmail, inputAddress) => {
    fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
      method: "POST",
      body: JSON.stringify({
        name: inputName || "No data",
        phone: inputPhone || "No data",
        email: inputEmail || "No data",
        address: inputAddress || "No data",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setNameInputValue("");
      setEmailInputValue("");
      setPhoneInputValue("");
      setAddressInputValue("");
    });
  };

  return (
    <Container className="mt-3">
      <h1>Add a new contact</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={inputNametValue}
            onChange={(e) => setNameInputValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={inputEmailValue}
            onChange={(e) => setEmailInputValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone"
            value={inputPhoneValue}
            onChange={(e) => setPhoneInputValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Adress</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={inputAddressValue}
            onChange={(e) => setAddressInputValue(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            addContact(
              inputNametValue,
              inputEmailValue,
              inputPhoneValue,
              inputAddressValue,
            );
            navigate(`/${slug}/contactlist/`);
          }}
        >
          Save
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          type="submit"
          onClick={() => {
            navigate(`/${slug}/contactlist/`);
          }}
        >
          Return
        </Button>
      </Form>
    </Container>
  );
}

import { useEffect, useState } from "react";

import {
  ListGroup,
  Container,
  Button,
  Image,
  Card,
  Modal,
  Form,
} from "react-bootstrap";

import { useParams } from "react-router";
import { NavLink } from "react-router";

export const ContactList = () => {
  const [inputNameValue, setNameInputValue] = useState("");
  const [inputEmailValue, setEmailInputValue] = useState("");
  const [inputPhoneValue, setPhoneInputValue] = useState("");
  const [inputAddressValue, setAddressInputValue] = useState("");
  const [contactList, setContactList] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  let { slug } = useParams();

  const getContactsFromAPI = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setContactList(response.contacts);
      });
  };

  const editContacts = (contactId) => {
    fetch(
      `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: inputNameValue || "No data",
          phone: inputPhoneValue || "No data",
          email: inputEmailValue || "No data",
          address: inputAddressValue || "No data",
        }),
        headers: { "Content-Type": "application/json" },
      },
    ).then(() => {
      getContactsFromAPI();
      handleClose();
    });
  };

  const deleteContact = (id) => {
    fetch(
      `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`,
      {
        method: "DELETE",
      },
    ).then(() => getContactsFromAPI());
  };

  const handleShow = (contact) => {
    setSelectedContact(contact);
    setNameInputValue(contact.name);
    setEmailInputValue(contact.email);
    setPhoneInputValue(contact.phone);
    setAddressInputValue(contact.address);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedContact(null);
    setNameInputValue("");
    setEmailInputValue("");
    setPhoneInputValue("");
    setAddressInputValue("");
  };

  useEffect(() => {
    getContactsFromAPI();
  }, []);

  return (
    <>
      <Container className="d-flex justify-content-between align-items-center mt-3">
        <h1>Contact List</h1>
        <Button variant="success">
          <NavLink
            to={`/${slug}/addcontactlist`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Add New Contact
          </NavLink>
        </Button>
      </Container>
      <ListGroup>
        {contactList.length > 0 ? (
          contactList.map((contact) => (
            <ListGroup.Item
              key={contact.id}
              className="d-flex justify-content-between align-items-start"
              onMouseOver={() => setHoveredItem(contact.id)}
              onMouseOut={() => setHoveredItem(null)}
            >
              <Image src="https://placehold.co/200" rounded />
              <Card.Body className="m-3">
                <h3>{contact.name}</h3>
                <Card.Text>☎︎ {contact.phone}</Card.Text>
                <Card.Text>✉︎ {contact.email}</Card.Text>
                <Card.Text>📍 {contact.address}</Card.Text>
              </Card.Body>
              {hoveredItem === contact.id && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleShow(contact)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="ms-2"
                    variant="danger"
                    size="sm"
                    onClick={() => deleteContact(contact.id)}
                  >
                    X
                  </Button>
                </>
              )}
            </ListGroup.Item>
          ))
        ) : (
          <h2 className="mt-3">No contacts found</h2>
        )}
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={inputNameValue}
                onChange={(e) => setNameInputValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={inputEmailValue}
                onChange={(e) => setEmailInputValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={inputPhoneValue}
                onChange={(e) => setPhoneInputValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={inputAddressValue}
                onChange={(e) => setAddressInputValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => editContacts(selectedContact.id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

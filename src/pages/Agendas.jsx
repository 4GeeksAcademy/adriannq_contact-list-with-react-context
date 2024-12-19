import { ListGroup, ListGroupItem, Button, Container } from "react-bootstrap";

import { useEffect, useState } from "react";

import { NavLink } from "react-router";

export const Agendas = () => {
  const [agendasList, setAgendasList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  const getAgendasFromAPI = () => {
    fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setAgendasList(response.agendas);
      });
  };
  useEffect(() => {
    getAgendasFromAPI();
  }, []);
  const addNewAgenda = (agenda) => {
    fetch(`https://playground.4geeks.com/contact/agendas/${agenda}`, {
      method: "POST",
      body: JSON.stringify({
        slug: agenda,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      getAgendasFromAPI();
      setInputValue("");
    });
  };
  const deleteAgenda = (slug) => {
    fetch(
      `https://playground.4geeks.com/contact/agendas/${slug}?tags=Agenda%20operations&summary=Delete%20Agenda.&description=Deletes%20a%20specific%20agenda%20from%20the%20database.`,
      {
        method: "DELETE",
      },
    ).then(() => {
      getAgendasFromAPI();
    });
  };

  return (
    <>
      <Container className="d-flex">
        <h1>Agendas</h1>
        <div className="d-flex align-items-center ms-3">
          <input
            placeholder="Add new agenda"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNewAgenda(inputValue);
              }
            }}
          />
        </div>
      </Container>
      <ListGroup>
        <ListGroupItem>
          {agendasList.map((agendas) => {
            return (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
                onMouseOver={() => setHoveredItem(agendas)}
                onMouseOut={() => setHoveredItem(null)}
              >
                <div className="ms-2 me-auto">{agendas.slug}</div>
                {hoveredItem === agendas ? (
                  <>
                    <Button className="me-2" variant="info" size="sm" pill>
                      <NavLink
                        style={{ color: "white", textDecoration: "none" }}
                        to={`/${agendas.slug}/contactlist`}
                      >
                        Check contacts
                      </NavLink>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      pill
                      onClick={() => deleteAgenda(agendas.slug)}
                    >
                      X
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </ListGroup.Item>
            );
          })}
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

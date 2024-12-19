import { AddNewContact } from "../pages/AddNewContact";
import { Agendas } from "../pages/Agendas";
import { ContactList } from "../pages/ContactList";

export const routeConfig = [
  {
    name: "Agendas",
    path: "/",
    page: <Agendas />,
  },
  {
    name: "ContactList",
    path: `/:slug/contactlist/`,
    page: <ContactList />,
  },
  {
    name: "AddContactList",
    path: ":slug/addcontactlist",
    page: <AddNewContact />,
  },
];

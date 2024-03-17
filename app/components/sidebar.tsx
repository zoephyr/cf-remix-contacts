import { Form, NavLink, SubmitFunction } from "@remix-run/react";
import { ContactRecord } from "~/lib/fakeData";
interface SidebarProps {
  contacts: ContactRecord[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  submit: SubmitFunction;
}

export default function Sidebar(props: SidebarProps) {
  return (
    <div id="sidebar">
      <h1>Remix Contacts</h1>
      <div>
        <Form
          id="search-form"
          role="search"
          onChange={(event) => {
            props.submit(event.currentTarget);
          }}
        >
          <input
            defaultValue={props.query || ""}
            aria-label="Search contacts"
            id="q"
            name="q"
            placeholder="Search"
            type="search"
            onChange={(event) => {
              props.setQuery(event.currentTarget.value);
            }}
            value={props.query}
          />
          <div aria-hidden hidden={true} id="search-spinner" />
        </Form>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <nav>
        {props.contacts.length ? (
          <ul>
            {props.contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                  to={`contacts/${contact.id}`}
                >
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{" "}
                  {contact.favorite ? <span>★</span> : null}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
    </div>
  );
}

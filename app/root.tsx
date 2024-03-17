import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, redirect } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import "./app.css";
import Sidebar from "./components/sidebar";
// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

import { createEmptyContact, getContacts } from "./lib/fakeData";

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const [query, setQuery] = useState(q || "");

  useEffect(() => {
    setQuery(q || "");
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Sidebar
          contacts={contacts}
          query={query}
          setQuery={setQuery}
          submit={submit}
          searching = {searching as boolean}
        />
        <div
          className={navigation.state === "loading" && !searching ? "loading" : ""}
          id="detail"
        >
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

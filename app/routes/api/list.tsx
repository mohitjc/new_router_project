// app/routes/api.users.ts
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  // Example data (you can fetch from DB here)
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  return Response.json(users); // returns JSON API response
}

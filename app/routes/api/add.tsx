// app/routes/api.users.ts
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json(); // read POST body
  // Example: pretend to save user
  const newUser = { id: Date.now(), ...data };
  return Response.json({ success: true, user: newUser });
}
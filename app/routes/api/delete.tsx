// app/routes/api.users.$id.ts
import type { ActionFunctionArgs } from "react-router";

export async function action({ params, request }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    return Response.json({ deleted: params.id });
  }
}

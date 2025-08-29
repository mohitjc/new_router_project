import { redirect, useLoaderData, type LoaderFunctionArgs } from "react-router"; 
import type { Route } from "./+types/protected";

// loader function
export async function loader({ request }: LoaderFunctionArgs) {
  let user:any = {name:'text name'};
  if (!user) {
    return redirect("/login");
  }
  return { userName: user?.name };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "protected" },
    { name: "description", content: "protected" },
  ];
}

// component for this route
export default function ProtectedPage() {
  let data = useLoaderData() as { userName: string };
  return <h1>Welcome {data.userName}</h1>;
}

import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "login" },
    { name: "description", content: "login" },
  ];
}

export default function Login() {
  return <>login</>;
}

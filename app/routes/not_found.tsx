import type { Route } from "./+types/not_found";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NotFound" },
    { name: "description", content: "NotFound" },
  ];
}

export default function NotFound() {
  return <>NotFound</>;
}

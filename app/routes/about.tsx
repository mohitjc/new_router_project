import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "About" },
  ];
}

export default function About() {
  return <>about</>;
}

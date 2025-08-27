import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "about" },
    { name: "description", content: "about" },
  ];
}

export default function About() {
  return <>about</>;
}

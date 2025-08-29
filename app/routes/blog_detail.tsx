// app/routes/blog.$slug.tsx
import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/blog_detail";

// Mock blog fetch
async function getBlog(slug: string) {
  return {
    title: `Blog Post: ${slug}`,
    description: `This is the blog detail for ${slug}.`,
  };
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug!;
  const blog = await getBlog(slug);

  return blog; // { title, description }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Blog Not Found" }];
  }

  return [
    { title: data.title },
    { name: "description", content: data.description },
  ];
}

export default function BlogDetail({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
  return (
    <div>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.description}</p>
    </div>
  );
}

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Layout (wrapper)
    route("", "routes/layout.tsx", [
        index("routes/home.tsx", {
        }),
        route("aboutus", "routes/about.tsx", {}),
        route("staff", "routes/staff/index.tsx", {}),
        route("staff/add", "routes/staff/add.tsx", {}),
        route("blog/:slug", "routes/blog_detail.tsx", {}),
    ]),
    
    // Auth Layout (wrapper)
    route("", "routes/auth.tsx", [
        route("login", "routes/login.tsx", {}),
        route("forgot", "routes/forgot.tsx", {}),
        route("reset", "routes/reset.tsx", {}),
    ]),
    route("protected", "routes/protected.tsx", {}),

    // API
    route("list", "routes/api/list.tsx", {}),
    route("add", "routes/api/add.tsx", {}),
    route("delete", "routes/api/delete.tsx", {}),
    // Not found Page
    route("*", "routes/not_found.tsx", {}),
] satisfies RouteConfig;

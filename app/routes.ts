import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx", {
    }),
    route("aboutus", "routes/about.tsx", {
    }),
    // Auth Layout (wrapper)
    route("auth", "routes/auth.tsx", [
        route("login", "routes/login.tsx", {
        }),
    ]),
    route("*", "routes/not_found.tsx", {
    }),
] satisfies RouteConfig;

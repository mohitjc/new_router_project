import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Layout (wrapper)
    route("", "routes/layout.tsx", [
        index("routes/home.tsx", {
        }),
        route("aboutus", "routes/about.tsx", {}),
    ]),
    
    route("", "routes/auth.tsx", [
        route("login", "routes/login.tsx", {
        }),
    ]),
     route("protected", "routes/protected.tsx", {
        }),
    route("*", "routes/not_found.tsx", {
    }),
] satisfies RouteConfig;

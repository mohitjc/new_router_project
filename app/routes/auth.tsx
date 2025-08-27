import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <h1>Auth Area</h1>
      {/* This renders the child route (login, register, etc.) */}
      <Outlet />
    </div>
  );
}

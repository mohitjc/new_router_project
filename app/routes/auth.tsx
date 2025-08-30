import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import type { RootState } from "~/redux/store";

export default function AuthLayout() {
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user])

  if (user) {
    return <></>
  }

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}

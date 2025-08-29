import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";
import type { RootState } from "~/redux/store";

export default function Layout() {
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user])

  return (
    <>
      <div className="bg-gray-100">
        <div className="flex h-screen">
          <Sidebar user={user}/>
          <div className="flex-1 flex flex-col overflow-hidden">
           <Header user={user}/>
            <main className="flex-1 overflow-y-auto p-5 bg-gray-100">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

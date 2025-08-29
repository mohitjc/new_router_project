import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <i className="fas fa-users text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">12,458</h3>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm"><i className="fas fa-arrow-up"></i> 12.5%</span>
            <span className="text-gray-500 text-sm">since last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <i className="fas fa-shopping-cart text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold">$58,258</h3>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm"><i className="fas fa-arrow-up"></i> 8.2%</span>
            <span className="text-gray-500 text-sm">since last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <i className="fas fa-chart-line text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Conversion Rate</p>
              <h3 className="text-2xl font-bold">4.25%</h3>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-500 text-sm"><i className="fas fa-arrow-down"></i> 1.3%</span>
            <span className="text-gray-500 text-sm">since last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <i className="fas fa-archive text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Inventory</p>
              <h3 className="text-2xl font-bold">7,548</h3>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm"><i className="fas fa-arrow-up"></i> 3.9%</span>
            <span className="text-gray-500 text-sm">since last month</span>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full">
                <i className="fas fa-user-plus text-blue-600"></i>
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">New user registered</p>
                <p className="text-gray-500 text-sm">John Doe joined yesterday</p>
              </div>
              <span className="ml-auto text-gray-500 text-sm">2h ago</span>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full">
                <i className="fas fa-dollar-sign text-green-600"></i>
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">New sale</p>
                <p className="text-gray-500 text-sm">Order #4589 was completed</p>
              </div>
              <span className="ml-auto text-gray-500 text-sm">5h ago</span>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full">
                <i className="fas fa-comment text-purple-600"></i>
              </div>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">New comment</p>
                <p className="text-gray-500 text-sm">Sarah commented on post #125</p>
              </div>
              <span className="ml-auto text-gray-500 text-sm">1d ago</span>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-2">User</th>
                  <th className="pb-2">Joined</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full object-cover mr-2" src="https://randomuser.me/api/portraits/women/2.jpg" alt="" />
                      <span>Sarah Johnson</span>
                    </div>
                  </td>
                  <td className="py-3">Apr 20, 2023</td>
                  <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                </tr>
                <tr>
                  <td className="py-3">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full object-cover mr-2" src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
                      <span>Michael Brown</span>
                    </div>
                  </td>
                  <td className="py-3">Apr 18, 2023</td>
                  <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                </tr>
                <tr>
                  <td className="py-3">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full object-cover mr-2" src="https://randomuser.me/api/portraits/women/4.jpg" alt="" />
                      <span>Emily Wilson</span>
                    </div>
                  </td>
                  <td className="py-3">Apr 15, 2023</td>
                  <td className="py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>;
}

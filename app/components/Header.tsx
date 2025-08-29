import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { logout } from "~/redux/slices/userSlice"
import OptionDropdown from "./OptionDropdown"
import { noImg } from "~/utils/shared"

export default function Header({ user }: any) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Logout = () => {
    dispatch(logout())
  }

  return <>
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <button className="text-gray-500 focus:outline-none lg:hidden">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div className="relative mx-4 lg:mx-0">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-search text-gray-400"></i>
            </span>
            <input className="w-32 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 sm:w-64" type="text" placeholder="Search" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <button className="text-gray-500 focus:outline-none">
              <i className="fas fa-bell text-xl"></i>
            </button>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          <div className="relative">
            <OptionDropdown
              placeholder={<>
                <button className="flex items-center focus:outline-none cursor-pointer">
                  <img className="h-8 w-8 rounded-full object-cover" src={noImg(user?.image)} alt="User" />
                  <span className="mx-2 text-gray-700">{user?.fullName}</span>
                  <i className="fas fa-chevron-down text-gray-500"></i>
                </button>
              </>}
              options={[
                {
                  name: 'Profile',
                  onClick: () => {

                  }
                },
                {
                  name: 'Logout',
                  onClick: () => {
                    Logout()
                  }
                }
              ]}
              isSearch={false}
            />

          </div>
        </div>
      </div>
    </header>
  </>
}
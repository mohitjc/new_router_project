import NavLink from "./NavLink"

export default function Sidebar({ user }: any) {

    const menus = [
        {
            name: 'Dashboard',
            icon: <span className="material-symbols-outlined">insert_chart</span>,
            url:'/'
        },
        {
            name: 'About Us',
            icon: <span className="material-symbols-outlined">insert_chart</span>,
            url:'/aboutus'
        },
    ]

    return <>
        <div className="w-64 bg-gray-800 text-gray-100">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                <span className="text-blue-400">Admin</span>Panel
            </div>
            <nav className="p-4">
                <div className="mb-6">
                    <p className="text-gray-400 text-sm uppercase mb-3">Main</p>
                    <ul>
                        {menus.map((item:any,i:any)=>{
                            return <>
                            <li className="mb-2" key={i}>
                            <NavLink to={item.url} activeClass={'!bg-blue-700 !text-white   '} className="flex items-center gap-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                                {item.icon}
                                {item.name}
                            </NavLink>
                        </li>
                            </>
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    </>
}
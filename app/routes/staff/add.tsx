import { useEffect, useRef, useState } from "react";
import ApiClientB from "~/utils/Apiclient";
import type { Route } from "./+types/add";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Staff" },
    { name: "description", content: "Add Staff" },
  ];
}

export default function Staff() {
    const [list, setList] = useState([])
    const [filters, setFilter] = useState({ page: 1, count: 50,search:''})
    const apiRef = useRef({
        list: { current: null }
    })
    const { get: getList, isLoading: listLoading, controller: listController } = ApiClientB(apiRef.current.list)


    const fetchList = () => {
        if (listController) listController.abort()
        let f = {
            ...filters
        }
        getList('user/admin/lisitng',f).then(res=>{
            if(res.success){
                setList(res.data)
            }
        })
    }

    useEffect(() => {
        fetchList()
    }, [filters])

    const statusChange = (row: any) => {

    }

    const columns = [
        {
            key: "fullName",
            name: "Full Name",
            sort: true,
            render: (row: any) => {
                return <span className="capitalize">{row?.fullName}</span>;
            },
        },
        {
            key: "email",
            name: "Email",
            sort: true,
            render: (row: any) => {
                return <span className="">{row?.email}</span>;
            },
        },
        {
            key: "mobileNo",
            name: "Mobile No",
            sort: true,
            render: (row: any) => {
                return <span className="">{row?.mobileNo}</span>;
            },
        },
        {
            key: "role",
            name: "role",
            sort: true,
            render: (row: any) => {
                return <span className="">{row?.roleDetails?.name}</span>;
            },
        },
        {
            key: "status",
            name: "Status",
            render: (row: any) => {
                return (
                    <>
                        <div className="w-32" onClick={() => statusChange(row)}>
                            <span
                                className={`bg-[#EEE] cursor-pointer text-sm !px-3 h-[30px] w-[100px] flex items-center justify-center border border-[#EBEBEB] text-[#3C3E49A3] !rounded capitalize 
                          ${row.status == "deactive"
                                        ? " bg-gray-200 text-black"
                                        : "!bg-[#550b12] text-white"
                                    }`}
                            >
                                {row.status == "deactive" ? "inactive" : "active"}
                            </span>
                        </div>
                    </>
                );
            },
        },
        {
            key: "action",
            name: "Action",
            render: (row: any) => {
                return (
                    <>
                        <div className="flex gap-1">
                            <button className="text-blue-600 hover:text-blue-900"><span className="material-symbols-outlined">edit</span></button>
                            <button className="text-green-600 hover:text-green-900"><span className="material-symbols-outlined">visibility</span></button>
                            <button className="text-green-600 hover:text-green-900"><span className="material-symbols-outlined">delete</span></button>
                        </div>
                    </>
                );
            },
        },
    ];
    return (
        <>
            <div className="container mx-auto px-4 py-8">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Add Staff Directory</h1>
                    <p className="text-gray-600 mt-2">Browse and manage your organization's staff members</p>
                </div>


                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    add staff
                </div>
            </div>
        </>
    );
}

import { useEffect, useRef, useState } from "react";
import DebouncedInput from "~/components/DebouncedInput";
import Table from "~/components/Table";
import ApiClientB from "~/utils/Apiclient";

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
                    <h1 className="text-3xl font-bold text-gray-800">Staff Directory</h1>
                    <p className="text-gray-600 mt-2">Browse and manage your organization's staff members</p>
                </div>


                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                            <DebouncedInput
                                type="text"
                                id="searchInput"
                                value={filters.search}
                                onChange={e=>{
                                    setFilter(prev=>({...prev,search:e}))
                                }}
                                placeholder="Search by name, department or email..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>


                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 whitespace-nowrap">Status:</span>
                            <select id="statusFilter" className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="on-leave">On Leave</option>
                                <option value="remote">Remote</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <Table
                        list={list}
                        columns={columns}
                        isLoading={listLoading}
                    />
                </div>


                <div id="emptyState" className="hidden text-center py-12 bg-white rounded-lg shadow mt-6">
                    <i className="fas fa-search fa-3x text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-medium text-gray-700">No staff members found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                </div>
            </div>
        </>
    );
}

interface props {
    list: any,
    columns: any,
    result?: any,
    isLoading?:any,
    noDataText?:any,
    total?:any
}

export default function Table({ total=0,list = [], columns = [], result = (_: any) => { },isLoading=false,noDataText='No Data Found' }: props) {
    columns = columns?.filter((itm: any) => !itm.hide)
    if(!total) total=list.length||0
    const headclick = (itm: any) => {
        if (itm.sort) {
            result({ event: "sort", value: itm.key });
        } else {
            result({ event: "head", value: itm.key });
        }
    };

    return <>
        <div className="overflow-x-auto">
            {isLoading?<>
                <div className="shine h-[50px] mb-1"></div>
                <div className="shine h-[50px] mb-1"></div>
                <div className="shine h-[50px] mb-1"></div>
                <div className="shine h-[50px] mb-1"></div>
                <div className="shine h-[50px] mb-1"></div>
                <div className="shine h-[50px] mb-1"></div>
            </>:<>
            {total?<>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((itm: any, ci: any) => (
                            <th
                                scope="col"
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${itm.sort ? "cursor-pointer" : ""} ${itm.className || ''}`}
                                onClick={() => headclick(itm)}
                                key={`${itm.key}_${ci}`}
                            >
                                <span className="inline-flex items-center gap-1">
                                    <span> {itm.name} </span>
                                    {itm.sort ? (
                                        <>
                                            <span className="">
                                                <span className="material-symbols-outlined">arrow_drop_down</span>
                                            </span>
                                        </>
                                    ) : null}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" id="staffTableBody">
                    {list.map(((item: any, i: any) => {
                        return <tr>
                            {columns.map((citm: any, ci: any) => {
                                return <td className="px-6 py-4 whitespace-nowrap" key={ci}>
                                    {citm.render(item, i) || "--"}
                                </td>
                            })}
                        </tr>
                    }))}
                </tbody>
            </table>
            </>:<>
            <div className="text-center p-3">{noDataText}</div>
            </>}
               
            </>}
         
        </div>
    </>
}
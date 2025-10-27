import { fetchPaginatedOrdersForAdmin } from "@/api"
import { DataTable, type Meta } from "@/components/table/DataTable"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useOrderColumns } from "./components/columns"

const AdminOrders = () => {
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [filter,] = useState<{ keyword: string }>({
        keyword: ''
    })
    const orderColumns = useOrderColumns()
    const { data, isLoading } = useQuery({
        queryKey: ['admin-orders', page, filter, itemsPerPage],
        queryFn: () => fetchPaginatedOrdersForAdmin(page, itemsPerPage, filter),
    })

    const handleRefetch = (metaData: Meta) => {
        setPage(metaData.currentPage)
        setItemsPerPage(metaData.itemsPerPage)
    }

    return (
        <div>
            {
                !isLoading &&
                <DataTable columns={orderColumns} data={data?.data || []} meta={data?.meta} onChange={handleRefetch} />
            }
        </div>
    )
}

export default AdminOrders

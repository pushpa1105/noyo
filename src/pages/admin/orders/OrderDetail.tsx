import { fetchOrderById } from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

const AdminOrderDetail = () => {
    const { orderId } = useParams()
    const { data: order, isLoading } = useQuery({
        queryKey: ['order-detail', orderId],
        queryFn: () => fetchOrderById(orderId!),
        enabled: !!orderId,
    })

    return (
        <div>
            Order Detail Page - {order?._id}
        </div>
    )
}

export default AdminOrderDetail

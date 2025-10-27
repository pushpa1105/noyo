import api from "@/api/axiosClient"
import z from "zod"

export const ShipingSchema = z.object({
    address: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required'),
    postalCode: z.string().min(1, 'Required'),
    country: z.string().min(1, 'Required'),
})

type Shipping = z.infer<typeof ShipingSchema>

type OrderItem = {
    name: string;
    quantity: number,
    image?: string,
    price: number,
    product: string,
}

export type Order = {
    shippingInfo: Shipping,
    orderItems: OrderItem[],
    paymentInfo: {
        id: string,
        status: string,
    },
    itemsPrice: number,
    shippingPrice: number,
}

export const createOrder = async (data: Order) => {
    const res = await api.post('/orders', data)
    return res?.data
}

export const fetchPaginatedOrdersForAdmin = async (page: number, itemsPerPage: number, filter: FilterType) => {
    const addons = {
        params: {
            page,
            limit: itemsPerPage || 10,
            ...filter
        }
    }
    const res = await api.get('/orders', addons)
    return res?.data
}

export const fetchOrderById = async (orderId: string) => {
    const res = await api.get(`/orders/${orderId}`)
    return res?.data?.data
}
import { Badge } from "@/components/ui/badge";
import { IconLoader } from "@tabler/icons-react"
import { Ban, Ship, Truck } from "lucide-react";

const parseStatusConfig = (status: string) => {
    const cleanedText = status.toLowerCase().trim()

    switch (cleanedText) {
        case 'processing':
            return {
                label: 'Processing',
                icon: IconLoader
            }
            break;

        case 'shipped':
            return {
                label: 'Shipped',
                icon: Ship
            }
            break;

        case 'delivered':
            return {
                label: 'Delivered',
                icon: Truck
            }
            break;

        case 'cancelled':
            return {
                label: 'Cancelled',
                icon: Ban
            }
            break;

        default:
            return {
                label: status,
                icon: IconLoader
            }
    }
}

const Status = ({ status }: { status: string }) => {
    const statusConfig = parseStatusConfig(status)
    return (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
            <statusConfig.icon />
            {statusConfig.label}
        </Badge>
    )
}

export default Status;
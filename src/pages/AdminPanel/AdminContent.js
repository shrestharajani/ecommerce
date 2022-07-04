import { AdminProduct } from "./AdminProduct"
import { AdminOrder } from "./AdminOrder"
import { AdminUser } from "./AdminUser"

export const AdminContent = [
    {
        id: 0,
        content: "Products",
        component: <AdminProduct />
    },
    {
        id: 1,
        content: "Orders",
        component: <AdminOrder />
    },
    {
        id: 2,
        content: "Users",
        component: <AdminUser />
    }
]
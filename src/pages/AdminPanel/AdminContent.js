import { AdminProduct } from "./AdminProduct";
import { AdminUser } from "./AdminUser";

export const AdminContent = [
  {
    id: 0,
    content: "Products",
    component: <AdminProduct />,
  },
  {
    id: 1,
    content: "Users",
    component: <AdminUser />,
  },
];

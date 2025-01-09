import axios from "axios";
import { cookies } from "next/headers";
import { IOrder } from "@/types/types";
import Orders from "./Orders";


async function getOrderHistory() {
  const cookieStore = await cookies();
  const token = cookieStore.get('2guysAdminToken');
  const superAdminToken = cookieStore.get('superAdminToken');
  let finalToken = token ? token : superAdminToken;

  const headers = {
    token: finalToken?.value,
  };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/Get_orders`,
      { headers }
    );
    const data = res.data.filter(
      (order: IOrder) => order.paymentStatus.paymentStatus === true,
    );
    return data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    return [];
  }
}

const OrdersPage = async () => {
  const orderHistory: IOrder[] = await getOrderHistory();
  return (
    <Orders orderData={orderHistory} />
  );
};

export default OrdersPage;

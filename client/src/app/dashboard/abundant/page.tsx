import axios from "axios";
import AbundantOrder from "./AbundantOrder";
import { cookies } from "next/headers";
import { IOrder } from "@/types/types";


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
      (order: IOrder) => order.paymentStatus.paymentStatus === false
    );
    return data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    return [];
  }
}

const Abundant = async () => {
  const orderHistory: IOrder[] = await getOrderHistory();
  return (
    <AbundantOrder abundantOrderData={orderHistory} />
  );
};

export default Abundant;

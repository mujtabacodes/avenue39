import { getOrderHistory } from "@/config/handlers";
import AbundantOrder from "./AbundantOrder";
import { IOrder } from "@/types/types";



const Abundant = async () => {
  const orderHistory: IOrder[] = await getOrderHistory();
  return (
    <AbundantOrder abundantOrderData={orderHistory} />
  );
};

export default Abundant;

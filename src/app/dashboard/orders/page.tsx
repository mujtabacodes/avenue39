import { IOrder } from '@/types/types';
import Orders from './Orders';
import { getOrderHistory } from '@/config/handlers';

const OrdersPage = async () => {
  const orderHistory: IOrder[] = await getOrderHistory(true);
  return <Orders orderData={orderHistory} />;
};

export default OrdersPage;

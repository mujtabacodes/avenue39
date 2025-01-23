import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './types';
import { message } from 'antd';

interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
    
      if (existingItem) {
        const newQuantity = existingItem.quantity + item.quantity;
        if (newQuantity > (item.stock || 0)) {
          message.error(`Only ${item?.stock} items are in stock. You cannot add more.`);
        }
        existingItem.quantity = newQuantity;
      } else {
        if (item.quantity > (item.stock || 0)) {
          message.error(`Cannot add more than ${item.stock} items to the cart.`);
        }
        state.items.push(item);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const selectTotalPrice = (state: CartState): number => {
  return state.items.reduce((total, item) => {
    const price = item.discountPrice ? item.discountPrice : item.price;
    return total + price * item.quantity;
  }, 0);
};

export const totalProductsInCart = (state: CartState): number => {
  return state.items.reduce((total, item) => total + item.quantity, 0);
};
export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;

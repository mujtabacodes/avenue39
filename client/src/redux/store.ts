import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mainReducer from '@mainSlice/index';
import cartReducer from '@cartSlice/index';
import { initMainState } from '@mainSlice/init';
import { initCartState } from './slices/cart/init';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  migrate: (state: any) => {
    const { _persist = {} } = state || {};
    // Ensure state.main exists and handle possible undefined cases
    const main = { ...initMainState, ...(state?.main || {}) };
    const cart = { ...initCartState, ...(state?.cart || {}) };
    return Promise.resolve({ _persist, main, cart });
  },
};

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  main: mainReducer, // Ensure this is the reducer
  cart: cartReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks if you're using non-serializable data in Redux
    }),
});

// Create a persistor instance to manage the persisted state
export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

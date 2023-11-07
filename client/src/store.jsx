import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
  FLUSH,
  REHYDRATE,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { cartReducer } from "./slices/cartSlice";
import { orderReducer } from "./slices/orderSlice";
import { productReducer } from "./slices/productSlice";
import { authReducer } from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);
const persistedAuth = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    products: productReducer,
    auth: persistedAuth,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const newStore = persistStore(store);

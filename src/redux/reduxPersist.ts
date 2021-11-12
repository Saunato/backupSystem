
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persist = (persistConfig: any, reducer: any) =>
  persistReducer({ ...persistConfig, storage }, reducer);
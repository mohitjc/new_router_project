import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { indexedDBStorage } from "~/utils/indexedDBStorage";
import { persistReducer, persistStore ,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: indexedDBStorage, // ✅ use IndexedDB instead of localStorage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
   middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // ✅ ignore redux-persist actions
      },
    }),
});


// Types for TS
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

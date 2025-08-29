import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { indexedDBStorage } from "~/utils/indexedDBStorage";
import { 
  persistReducer, 
  persistStore,
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import envirnment from "~/envirnment"

// 🔑 Use env variable for secret key (best practice)
const PERSIST_SECRET = envirnment.secret_key as string;

if (!PERSIST_SECRET) {
  console.warn("⚠️ Persist secret key is not set. Falling back to insecure default.");
}

// 🔒 Create encryptor transform
const encryptor = encryptTransform({
  secretKey: PERSIST_SECRET || "fallback-secret-dev-only",
  onError: (error) => {
    console.error("Persist encryption error:", error);
  },
});

const appName=envirnment.app_name

const persistConfig = {
  key: appName,
  storage: indexedDBStorage,
  transforms: [encryptor], // ✅ encrypt persisted data
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

export const persistor = persistStore(store);

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

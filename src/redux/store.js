import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./tracker/tracker.reducer";

const trackersPersistConfig = {
    key: "trackers",
    storage,
};

const store = configureStore({
    reducer: { trackers: persistReducer(trackersPersistConfig, reducer) },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
const persistor = persistStore(store);

export { persistor, store };

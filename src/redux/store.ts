import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
import storage from "redux-persist/es/storage";
import trackerReducer from "./tracker/tracker.reducer";

type RootStoreType = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const trackersPersistConfig = {
    key: "trackers",
    storage,
};

const reducer = combineReducers({
  trackers: trackerReducer,
});

const store = configureStore({
    reducer: { app: persistReducer(trackersPersistConfig, reducer) },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
const persistor = persistStore(store);

export { store, persistor, RootStoreType, AppDispatch };

import { configureStore } from "@reduxjs/toolkit";
import reducer from "./tracker/tracker.reducer";

type RootStoreType = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: { app: reducer },
});

export { RootStoreType, AppDispatch };
export default store;

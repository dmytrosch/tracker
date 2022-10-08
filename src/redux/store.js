import { configureStore } from "@reduxjs/toolkit";
import reducer from "./tracker/tracker.reducer";


const store = configureStore({
    reducer: { app:  reducer },
});

export default store

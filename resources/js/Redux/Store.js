import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import appReducer from "./reducer/AppReducer";
import { configureStore } from "@reduxjs/toolkit";

const loggerMiddleware = createLogger();

let middleware = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
    middleware.push(loggerMiddleware);
}

const store = configureStore({
    reducer: {
        app: appReducer,
    },
    middleware,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";
import { createPersistStorage } from "@/redux/persistStorage";

import weatherReducer from "@/redux/slices/weatherSlice";

const rootReducer = combineReducers({
    weather: weatherReducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage: createPersistStorage(),
    whitelist: ["weather"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
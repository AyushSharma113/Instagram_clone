import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authSlice from "./authslice"
import postSlice from "./postSlice"
import chatSlice from './chatSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
    auth:authSlice,
    post:postSlice,
    chat:chatSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
     reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


export type RootState = ReturnType<typeof store.getState>;

export default store;

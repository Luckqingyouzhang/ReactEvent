import  { configureStore } from '@reduxjs/toolkit'
import {RootReducer} from "@/store/reducer";
import  thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['login']
}

// 将reducer 加入持久化
const persistedReducer = persistReducer(persistConfig,RootReducer)

const store = configureStore({
    // 将reducer 放入 store 中
    reducer:persistedReducer,
    // 开启 devtools 工具
    devTools:true,
    // 配置thunk 中间件
    middleware: [thunk],
})
export  const PersistStore = persistStore(store)

export default  store
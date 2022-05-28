// 样式
import App from './App'
import  '@/assets/css/App.scss'
import  './assets/css/global.css'
// @ts-ignore
import React from 'react'
// @ts-ignore
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
// 使用 自定义路由包
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { PersistStore } from '@/store';
import  {Provider} from 'react-redux'
import store from "@/store";

export const defineHistory = createBrowserHistory()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
                <PersistGate persistor={PersistStore}>
                    <HistoryRouter history={defineHistory} >
                    <App />
                    </HistoryRouter>
                </PersistGate>
        </React.StrictMode>
    </Provider>
)

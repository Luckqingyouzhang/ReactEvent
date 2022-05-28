import axios from 'axios'
import type {AxiosRequestConfig} from 'axios'
import store from '@/store'
import {message} from "antd";
import {getToken}  from  '@/utils/Token'
import  {defineHistory} from '@/utils/history'

const instance = axios.create({
    timeout: 5000,
    baseURL:''
})
//添加请求拦截
instance.interceptors.request.use( (config:any) =>{
    const {login:token} = store.getState()
    if(token) config.headers.Authorization = getToken()
    return config
},error => {
    return error
})

instance.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        defineHistory.push('/login')
        message.error('身份过期，请重新登录')

    }
    return Promise.reject(error)
})

export function request<T>(config: AxiosRequestConfig) {
    return instance.request<T>(config)
}

// 左侧导航栏数据请求
import {MainAPI} from "@/apis/MainViews";
import * as types from "@/store/Types";

export const MainAside:any = ()=>{
    return  async (dispatch:any) =>{
        const {data:res} = await MainAPI.getMenus()
        // 如果出现错反回错误信息
        if(res.code !== 0) return Promise.reject(new Error(res.message))
        //如果成功 则 分发reducer 进行数据存储
        dispatch({type:types.getAsideBar,payload:res.data})
        return  res.data
    }
}
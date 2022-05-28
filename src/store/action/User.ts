import {MainAPI}  from '@/apis/MainViews'
import * as types from '@/store/Types'

// 获取用户基本信息数据

export  const getUserBaseInfo:any = ()=>{
    return async (dispatch:any)=>{
        const {data:res} = await  MainAPI.getUserInfo()
        // 如果获取失败 则 返回错误的结果
        if(res.code!==0) return res
        // 否则分发正切的结果给reducer
        dispatch({type:types.getUserInfo,payload:res.data})
        return  res
    }
}



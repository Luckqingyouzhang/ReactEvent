import * as types  from '@/store/Types'
const initialState = ''
// 主页基本信息
export  const User = (state=initialState,action:any) =>{
    if(action.type === types.getUserInfo){
        return action.payload
    }
    return  state
}
import  * as  types from '@/store/Types'
const  initialState = ''
export  const AsideBarList = (state:any = initialState,action:any) =>{
    if(action.type === types.getAsideBar){
        return action.payload
    }
    return  state
}
import * as types from '@/store/Types'
const initState:any[] = []
export  const ArticleList = (state=initState,action:any)=>{
    if(action.type === types.ArticleList){
        return  action.payload
    }
    return state
}
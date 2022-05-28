import  * as types from '@/store/Types'

const initialState = ''

export const login = (state:any = initialState , action:any)=>{
    if(action.type === types.login) {
        return action.payload
    }
    return state
}
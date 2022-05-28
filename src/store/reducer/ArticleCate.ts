import * as types  from '@/store/Types'
const initState:[] = []

export  const ArtCateData = (state:[] = initState,action:any)=>{
    if(action.type === types.ArticleCate) {
        return action.payload
    }
    return  state
}

export  const ArtCateEach = (state:object={},action:any) =>{
    if(action.type==='ArtCateEach'){
        return action.payload
    }
    return  state
}
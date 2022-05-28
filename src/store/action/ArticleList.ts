import  {ArticleAip} from '@/apis/Article'
import  * as types from '@/store/Types'
export  const getArticleList:any  = (data:ArticlesListReq)=>{
    return async  (dispatch:any) =>{
        const {data:res} = await  ArticleAip.getArticles(data)
        dispatch({type:types.ArticleList,payload:res})
    }
}
export  const PublishNewsArticle:any = (data:PublishArticleReq)=>{
    return async ()=>{
        try {
            const {data:res} = await  ArticleAip.PublishArticle(data)
            return res
        }
        catch (e){

        }
    }}
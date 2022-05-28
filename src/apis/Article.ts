import {request}  from '@/utils/http'

class ArticleInterface {
    // 获取文章分类
    getArticleCate() {
        return request<ArticleCateRes>(
            {
                method: 'get',
                url: '/item1/my/cate/list',
            }
        )
    }
    //添加文章分类
    appendArticleCate(data: ArticleCateReq) {
        return request<ArticleCateRes>(
            {
                method: 'post',
                url: '/item1/my/cate/add',
                data
            }
        )
    }
    // 删除文章分类
    RemoveArtCate(id: RemoveArticleCateReq) {
        return request<RemoveArticleCateRes>(
            {
                method: 'delete',
                url: '/item1/my/cate/del',
                params:{
                    id
                }
            }
        )
    }
    // 获取文章分类每个数据
    getArtCateEach(id:number){
        return request<getArticleCateEachRes>({
            method:'get',
            url: '/item1/my/cate/info',
            params:{id}
        })
    }
    // 更新文章分类
    ChangeArtCate (data:ChangeArtCateReq){
        return request<ResponseResult>({
            method:'PUT',
            url: '/item1/my/cate/info',
            data
        })
    }
    // 获取文章列表数据
    getArticles (data:ArticlesListReq){
        return request<ArticlesListRes>({
            url:'/item1/my/article/list',
            method:'get',
            params:data
        })
    }

    // 发表文章
    PublishArticle(data:PublishArticleReq){
        return request<ResponseResult>({
            url:'/item1/my/article/add',
            method:'POST',
            data
        })
    }
    RemoveArticle(id:string){
        return request<ResponseResult>({
            url:'/item1/my/article/info',
            method:'delete',
            params:{
                id
            }
        })
    }
}


export const ArticleAip = new  ArticleInterface()
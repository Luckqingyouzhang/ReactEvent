import {ArticleAip} from '@/apis/Article'
import * as types from '@/store/Types'
import {message} from "antd";
// 获取文章分类
export const getArticleCate: any = () => {
    return async (dispatch: any) => {

        const {data: res} = await ArticleAip.getArticleCate()

        dispatch({type: types.ArticleCate, payload: res.data})

    }

}
// 添加文章分类
export const appendArticleCate: any = (data: ArticleCateReq) => {
    return async () => {
        try {
            const {data: res} = await ArticleAip.appendArticleCate(data)

            if (res.code !== 0) return message.error(res.message)

            message.success(res.message)
        } catch (err) {

        }
    }
}
// 删除文章分类
export const RemoveArticleCategory: any = (data: RemoveArticleCateReq) => {
    return async () => {
        const {data: res} = await ArticleAip.RemoveArtCate(data)

        if (res.code !== 0) return res

        message.success(res.message)
    }
}

// 获取文章分类每一项
export const getArtCateEach: any = (id: number) => {

    return async (dispatch: any) => {

        const {data: res} = await ArticleAip.getArtCateEach(id)

        dispatch({type: 'ArtCateEach', payload: res.data})
    }
}

export const ChangePresentArtCate: any = (data: ChangeArtCateReq) => {
    return async () => {
        const {data: res} = await ArticleAip.ChangeArtCate(data)

        if (res.code !== 0) return

        message.success(res.message)
    }
}
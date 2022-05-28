// 登录接口的响应数据类型

interface ResponseResult{
    code:number
    message:string
    data?:object
}
// 登录响应
interface LoginResponse {
    code: number
    message: string
    token: string
}

// 登录接口的发送的数据类型
interface LoginRequest {
    username: string
    password: string
    // 可选的类型 不是必填项
    age?: number
}
// 注册接口发送的数据类型
interface  RegisterRequest{
    AffirmPassword?: string;
    username: string
    password: string,
    repassword:string
}
// 注册接口返回的值
interface RegisterResponse {
    code: number
    message: string
}

// 主页 导航栏想响应数据接口
interface MainAsideBarResponse{
    code:number,
    message:string,
    data:{},
    children?:[] | string,
    icon:string,
    indexPath:string,
    title:string
}



// 获取0用户基本信息 接口返回的值
interface  UserBaseInfoResponse{
    code:number,
    message:string,
    data:{
        id:number,
        username:string,
        nickname:string
        email:string
        user_pic:string
    },
}

// 上传头像请求数据
interface UploadPictureReq {
    avatar:string
}
//上传头像响应数据
interface UploadPicture {
    code:number,
    message:string,
}
// 更新用户信息响应数据接口
interface UpdateUserCipherRes {
    code:number,
    message:string,
}
// 更新用户信息请求接口
interface UpdateUserCipherReq {
    old_pwd:string,
    new_pwd:string,
    re_pwd:string
}
// 分账分类请求参数
interface  ArticleCateReq {
    cate_name:string,
    cate_alias:string
}
//文章分类响应结果
interface  ArticleCateRes extends ResponseResult{
    data:object
}
// 删除文章分类请求参数
interface  RemoveArticleCateReq {
    id:string
}
//删除文章响应参数
interface  RemoveArticleCateRes extends  ResponseResult{
    data:object
}
// 获取文章分类每一条数据响应结果
interface  getArticleCateEachRes extends  ResponseResult{
    data:object
}
// 更新文章分类请求数据
interface  ChangeArtCateReq {
    id:number,
    cate_name:string,
    cate_alias:string
}
// 文章列表请求接口字段 Field(字段)
interface ArticlesListReq {
    pagenum:number,
    pagesize:number,
    cate_id?:string,
    state?:string
}
// 文章列表响应结果字段
interface  ArticlesListRes extends ResponseResult {
    total:number,
    data:object[
        {
            id:number,
            title:string,
            pub_date:string,
            state:string,
            cate_name:string
        }
        ]

}
// 发布文章 请求参数
interface PublishArticleReq{
    title:string,
    cate_id:number,
    content:string,
    state:string,
    cover_img:any
}




/// 组件函数限定参数
interface StaticModalParams {
    title?:string,
    footer?:boolean,
    SureCloseModal?: (b: boolean)=>void,
    CancelCloseModal?: (b: boolean)=>void,
    visible:boolean
}





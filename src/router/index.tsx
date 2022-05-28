import  Register from '@/views/Register'
import  Login  from '@/views/login'
import {lazy} from "react";
import  Layout from '@/views/Layout'
import  NotFound from '@/views/NotFound/index'
import  ArticleCateGory  from '@/views/Article/ArticleCateGory'
import  ArticleList  from '@/views/Article/ArticleList'
import BaseInfo from '@/views/User/BaseInfo'
import ResetAccount from '@/views/User/ResetAccount'
 import ReplaceUserAvatar from '@/views/User/ReplaceUserPicture'
import  Main from '@/views/Main'



/// 此处路由表还未配置
const router= [
    {
        path: "/login",
        element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
        path: '/home',
        element: <Layout />,
        Children:[
            {
                path:'/Main',
                element: <Main />
            },
            {   //文章分类
                path:'/art-cate',
                element:<ArticleCateGory/>
            },
            {   // 文章列表
                path:'/art-list',
                element:<ArticleList/>
            },
            {   // 用户基本信息
                path:'/Userinfo',
                element:<BaseInfo/>
            },
            {   // 用户 头像
                path:'/UserAvatar',
                element:<ReplaceUserAvatar/>
            },
            {   // 用户重置密码
                path:'/ResetAccount',
                element:<ResetAccount/>
            },
        ]
    },
    {
        path: '/',
        redirect:'/home/main',
        element:<Layout />,

    },
    {
        path: '*',
        element:<NotFound />,
    }

]

export  default  router


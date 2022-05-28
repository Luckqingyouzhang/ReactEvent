// 合并reducer
import {combineReducers} from "redux";
import { login } from './login';
import { User}  from './User'
import {AsideBarList}  from './AsideBar'
import  {ArtCateData} from './ArticleCate'
import {ArticleList} from './ArticleList'

export  const RootReducer = combineReducers({
    // 传入需要合并的reducer
    login,
    User,
    ArtCateData,
    AsideBarList,
    ArticleList
})

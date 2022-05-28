import  {request} from '@/utils/http'

class  MainApi {
    // 获取用户基本信息
    getUserInfo (){
        return request<UserBaseInfoResponse>({
            method:'GET',
                url:'/item1/my/userinfo'
        })
    }
    // 获取左侧菜单栏数据
    getMenus(){
        return request<MainAsideBarResponse>({
            method:'get',
            url:'/item1//my/menus'
        })
    }

}
export  const MainAPI = new MainApi()
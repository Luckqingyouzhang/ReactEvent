import  { isLogin }  from '@/utils/Token'
import { Navigate } from "react-router-dom";
// 路由守卫
const RouterWhitLeList = ['/login','*','/register']
export  const BeforeEachRouter = (route:any)=>{

    const  router  = route.route
    // 如果当前 你去的页面是在白名单中 直接放行
    if (RouterWhitLeList.includes(router.path)){
        return  router.element
    }
    // 如果不是 则 判断是否登录 如果登录则放行 否则 返回登录页
    else{
        // 判断是否登录
        const LoginStatus = isLogin()
        if (LoginStatus) return router.element
    else{
        return <Navigate to="/login" />;
        }
    }

}
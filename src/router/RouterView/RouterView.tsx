import  router from '@/router'
import {BeforeEachRouter} from "@/component/BefoEachRouter/BeforeEachRouter";
import {Navigate, Route} from 'react-router-dom'
const RouterView = (Routers:any=[],ParentRoute:string='')=>{
  return  Routers.map((route:any) => {
      //如果 有重定向属性则让你跳转到 重定向的 页面 同时因为有了路由守卫所以会进行拦截
      if (route.redirect){
          return  (<Route key={route.path} path={route.path} element={<Navigate to={route.redirect} />}> </Route>)
      }
      if(route.Children?.length>0) {

          const ChildrenRoute = RouterView(route.Children,ParentRoute + route.path)
          return   (
              <Route key={route.path} path={ParentRoute + route.path} element={<BeforeEachRouter route={route}/>}>
                  {[...ChildrenRoute]}
              </Route>
          )
      }
      else{
          // 如果没有 则直接返回当前element 并进行身份校验

          return (
          <Route key={route.path} path={ParentRoute + route.path} element={<BeforeEachRouter route={route}/>}>

          </Route>
          )
      }

    })
}


export const RenderRouterView  = RouterView(router)

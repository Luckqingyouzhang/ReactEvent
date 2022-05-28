// @ts-ignore
import React, { useEffect, useState} from "react";
import  {AsideBarList,  Header, Content, Sider} from './LayoutBaseData'
import {PoweroffOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import Loading  from '@/component/Loading'
import {Layout, Menu, Modal, message} from 'antd';
import {getArticleCate, getUserBaseInfo} from '@/store/action'
import  {useDispatch,useSelector} from 'react-redux'
import  {useNavigate,useLocation,Outlet} from 'react-router-dom'
import  {ClearToken} from '@/utils/Token'
import {TreeNode} from "@/utils/recursive";
// static assets
import  styles from './Layout.module.scss'
import avatar from '@/assets/images/avatar.jpg'
import logo from '@/assets/images/logo.png'


const LayoutComponent  =  ()=> {
    // Hooks
    const  Navigate = useNavigate()
    const  dispatch = useDispatch()
    const  location = useLocation()
    // 菜单栏数据
    const [loading,setLoading] = useState( true)
    const {nickname,user_pic} = useSelector((state:any) => state.User)
    useEffect(()=>{ // 获取用户基本信息 如果你没有上一次的信息则进行请求数据
        ( async ()=>{
          try {
              await dispatch(getUserBaseInfo())
              setLoading(false)
          }catch (err:any){
          }
        })()

    },[dispatch])

    if(location.pathname === '/home'){
        Navigate('/home/main')
    }

    const ExitLogin  = ()=>{
        const { confirm } = Modal;
        const prompt = {
            icon: <ExclamationCircleOutlined />,
            content:'此操作将退出登录, 是否继续?',
            okText:'确定',
            cancelText:'取消',
            onOk() { ClearToken() /*清除本地Token*/
            message.success('退出成功',1,()=>Navigate('/login'))},
            onCancel() { message.info('已取消') },
            }
        confirm(prompt);
    }

    const AsideBar  = AsideBarList.map((item:any,index:number)=>{
        if (item.children){
            return {
                key: `${item.indexPath}`,
                icon: React.createElement(item.icon),
                label: `${item.title}`,
                children: item.children.map((ChildrenItem: any) => {
                    return {
                        key: `${ChildrenItem.indexPath}`,
                        icon: React.createElement(ChildrenItem.icon),
                        label: `${ChildrenItem.title}`,};
                }),
            }
        }else{
            return {
                key: `${item.indexPath}`,
                icon: React.createElement(item.icon),
                label: `${item.title}`,
            }
        }
    })
    const RoutingNavigation =  (e:any)=>{
        const Path = e.key
        const RecursiveResult = TreeNode(AsideBarList)
        const NewsPath:any = RecursiveResult.find((item:any)=>item.indexPath === Path)
        return  Navigate(NewsPath.indexPath)
    }
return (
    <>
        {
            loading?(
                <Loading/>
            ):(
                <div className={`${styles.root}`} >
                    <Layout className={`site-layout `} >
                        <Layout>
                            <Sider width={200} className="site-layout-background" collapsible= {true}>
                                <div className={'aside-userinfo'} >
                                    <div className={'UserImg'}> <img src={user_pic?user_pic:avatar} alt=""/> </div>
                                    <span>欢迎:{nickname || 'xxx'}</span>
                                </div>
                                <Menu
                                    onClick={(e)=>{RoutingNavigation(e)}}
                                    mode="inline"
                                    // defaultOpenKeys={[`${location.pathname}`]}
                                    theme={'dark'}
                                    defaultSelectedKeys={[`${location.pathname}`]}
                                    style={{ height: '100%', borderRight: 0 }}
                                    items={AsideBar}
                                />

                            </Sider>
                            <Layout >
                                <Header className="header">
                                    <div className="logo" >
                                        <a href={'http://localhost:3000/home'}><img src={logo} style={{height:'60px'}} alt="无法显示"/></a>
                                    </div>
                                    <div className={"RightBox"} >
                                        <div className={'Personal_center_module'}>
                                            <div className={'headerRightImg'}>
                                                <img src={user_pic?user_pic:avatar} alt=""/></div>
                                            <div className={'Personal_center'}><span>个人中心</span></div>
                                        </div>
                                        <div className={'exitModule'} onClick={()=>ExitLogin()} >
                                            <PoweroffOutlined /> <span>退出</span>
                                        </div>
                                    </div>
                                </Header>
                                <Content className="site-layout-background"
                                         style={{
                                             margin: '15px 16px',
                                             minHeight: 280,
                                             backgroundColor:'#fff'
                                         }}>

                                    <Outlet/>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>

            )
        }
    </>
)
}

export default  LayoutComponent


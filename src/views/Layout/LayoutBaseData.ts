import {
    AppstoreOutlined,
    BarsOutlined,
    FundOutlined,
    HomeOutlined,
    LayoutOutlined, RedoOutlined, UserOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import {Layout} from "antd";

const AsideBarList:any  = [
    {
        children:null,
        indexPath:'/home/Main',
        title:'首页',
        icon:HomeOutlined
    },
    {

        indexPath:'/art-manage',
        title:'文章管理',
        icon:LayoutOutlined,
        children:[
            {   icon:AppstoreOutlined,
                indexPath:'/home/art-cate',
                title:'文章分类',
            },
            {   icon:BarsOutlined,
                indexPath:'/home/art-list',
                title:'文章列表'
            }
        ],
    },
    {
        indexPath:'/UserPwd',
        title:'个人中心',
        icon:UserOutlined,
        children:[
            {   icon:UserSwitchOutlined,
                indexPath:'/home/Userinfo',
                title:'基本资料',
            },
            {   icon:FundOutlined,
                indexPath:'/home/UserAvatar',
                title:'更换头像'
            },
            {   icon:RedoOutlined,
                indexPath:'/home/ResetAccount',
                title:'重置密码'
            }
        ],
    }
]
const { Header, Content, Sider } = Layout;
export  {
    AsideBarList,
    Header, Content, Sider
}
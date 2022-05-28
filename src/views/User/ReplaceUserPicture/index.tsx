import {Button, Card, message} from "antd";
import styles  from './Picture.module.scss'
import  avatar from '@/assets/images/avatar.jpg'
import  {userApi} from '@/apis/user'
import  {getUserBaseInfo} from '@/store/action/User'
import { PlusOutlined,CloudUploadOutlined } from '@ant-design/icons';
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
const ReplaceUserPicture = ()=>{
    /*Hooks*/
   const File:any = useRef()
    const dispatch =  useDispatch()


    /*
    * data 数据
    * */
    let [PreView,setPreView]:any  =  useState('')

    /*
    函数 function
    * */
    // 解析本地图片
    const ParsingPicture = (e:any)=>{
       const file = e.target.files[0]
        if(file){
            const fr = new FileReader()

            fr.readAsDataURL(file)

            fr.onload = (e:any)=>setPreView(e.target.result)
        }
        else{
            setPreView('')
        }
    }
    // 上传头像
    const UpdatePicture = async () =>{
        if(PreView){
            const {data:res} = await  userApi.UploadPicture({avatar:PreView})

            if(res.code !== 0) message.error(res.message)

            message.success(res.message)

            dispatch(getUserBaseInfo())
        }
    }

    return (
        <div  className={styles.root}>
            <Card title="更换头像" style={{ width: '100%' }}>
                <div className={'AvatarBox'}>
                    <>
                        {
                            PreView? <img src={PreView} alt="加载失败" /> : <img src={avatar} alt="加载失败" />
                        }
                    </>
                </div>
                <div className={'btnLayout'}>
                    <input type="file" ref={File} onChange={ParsingPicture} style={{display:'none'}}/>
                    <Button type="primary"  icon={<PlusOutlined />} size={'large'} onClick={()=>{File.current.click()}}>选择图片 </Button>
                    <Button type={`primary`} danger={PreView} icon={<CloudUploadOutlined />} disabled={!PreView} size={'large'} onClick={()=>UpdatePicture()}>上传头像 </Button>
                </div>
            </Card>
        </div>
    )
}
export  default  ReplaceUserPicture
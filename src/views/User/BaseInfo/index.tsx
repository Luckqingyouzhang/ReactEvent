import {Button, Card, message, PageHeader} from 'antd';
import { Form, Input} from 'antd';
import  { nickname} from '@/utils/MatchingRule'
import  styles from './Baseinfo.module.scss'
import {useDispatch, useSelector} from "react-redux";
import  {userApi} from '@/apis/user'
import  {getUserBaseInfo} from '@/store/action/User'
const BaseInfo =  ()=>{

    /*
    Hooks
    * **/
     const  dispatch = useDispatch()
     const [form] = Form.useForm();

    /*
    * 数据
    * **/
    const User = useSelector((state:any) => state.User)

    /*
    * 函数
    * */

    const SubmitChange = async (value:any)=>{
        const { nickname,email } = value
        value.id = User.id
        if(nickname === User.nickname && email === User.email) return message.warning("不能修改与近期相同的用户名或邮箱")
      try {
          const {data:res} = await  userApi.ChangeBaseUserInfo(value)

          if(res.code !== 0) return  message.error(res.message)
          message.success(res.message)
          // 更新信息
          dispatch(getUserBaseInfo())

       }
        catch (err){
        }
    }

    return (
        <div className={styles.root} >
            <Card title="基本资料" style={{ width: '100%' }}>
                <div className="clearfix">
                    <Form
                        name="basic"
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        onFinish={SubmitChange}
                        validateTrigger={'onBlur'}
                        initialValues={{User}}
                        autoComplete="off">
                        <Form.Item label="登录名称" initialValue={User.username} name="username" >
                            <Input  disabled  />
                        </Form.Item>
                        <Form.Item label="用户昵称" initialValue={User.nickname} rules={nickname}  name="nickname">
                            <Input  />
                        </Form.Item>
                        <Form.Item label="用户邮箱" initialValue={User.email} rules={[{type:"email",message:"邮箱格式不正确"},{required:true,message:"邮箱不能为空"}]} name="email">
                            <Input  />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 10 }} >
                            <Button type="primary"  htmlType="submit" className={'SubmitChange'}>提交修改</Button>
                            <Button onClick={()=>{form.resetFields();}} >重置</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>

        </div>
    )
}
export default  BaseInfo
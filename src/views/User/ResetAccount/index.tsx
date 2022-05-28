import {Button, Card, Form, Input, message} from "antd";
import  {getUserBaseInfo} from '@/store/action/User'
import  {userApi} from '@/apis/user'
import  styles from './reset.module.scss'
import {password} from '@/utils/MatchingRule'
import {useRef} from "react";
import {ClearToken }  from '@/utils/Token'
import  {throttle} from '@/utils/throttle'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const ResetAccount = ()=>{

    const NewPass:any = useRef()
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    /*
    * function (函数)
    * **/
    const ValidatePass = (_:any,value:any)=>{
        const NewsValue = NewPass.current.input.value
        if(NewsValue !== value){
            return Promise.reject(new Error("两次密码不一致"))
        }
        return  Promise.resolve("")
    }

    // 更新用户密码
    const ChangeUserInfo = async (value:any)=>{
        try {
            // 请求更新数据
            const {data:res } = await  userApi.UpdateUserCipher(value)

            if(res.code !== 0) return message.error(res.message)

            message.success(res.message)

            dispatch(getUserBaseInfo())

            ClearToken()
            Navigate('/login')
        }catch (err:any){
        }
    }

    return (
        <div className={styles.root}>
            <Card title="重置密码" style={{ width: '100%' }}>
                <div className={'resetAccount'}>
                    <Form
                        name="basic"
                        labelCol={{span:6}}
                        wrapperCol={{ span: 20}}
                        onFinish={throttle(ChangeUserInfo,2000)}
                        validateTrigger={'onBlur'}
                        autoComplete="off"
                        initialValues={{old_pwd:'',new_pwd:'',re_pwd:''}}>
                        <Form.Item
                            label="原密码"
                            name="old_pwd"
                            rules={password("原密码不能为空")}>
                            <Input.Password  />
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                            name="new_pwd"
                            rules={password("新密码不能为空")}>
                            <Input.Password  ref={NewPass}  />
                        </Form.Item>
                        <Form.Item
                            label="确认新密码"
                            name="re_pwd"
                            rules={
                                [
                                    {required:true,message:'确认新密码不能为空',validateTrigger:'onBlur'},
                                    {pattern:/^\S[A-Za-z0-9]{5,15}$/,message: '长度为6-15位的非空字符',validateTrigger:'onBlur'},
                                    {validator:ValidatePass,validateTrigger:'onBlur'}
                                ]
                            }>
                            <Input.Password  />
                        </Form.Item>
                        <Form.Item  wrapperCol={{ offset: 6, span: 10 }}>
                            <Button className={'SubmitChange'} type={'primary'} htmlType={'submit'} size={'middle'}>修改密码 </Button>
                            <Button type={'default'}  size={'middle'}>重置 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    )
}
export  default  ResetAccount
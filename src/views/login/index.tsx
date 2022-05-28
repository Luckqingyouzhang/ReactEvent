import  styles from './login.module.scss'
import  {Username,password}  from '@/utils/MatchingRule'
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import  { useDispatch }  from 'react-redux'
import   {useNavigate} from 'react-router-dom'
import { LoginAction} from '@/store/action'

const login = ()=>{
    const Navigate = useNavigate()
    // 分发动作对象
    const  dispatch = useDispatch()
    const verifyUserLoginInfo  =  async (values:any)=>{
        // 拿到数据dispatch 分发任务 进行请求
        try {
          // @ts-ignore
            const res  =  await dispatch(LoginAction(values))
            if(res.code !==  0 ) return message.error(res.message)
             message.success('登录成功',1.5, async  ()=>{
                 // 执行跳转
                 Navigate('/home/Main')
             })
        }
        catch (err){
            message.error('登陆失败,请稍后重试')
        }
    }
    return (
        <div className={styles.root }>
            <div className ="login-container">
                {/*   <!-- 登录的盒子 -->  */}
                <div className="login-box">
                    {/* <!-- 标题的盒子 --> */}
                    <div className="title-box">
                    </div>
                    <Form
                        onFinish ={verifyUserLoginInfo}
                        validateTrigger={['onBlur', 'onChange']}
                        size={'large'}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off">
                        <Form.Item name="username" rules={Username("用户名不能为空")}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={'请输入账号'} />
                        </Form.Item>
                        {/*匹配 6 - 12 位非空的字符*/}
                        <Form.Item name="password" rules={password('密码不能为空')}>
                            <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block className={'LoginBtn'}> 登录</Button>
                        <Button type="link" className='GoRegisterPage' onClick={()=>Navigate('/register')} >
                            <p>去注册</p>
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )

}

export  default  login

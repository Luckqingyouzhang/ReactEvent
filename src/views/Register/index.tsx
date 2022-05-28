import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useNavigate}  from 'react-router-dom'
import  {useDispatch} from 'react-redux'
import  { RegisterAction} from '@/store/action'
import  styles from './register.module.scss'
import  { Username,password }  from '@/utils/MatchingRule'

const RegisterComponent = ()=>{
    // 编程式导航
    const Navigate = useNavigate()
    // 分发动作
    const dispatch = useDispatch()
    // 提交注册
    const verifyRegisterInfo = async (values:any)=>{
        const { password,AffirmPassword } = values
        if(password != AffirmPassword) return Promise.reject(new Error("两次密码不一致"))
        try {
            // @ts-ignore
          const res = await  dispatch(RegisterAction(values))
            if(res.code !== 0) return  message.error(res.message)
            message.success(`${res.message}，2秒后跳转登录页`,2,()=>{
                Navigate('/login')
            })

        }catch (err){
            message.error('网络异常,请稍后重试')
        }

    }

    return (
          <div className={styles.root}>
              <div className={'reg-container'}>
                  <div  className={'reg-box'} >
                      <div className={'title-box'} > </div>
                      <Form
                          size={'large'}
                          name="basic"
                          onFinish={verifyRegisterInfo}
                          validateTrigger={['onBlur']}
                          autoComplete="off">
                          <Form.Item name="username" rules={Username("用户名不能为空")}>
                              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={'请输入账号'} />
                          </Form.Item>

                          <Form.Item name="password" rules={password("密码不能为空")}>
                              <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
                          </Form.Item>
                          {/*AffirmPassword(确认密码)**/}
                          <Form.Item name="AffirmPassword" rules={password("确认密码不能为空")}
                          >
                              <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="确认密码" />
                          </Form.Item>
                              <Button className={'RegisterBtn'}  type="primary" htmlType="submit" block  > 注册</Button>
                          <Button type="link" className='GoLoginPage' onClick={()=>Navigate('/login')}>
                          <p>去登录</p>
                          </Button>
                      </Form>
                  </div>
              </div>
          </div>
)
}

export  default  RegisterComponent
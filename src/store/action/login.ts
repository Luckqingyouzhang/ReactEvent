import  { userApi } from '@/apis/user'
import  { SetToken} from '@/utils/Token'
import  * as types from '@/store/Types/'
//登录用户信息
export const LoginAction = (data:any) => {
    return async ( dispatch:any ) => {
        const { data:res } =  await userApi.login(data)
        //将结果进行返回
        if(res.code !== 0) return res
        // 能走下来证明能成功
        const Token = res.token
        // 如果登录成功则保存Token
        SetToken(Token)
        dispatch({type:types.login,payload:Token})
        return  res
    }
}

export  const RegisterAction = (data:any)=>{
    console.log(data)
    return async (dispatch:any)=>{
        // 解构传递过来的数据
        const {username,password,AffirmPassword:repassword} = data
        const {data:res} = await userApi.Register({username,password,repassword})
        if(res.code !==0) return res
        //能执行下来则注册成功
        dispatch({type:'Register',payload:res})
        return  res
    }


}
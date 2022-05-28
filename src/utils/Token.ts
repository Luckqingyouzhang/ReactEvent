
const TokenName = 'token'

const SetToken = (token:string)=> localStorage.setItem(TokenName,JSON.stringify(token))

const ClearToken = ()=> localStorage.removeItem(TokenName)

const getToken = () => localStorage.getItem(TokenName)? JSON.parse(<string>localStorage.getItem(TokenName)):''

// 转换为 Boolean
const isLogin = ()=> Boolean(getToken())

export  { SetToken ,ClearToken,getToken ,isLogin}
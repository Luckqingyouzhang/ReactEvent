

export  const BaseRulesValidate =  (Required:boolean,BaseMessage:string,trigger:string)=>{
  return {required:Required,message:BaseMessage,validateTrigger:trigger}
}

export  const StaticValidateRules = (rule:any,Message:string,trigger:string)=>{

return {pattern:rule,message:Message,validateTrigger:trigger}
}


export  const Username = (Message:string)=>{
    return [
        BaseRulesValidate(true,Message,'onBlur'),
        StaticValidateRules(/^[A-Za-z][A-Za-z0-9]{5,9}$/,'长度为6-10位的字母或数字且以字母开头','onBlur')
    ]

}
export  const password = (message:string)=>{
    return [
        BaseRulesValidate(true,message,'onBlur'),
        StaticValidateRules(/^\S[A-Za-z0-9]{5,15}$/,'长度为6-15位的非空字符','onBlur'),
    ]
}

export const nickname = [
    BaseRulesValidate(true,'用户昵称不为空','onBlur'),
    StaticValidateRules(/^\S{1,10}$/,'长度为1-10位的非空字符','onBlur'),
]

export const cate_name = [
    BaseRulesValidate(true,'分类名称不能为空','onBlur'),
    StaticValidateRules(/^\S{1,10}$/,'分类名称为1-10位的非空字符','onBlur')
]


export  const cate_alias = [
    BaseRulesValidate(true,'分类别名不为空','onBlur'),
    StaticValidateRules(/^[a-zA-Z0-9]{1,15}$/,'分类别名为1-15位的字母或数字','onBlur')
]
export  const ArticleTitle = [
    BaseRulesValidate(true,'文章标题不能为空','onBlur'),
    StaticValidateRules(/^\S{1,30}$/,'分类别名为1-30位非空字母或数字','onBlur')
]

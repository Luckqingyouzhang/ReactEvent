import {Button, Form, Input} from "antd";
import {cate_alias, cate_name} from "@/utils/MatchingRule";
import {useForm} from "antd/es/form/Form";
/*
* Cancel 返回的事件
* SuccessForm 成功提交的表单事件
* */
const StaticForm = ({Cancel,SuccessForm,CateEach}:any)=>{
    // console.log(ArtCateID)
    const [form] = useForm()
     return (
         <Form
             name="basic"
             initialValues={{cate_name:CateEach?.cate_name??'',cate_alias:CateEach?.cate_alias??'' }}
             validateTrigger={'onBlur'}
             form={form}
             onFinish={ async (value)=>{
                await SuccessForm(value)
                 form.resetFields()}}
             autoComplete="off">
             <Form.Item
                 label="分类名称"
                 name="cate_name"
                 rules={cate_name}>
                 <Input />
             </Form.Item>
             <Form.Item
                 label="分类别名"
                 name="cate_alias"
                 rules={cate_alias}>
                 <Input />
             </Form.Item>
             <Form.Item style={{marginBottom:'0px'}}  wrapperCol={{ offset: 16 }}>
                 <Button  type={'default'} onClick={()=>Cancel(false)}>取消</Button>
                 <Button style={{marginLeft:'15px'}} htmlType={'submit'} type={'primary'}>确定</Button>
             </Form.Item>
         </Form>
     )
}

export default  StaticForm
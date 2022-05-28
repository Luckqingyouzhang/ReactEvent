import {Button, Form, Input, message, Select} from "antd";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // ES6
import avatar from "@/assets/images/avatar.jpg";
import {PlusOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {PublishNewsArticle}  from '@/store/action/'
import {useDispatch} from "react-redux";
import  {ArticleTitle,BaseRulesValidate} from '@/utils/MatchingRule'
import {useForm} from "antd/es/form/Form";

const PublishPage = ({ArticleCate,ClosePublishArticlePage}:any)=>{
    const dispatch =  useDispatch()
    const CoverFile:any = useRef()
    const { Option } = Select;
    const [ArticleForm]:any = useForm()

    const [PreView,setPreView] = useState('')
    const [state,setState]= useState('')
    const [cover_img,setCover_img] = useState('')

    const position = { offset: 0, span: 16 }

    const PublishArt = async (value:object)=>{
        if(!cover_img) return message.error("文章封面不为空")

        const PublishForm:any = {...value,state,cover_img}

        const fd =  new FormData()

        Object.keys(PublishForm).forEach((item:any)=>fd.append(item,PublishForm[item]))

        const res =  await dispatch(PublishNewsArticle(fd))

        if(res.code !==0) message.error(res.message)

        message.success(res.message)

        ClosePublishArticlePage(false)

        ArticleForm.resetFields()

        setPreView("")

        CoverFile.current.value = ''

    }
    const avatarLoading = (e:any)=>{
        const file = e.target.files[0]
        if(file){
            // 存储二进制文件
           setCover_img(file)
            //将文件读取为 url
           setPreView(URL.createObjectURL(file))
        }
        else{
            setPreView('')
        }
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            onFinish={PublishArt}
            form={ArticleForm}
            initialValues={{title:'',cate_id:'',content:'',cover_img:''}}
            autoComplete="off">
            <Form.Item
                label="文章标题"
                name="title"
                rules={ArticleTitle}>
                <Input placeholder={'请填写文章标题'} />
            </Form.Item>
            <Form.Item name="cate_id" label="文章分类"  rules={[{required:true,message:'文章类型必选'}]}>
                <Select placeholder={"请选择分类"} value={null} >
                    {
                        ArticleCate.map((item:any)=><Option key={item.id} value={item.id}>{item.cate_name}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item label={'内容'} name={'content'}  rules={[BaseRulesValidate(true,'内容不能为空','onBlur')]} wrapperCol={position}>
                <ReactQuill  className={' publish-quill'}  theme={'snow'}/>
            </Form.Item>
            <Form.Item  label={'文章封面'} wrapperCol={position}>
                <div className={'ArticleCover'} >
                    <>
                        {
                            PreView? <img src={PreView} alt="" /> :<img src={avatar} alt=""/>
                        }
                    </>
                </div>
            </Form.Item>
            <Form.Item rules={[BaseRulesValidate(true,'文章封面必选','onBlur')]} wrapperCol={{ offset: 4, span: 16}}>
                <input type="file"  ref={CoverFile} onChange={avatarLoading} style={{display:'none'}}/>
                <Button type='dashed' icon={<PlusOutlined />} onClick={()=>{ CoverFile.current.click()} } >选择封面 </Button>
            </Form.Item>
            <Form.Item  wrapperCol={{ offset: 4, span: 16}}>
                <Button type={'primary'} htmlType={'submit'} style={{marginRight:'15px'}} onClick={()=>setState('已发布')}>发布</Button>
                <Button type={'default'} onClick={()=>setState('草稿')} >存为草稿</Button>
            </Form.Item>
        </Form>
    )
}
export  default  PublishPage
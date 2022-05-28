import {Button, Card, Form, Input, message, Modal, Table} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import styles from './ArticleCate.module.scss'
import {useEffect, useState} from "react";
import StaticModal from '@/component/Modal'
import {useDispatch, useSelector} from "react-redux";
import {
    getArticleCate,
    appendArticleCate,
    RemoveArticleCategory,
    ChangePresentArtCate
} from "@/store/action";
import {cate_name, cate_alias} from '@/utils/MatchingRule'
import StaticForm from './component/Form'

const ArticleCateGory = () => {
    /*
    * data数据
    * */
    const Columns: object[] = [
        {
            title: '序号',
            dataIndex: 'id',
            width: '80px',
            align: 'center',
            render: (data: any) => <div> {data} </div>
        },
        {
            title: '分类名称',
            width: '25%',
            dataIndex: 'cate_name',
            align: 'center'
        },
        {
            title: '分类别名',
            width: '25%',
            dataIndex: 'cate_alias',
            align: 'center'
        },
        {
            title: '操作',
            render: (data: any) =>
                <div>
                    <Button size={"small"} type={'primary'} onClick={() => UpdateShowModal(data)}
                            style={{marginRight: '15px'}}>修改</Button>
                    <Button size={"small"} type={'primary'} danger
                            onClick={() => RemoveArticleCate(data.id)}>删除</Button>
                </div>

        },
    ]
    const [addArtModalVisible, setAddArtModalVisible] = useState(false);
    const [ChangeArtModalVisible, setChangeArtModalVisible] = useState(false)
    const ArticleCateList = useSelector((state: any) => state.ArtCateData)
    // 添加分类 返回按钮 关闭modal的状态
    const AddCancelCloseModal = (status: boolean) => setAddArtModalVisible(status)
    // 修改分类 返回按钮 关闭modal的状态
    const ChangeCancelCloseModal = (status: boolean) => setChangeArtModalVisible(status)
    // 文章分类id
    const [ArtCate, setArtCate]: any = useState({})
    /*
    * Hooks
    * */
    const dispatch = useDispatch()
    const {confirm} = Modal;
    useEffect(() => {
        (async () => {
            try {
                await dispatch(getArticleCate())
            } catch (err) {
            }
        })()
    }, [])
    /*
    * function 函数
    * **/
    const AddArticleCate = async (value: any) => {
        setAddArtModalVisible(false)
        //添加完成后更新 重新更新数据
        await dispatch(appendArticleCate(value))
        dispatch(getArticleCate())
    }
    const RemoveArticleCate = (id: number) => {
        if (id === 1 || id == 2) return message.warning('你没有权限删除该分类')
        // 删除文章分类
        confirm({
            title: '删除分类',
            icon: <ExclamationCircleOutlined/>,
            content: '你确定要删除么',
            okText: "确定",
            cancelText: '取消',
            onOk() {
                dispatch(RemoveArticleCategory(id))
                // 重新获取文章分类数据
                dispatch(getArticleCate())
            }
        })
    }
    const UpdateShowModal = (data?: any) => {
        if (data.id === 1 || data.id == 2) return message.warning('你没有权限修改该分类')
        setChangeArtModalVisible(true)
        //Hooks存储对象id
        setArtCate(data)
    }
    const ChangeCateInfo = async (value: any) => {
        const id = ArtCate.id
        await dispatch(ChangePresentArtCate({id, ...value}))
        dispatch(getArticleCate())
        setChangeArtModalVisible(false)
        // 重新更新一下setArtCate 的最新值
        UpdateShowModal()
    }
    return (
        <div className={styles.root}>
            <Card title="文章分类" extra={<Button type={'primary'} onClick={() => {
                setAddArtModalVisible(true)
            }}>添加分类</Button>} style={{width: '100%'}}>
                <Table dataSource={ArticleCateList} rowKey={'id'} pagination={false} size={"middle"} bordered
                       columns={Columns}/>
                {/*封装模态框*/}
                <StaticModal
                    // 两个返回关闭 modal弹框的 函数 一个是 modal 的 X关闭 更改  Cancel={CancelCloseModal} 是Form表单中的确认关闭
                    title="添加文章分类" visible={addArtModalVisible}
                    CancelCloseModal={AddCancelCloseModal}
                    footer={false}
                    content={<StaticForm Cancel={AddCancelCloseModal} SuccessForm={AddArticleCate}> </StaticForm>}
                >
                </StaticModal>
            </Card>
            {/*修改文章分类*/}
            <StaticModal
                visible={ChangeArtModalVisible} title={'修改文章分类'}
                footer={false} CancelCloseModal={ChangeCancelCloseModal}
                content={<StaticForm SuccessForm={ChangeCateInfo} CateEach={ArtCate} Cancel={ChangeCancelCloseModal}> </StaticForm>}
            > </StaticModal>
        </div>
    )
}
export default ArticleCateGory
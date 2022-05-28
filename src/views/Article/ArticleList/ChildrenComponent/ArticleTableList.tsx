import {Button, Table} from "antd";
import  styles from './Scss/ArticleTable.module.scss'
// @ts-ignore
import dayjs from "dayjs";
const ArticleTableList = ({Tables,RemoveArticle}:any)=>{
    const Columns: object[] = [
        {
            title: '文章序号',
            dataIndex: 'id',
            width: '5%',
            align: 'center',

        },
        {
            title: '文章标题',
            dataIndex: 'title',
            align: 'center',
            width:'25%'
        },
        {
            title: '文章分类',
            dataIndex: 'cate_name',
            align: 'center',
        },
        {
            title: '发表时间',
            align: 'center',
            render:(data:any)=>{
             return (
                 <div> {FromDate(data.pub_date)}</div>
             )
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: 'center',
        },
        {
            title: '操作',
            render:(data:any)=>{
                return (
                    <div>
                        <Button size={"small"} type={'primary'} onClick={()=>RemoveArticle(data)}  danger>删除</Button>
                    </div>
                )
            }
        }
    ]
    const FromDate =  (time:string)=> dayjs(time).format('YYYY-MM-DD HH:mm:ss')

    return (
        <div className={styles.root}>
            <Table dataSource={Tables} rowKey={'id'} pagination={false} size={"middle"} bordered columns={Columns} />
        </div>
    )
}
export  default  ArticleTableList
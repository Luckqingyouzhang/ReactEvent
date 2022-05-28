import {Card, Drawer, message, Modal, Pagination, PaginationProps} from "antd";
import {CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getArticleCate, getArticleList} from '@/store/action'
import {ArticleAip}  from '@/apis/Article'
import ArticleListHeader from './ChildrenComponent/ArticleListHeader'
import ArticleTableList  from './ChildrenComponent/ArticleTableList'
import PublishPage  from './ChildrenComponent/PublishPage'
import  styles from './ArticleList.module.scss'

const ArticleList = ()=>{
    const dispatch = useDispatch()
    const { confirm } = Modal;
    const Tables = useSelector((state:any)=>state.ArticleList)

    const ArticleCate = useSelector((state: any) => state.ArtCateData)

    const [DrawerVisible,setDrawerVisible] = useState(false)

    const [ArticlePageSize,setArticlePageSize]  =useState( {pagenum:1, pagesize:10,cate_id:null,state:null})

    const showTotal: PaginationProps['showTotal'] = (total:number) => `共${total}条`;
    useEffect(()=>{
        (async ()=>{
          await dispatch(getArticleList(ArticlePageSize))
          await dispatch(getArticleCate())
        })()
    },[ArticlePageSize])

    const getNowPageData = async (pagenum:number, pagesize:number)=>{
        const {cate_id,state} = ArticlePageSize
        setArticlePageSize( {pagenum,pagesize,cate_id,state})

        await  dispatch(getArticleList(ArticlePageSize))
    }
    // 发布成功关闭 抽屉 并更新主页数据
    const ClosePublishArticlePage = (status:boolean)=>{
        setDrawerVisible(status)

       dispatch(getArticleList(ArticlePageSize))
    }

    // 删除文章
    const RemoveArticle = (data:any)=>{
        confirm({
            title: '删除文章吗',
            icon: <ExclamationCircleOutlined />,
            okText:'确定',
            cancelText :"返回",
            content: '确认删除该文章吗?',
            async onOk() {
                const id = data.id

                const {data:res} = await ArticleAip.RemoveArticle(id)

                if(res.code!==0) return message.error(res.message)

                message.success(res.message)

                dispatch(getArticleList(ArticlePageSize))
            },
        });
    }

    // 筛选文章
    const ScreenCate = (cate_id:any,state:any)=>{
        const {pagenum,pagesize} = ArticlePageSize

        setArticlePageSize( {pagenum,pagesize,cate_id,state})

        dispatch(getArticleList(ArticlePageSize))
    }
    // 重置文章

    const CommitResetArticles = ()=>{

        dispatch(getArticleList( {pagenum:1, pagesize:10,cate_id:null,state:null}))

    }

 return (
     <div className={styles.root}>
         <Card title="文章列表" >
             <ArticleListHeader CommitResetArticles={CommitResetArticles} ScreenCate={ScreenCate} PublishArticle={(visible:boolean)=>setDrawerVisible(visible)} ArticleCate={ArticleCate}/>

             <ArticleTableList RemoveArticle={RemoveArticle} Tables={Tables.data} />

             <Pagination onChange={getNowPageData}
              size="small" showTotal={showTotal}
               pageSizeOptions={[3, 5, 10, 20]}
               current={ArticlePageSize.pagenum} pageSize={ArticlePageSize.pagesize}
               defaultCurrent={ArticlePageSize.pagenum} defaultPageSize={ArticlePageSize.pagesize}
               total={Tables.total}  showSizeChanger  showQuickJumper   />

         </Card>
         <Drawer className={styles.root} closable={false} height={'100%'}
                 extra={<a onClick={()=>setDrawerVisible(false)}><CloseOutlined/>关闭</a>} title="发布文章"
                 visible={DrawerVisible} placement={'top'} >
             <PublishPage ArticleCate={ArticleCate} ClosePublishArticlePage={ClosePublishArticlePage}/>
         </Drawer>


     </div>


 )
}
export  default  ArticleList
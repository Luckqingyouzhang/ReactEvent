
import {Button, Select} from "antd";
import  styles from './Scss/ArticleHeader.module.scss'
import {useState} from "react";
const ArticleListHeader = ({ArticleCate,PublishArticle,ScreenCate,CommitResetArticles}:any)=>{
    const { Option } = Select;
    const [cate_id,SetCate_id] = useState(null)
    const [state,Setstate] = useState(null)

    const resetArticles  = ()=>{
        CommitResetArticles()
        SetCate_id(null)
        Setstate(null)
    }
    return (
        <div className={styles.root}>
            <div className={'ArticleListHeader'}>
                <span>文章分类：</span>
                <Select  placeholder={"请选择分类"}  value={cate_id}  onChange={(e)=>SetCate_id(e)}  style={{ width: 150, marginRight:'15px' }}>
                    {
                        ArticleCate.map((item:any)=><Option key={item.id} value={item.id}>{item.cate_name} </Option>)
                    }
                </Select>
                <span>发布状态：</span>
                <Select placeholder={"请选择状态"} value={state}  onChange={(e)=>Setstate(e)} style={{ width: 150, marginRight:'15px' }}>
                    <Option value={'已发布'}>{'已发布'}</Option>
                    <Option value={'草稿'}>{'草稿'}</Option>
                </Select>
                <Button type={'primary'} style={{ marginRight:'15px' }} onClick={()=>ScreenCate(cate_id,state)}>筛选</Button>
                <Button type={'default'} onClick={()=>resetArticles()}>重置</Button>
                <Button className={'publishedArt'} type={'primary'} onClick={()=>PublishArticle(true)}>发表文章</Button>
            </div>
        </div>
    )
}
export default ArticleListHeader
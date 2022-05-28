import {Spin} from 'antd'
import styles from './loading.module.scss'
const Loading =  () =>{
    return(
        <div className={styles.root}>
            <Spin size="large" className={'example'} tip={'Loading'} spinning={true}> </Spin>
        </div>
    )

}
export  default  Loading
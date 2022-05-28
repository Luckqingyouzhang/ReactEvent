import { Modal} from "antd";

function StaticModal<StaticModalParams>({...data}){
    const {title,visible,SureCloseModal,CancelCloseModal,footer}:any = {...data}
    return(
        <Modal
        title={title} visible={visible}
        footer={footer}
        okText={'确定'}
        cancelText={"返回"}
        onOk={()=>SureCloseModal(false)}
        onCancel={()=>CancelCloseModal(false)}
        >
        {data.content}
        </Modal>
    )
}
export  default StaticModal
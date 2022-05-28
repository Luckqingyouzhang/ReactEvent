import { Routes} from 'react-router-dom'
import {RenderRouterView}  from '@/router/RouterView/RouterView'
const App = () => {
    // const loading = useSelector((state:any) => state.loading )
    return (
        // <>{            loading?(
        //         <Loading/>
        //     ):(
                <div style={{height:'100%'}}>
                    <Routes>
                        { RenderRouterView }
                    </Routes>

                </div>
            // )
        // }
        // </>
    )
}


export default App

import {BrowserRouter, Route, Routes} from "react-router-dom";
import FpsRootArea from "../component/fps/fpsRootArea";
import SslRootArea from "../component/ssl/sslRootArea";

const Router = () => {


    return(

        <BrowserRouter basename={"/bjapi"}>
            <Routes>
                <Route path={"/fps"} element={<FpsRootArea/>}/>
                <Route path={"/ssl"} element={<SslRootArea/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default Router
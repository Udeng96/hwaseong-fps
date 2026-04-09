import {combineReducers} from "redux";
import RightServerStore from "./fps/rightServerStore";
import TopServerStore from "./top/topServerStore";
import CommonServerStore from "./common/commonServerStore";
import RightPanelStore from "./ssl/rightPanelStore";

const ServerRootStore = combineReducers({
    fpsRight : RightServerStore.reducer,
    top : TopServerStore.reducer,
    common : CommonServerStore.reducer,
    sslRight : RightPanelStore.reducer

})

export default ServerRootStore;
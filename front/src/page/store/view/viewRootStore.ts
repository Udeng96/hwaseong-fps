import {combineReducers} from "redux";
import gisViewStore from "./fps/gisViewStore";
import rightViewStore from "./fps/rightViewStore";
import commonViewStore from "./common/commonViewServer";
import sslViewStore from "./ssl/sslViewStore";
import sslGisViewStore from "./ssl/gisViewStore";

const ViewRootStore = combineReducers({
    fpsGis : gisViewStore.reducer,
    fpsRight : rightViewStore.reducer,
    common : commonViewStore.reducer,
    sslRight : sslViewStore.reducer,
    sslGis : sslGisViewStore.reducer
})

export default ViewRootStore;
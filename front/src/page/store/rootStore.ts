import {combineReducers} from "redux";
import ViewRootStore from "./view/viewRootStore";
import ServerRootStore from "./server/serverRootStore";

const rootStore = combineReducers({
    view : ViewRootStore,
    server : ServerRootStore
})

export type RootState = ReturnType<typeof rootStore>
export default rootStore;
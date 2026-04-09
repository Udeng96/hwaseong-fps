import {all,fork} from "redux-saga/effects";
import FpsSaga from "./fps/fpsSaga";
import TopSaga from "./top/topSaga";
import CommonSaga from "./common/commonSaga";
import SslSaga from "./ssl/sslSaga";

export default function* rootSaga(){
    yield all([
        fork(FpsSaga),
        fork(TopSaga),
        fork(CommonSaga),
        fork(SslSaga)
    ])
}
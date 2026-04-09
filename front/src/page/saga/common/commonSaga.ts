import {CctvData} from "../../../config/interface/commonInterface";
import {fetchCctvList} from "../apis/commonApis";
import {call, put, takeLatest} from "redux-saga/effects";
import {updateCctvList} from "../../store/server/common/commonServerStore";
import {types} from "../actions/commonActions";

const requestCctvList = function*(){
    try{
        let response : CctvData[] =  yield call(fetchCctvList);
        yield put(updateCctvList(response));
        // console.log("response ", response)
    }catch (e){
        console.log("CctvList Error:",e)
    }
}

export default function* CommonSaga(){
    yield takeLatest(types.REQUEST_GET_CCTV_LIST,requestCctvList);
}
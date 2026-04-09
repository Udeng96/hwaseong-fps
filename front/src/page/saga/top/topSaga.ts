import {PayloadAction} from "@reduxjs/toolkit";
import {UserInfo} from "../../../config/interface/commonInterface";
import {call, put, takeLatest} from "redux-saga/effects";
import {fetchUserInfo} from "../apis/topApis";
import {types} from "../actions/topActions";
import {updateUserInfo} from "../../store/server/top/topServerStore";
import config, {IS_DEV} from "../../../config/config";

const requestUserInfo = function*(){
    try{

        let token = sessionStorage.getItem("token") as string;
        let user : UserInfo = yield call(fetchUserInfo, token);

        if (IS_DEV){
            user = {
                token : 'dev',
                userName : '관리자',
                loginId : 'manager',
                userType : '001',
                cpNo : '010-2222-2222'
            }
        }

        if (user){

            yield put(updateUserInfo(user));

        }else{

            // user 정보가 없으면 oms 페이지로 향한다.
            window.location.href = config.PLATFORM.OMS.OMS_URL;

        }
    }catch (e){
        if (!IS_DEV){
            window.location.href = config.PLATFORM.OMS.OMS_URL;
        }
        console.log("e:",e);

    }

}

export default function* TopSaga(){
    yield takeLatest(types.REQUEST_GET_USER_INFO, requestUserInfo);
}

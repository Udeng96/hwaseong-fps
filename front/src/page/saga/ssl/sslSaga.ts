import {call, put, takeLatest} from "redux-saga/effects";
import {fetchGetDevice} from "../apis/sslApis";
import {DeviceResponseData} from "../../../config/interface/sslInterface";
import {types} from "../actions/sslActions";
import {updateDeviceList} from "../../store/server/ssl/rightPanelStore";

const requestGetDevice = function* () {
    try {
        const responses: DeviceResponseData[] = yield call(fetchGetDevice);
        // console.log("responses", responses)

        let newResponse: DeviceResponseData[] = [
            {
                dvcId: 21,
                dvcNm: "진안동 525-37",
                location: "화성시 진안동 525-37 주택가 골목",
                lat : "37.2082889973254",
                lng : "127.034129305522"
            },
            {
                dvcId: 22,
                dvcNm: "병점동 345-129",
                location: "화성시 병점동 345-129 경기아파트 골목길",
                lat : "37.2084914348922",
                lng : "127.037501781101"
            },
            {
                dvcId: 23,
                dvcNm: "병점동 255-29",
                location: "화성시 병점동 348-10(병점-04744)",
                lat : "37.2069688292239",
                lng : "127.036670903354"
            },
        ]

        responses.map((item)=>{
            newResponse.push(item);
        })

        yield put(updateDeviceList(newResponse))
    } catch (e) {
        console.log("e:", e);
    }
}

export default function* SslSaga() {
    yield takeLatest(types.REQUEST_GET_DEVICE_LIST, requestGetDevice);
}
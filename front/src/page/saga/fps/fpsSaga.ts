import {PayloadAction} from "@reduxjs/toolkit";
import {
    AnalyticVisitorCountData,
    AnalyticVisitorResponse, MigrationResponse,
    RegionResponse,
    StayTimeResponse,
    TimeParam, VisitorAgoData, VisitorParam,
    VisitorPredictData,
    VisitorResponse
} from "../../../config/interface/fpsInterface";
import {
    fetchExcelDownload,
    fetchLastVisitorCountList,
    fetchMigrationList,
    fetchRegionList,
    fetchStayTime,
    fetchVisitorCountList
} from "../apis/fpsApis";
import {call, put, takeLatest, takeEvery, delay, takeLeading} from "redux-saga/effects";
import {
    updateMigrationInfoList, updateMigrationListLoadComplete,
    updateRegionList,
    updateRegionOptions,
    updateStayTime,
    updateVisitorDayAgoList,
    updateVisitorDayPredictList,
    updateVisitorList, updateVisitorListLoadComplete,
    updateVisitorMonthAgoList,
    updateVisitorMonthPredictList,
    updateVisitorWeekAgoList,
    updateVisitorWeekPredictList
} from "../../store/server/fps/rightServerStore";
import {types} from "../actions/fpsActions";
import {SelectOption} from "../../../config/interface/commonInterface";
import {VISITOR_ANALYTIC_TYPE} from "../../../config/const/fpsConst";

const requestStayTime = function* (action: PayloadAction<TimeParam>) {
    try {

        let response: StayTimeResponse = yield call(fetchStayTime, action.payload);
        let newResponse: StayTimeResponse = {
            durFrom1To5M: Math.round(response.durFrom1To5M),
            durFrom5To10M: Math.round(response.durFrom5To10M),
            durFrom10To20M: Math.round(response.durFrom10To20M),
            durFrom20To40M: Math.round(response.durFrom20To40M),
            durFrom40To60M: Math.round(response.durFrom40To60M),
            durOver1H: Math.round(response.durOver1H)
        }
        yield put(updateStayTime(newResponse));


    } catch (e) {
        console.log("e");
    }
}

const requestRegionList = function* () {
    try {
        let responses: RegionResponse[] = yield call(fetchRegionList);

        let regionSelectList: SelectOption[] = [];

        responses.map((response) => {
            let selectOption: SelectOption = {
                value: response.regionId,
                label: response.name
            }

            if (selectOption.value !== '0') {
                regionSelectList.push(selectOption);
            }

        })

        yield put(updateRegionList(responses));
        yield put(updateRegionOptions(regionSelectList));

    } catch (e) {
        console.log("e:", e);
    }
}


const requestVisitorCountList = function* (action: PayloadAction<VisitorParam>) {
    try {

        yield put(updateVisitorListLoadComplete(false));

        let response: VisitorResponse[] = yield call(fetchVisitorCountList, action.payload);

        yield put(updateVisitorList(response));

        yield delay(2000);
        yield put(updateVisitorListLoadComplete(true));


    } catch (e) {
        console.log("e:", e);
    }
}

// const requestLatestVisitorCountList = function* (action: PayloadAction<string>) {
//     try {
//
//         yield put(updateVisitorListLoadComplete(false));
//
//         let response: VisitorResponse[] = yield call(fetchLatestVisitorCountList, action.payload);
//
//         yield put(updateVisitorList(response));
//
//         yield delay(2000);
//         yield put(updateVisitorListLoadComplete(true));
//
//
//     } catch (e) {
//         console.log("e:", e);
//     }
// }

const requestMigrationList = function* (action: PayloadAction<TimeParam>) {

    try {

        yield put(updateMigrationListLoadComplete(false));
        let response: MigrationResponse[] = yield call(fetchMigrationList, action.payload);
        yield put(updateMigrationInfoList(response));

        yield delay(2000);
        yield put(updateMigrationListLoadComplete(true));

    } catch (e) {
        console.log("e:", e);
    }
}

const requestVisitorAnalyticList = function* (action: PayloadAction<string>) {
    try {
        let response: AnalyticVisitorResponse[] = yield call(fetchLastVisitorCountList, action.payload);
        let visitorList: AnalyticVisitorCountData[] = response[0].visitorPredictCountData;
        let lastDayList: VisitorAgoData[] = [];
        let lastWeekList: VisitorAgoData[] = [];
        let lastMonthList: VisitorAgoData[] = [];
        let predictDayList: VisitorPredictData[] = [];
        let predictWeekList: VisitorPredictData[] = [];
        let predictMonthList: VisitorPredictData[] = [];


        if (visitorList.length > 0) {
            visitorList.map((data, index) => {
                if (data.region !== 0) {

                    let lastData: VisitorAgoData = {
                        region: data.region,
                        count: data.count,
                        previous: data.previous
                    };

                    let predictData: VisitorPredictData = {
                        region: data.region,
                        count: data.count,
                        prediction: data.predictUpper
                    }
                    if (action.payload === VISITOR_ANALYTIC_TYPE.day) {

                        lastDayList.push(lastData);
                        predictDayList.push(predictData);

                    } else if (action.payload === VISITOR_ANALYTIC_TYPE.week) {
                        lastWeekList.push(lastData);
                        predictWeekList.push(predictData);
                    } else {
                        lastMonthList.push(lastData);
                        predictMonthList.push(predictData);
                    }
                }
            })
        }

        if (action.payload === VISITOR_ANALYTIC_TYPE.day) {
            yield put(updateVisitorDayAgoList(lastDayList));
            yield put(updateVisitorDayPredictList(predictDayList));
        } else if (action.payload === VISITOR_ANALYTIC_TYPE.week) {
            yield put(updateVisitorWeekAgoList(lastWeekList));
            yield put(updateVisitorWeekPredictList(predictWeekList));
        } else {
            yield put(updateVisitorMonthAgoList(lastMonthList));
            yield put(updateVisitorMonthPredictList(predictMonthList));
        }


    } catch (e) {
        console.log("e:", e);
    }
}

const requestExcelDownload = function* () {
    try {
        yield call(fetchExcelDownload);
    } catch (e) {

        console.log("e:", e);
    }
}


export default function* FpsSaga() {
    yield takeEvery(types.REQUEST_GET_REGION_LIST, requestRegionList);
    yield takeLatest(types.REQUEST_GET_VISITOR_COUNT_LIST, requestVisitorCountList);
    // yield takeLatest(types.REQUEST_GET_VISITOR_LATEST_COUNT_LIST, requestLatestVisitorCountList);
    yield takeEvery(types.REQUEST_GET_VISITOR_ANALYTIC_LIST, requestVisitorAnalyticList);
    yield takeLatest(types.REQUEST_GET_MIGRATION_LIST, requestMigrationList);
    yield takeLeading(types.REQUEST_GET_STAY_TIME, requestStayTime);
    yield takeLatest(types.REQUEST_GET_EXCEL_DOWNLOAD, requestExcelDownload)

}
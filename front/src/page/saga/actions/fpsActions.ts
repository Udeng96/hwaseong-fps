import {createAction} from "@reduxjs/toolkit";
import {LastParam, RegionResponse, TimeParam, VisitorParam} from "../../../config/interface/fpsInterface";

const types = {
    REQUEST_GET_STAY_TIME  : `REQUEST_GET_STAY_TIME`,
    REQUEST_GET_REGION_LIST : `REQUEST_GET_REGION_LIST`,
    REQUEST_GET_VISITOR_COUNT_LIST : `REQUEST_GET_VISITOR_COUNT_LIST`,
    REQUEST_GET_VISITOR_LATEST_COUNT_LIST : `REQUEST_GET_VISITOR_LATEST_COUNT_LIST`,
    REQUEST_GET_VISITOR_ANALYTIC_LIST : `REQUEST_GET_VISITOR_ANALYTIC_LIST`,
    REQUEST_GET_MIGRATION_LIST : `REQUEST_GET_MIGRATION_LIST`,
    REQUEST_GET_EXCEL_DOWNLOAD : `REQUEST_GET_EXCEL_DOWNLOAD`,
}

const actions = {
    requestGetStayTime : createAction<TimeParam>(types.REQUEST_GET_STAY_TIME),
    requestGetRegionList : createAction(types.REQUEST_GET_REGION_LIST),
    requestGetVisitorCountList : createAction<VisitorParam>(types.REQUEST_GET_VISITOR_COUNT_LIST),
    // requestGetLatestVisitorCountList : createAction<string>(types.REQUEST_GET_VISITOR_LATEST_COUNT_LIST),
    requestGetVisitorAnalyticList : createAction<string>(types.REQUEST_GET_VISITOR_ANALYTIC_LIST),
    requestGetMigrationList : createAction<TimeParam>(types.REQUEST_GET_MIGRATION_LIST),
    requestGetExcelDownload : createAction(types.REQUEST_GET_EXCEL_DOWNLOAD),
}

export {types, actions}
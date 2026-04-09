import {
    MigrationResponse,
    RegionResponse,
    StayTimeResponse, VisitorAgoData,
    VisitorPredictData,
    VisitorResponse
} from "../../../../config/interface/fpsInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SelectOption} from "../../../../config/interface/commonInterface";

interface RightServer{
    stayTime : StayTimeResponse | null,
    regionList : RegionResponse[],
    regionOptions : SelectOption[],
    visitorList : VisitorResponse[],
    visitorDayAgoList : VisitorAgoData[],
    visitorWeekAgoList : VisitorAgoData[],
    visitorMonthAgoList : VisitorAgoData[],
    visitorDayPredictList : VisitorPredictData[],
    visitorWeekPredictList : VisitorPredictData[],
    visitorMonthPredictList : VisitorPredictData[],
    migrationInfoList : MigrationResponse[],
    isStayTimeLoadComplete : boolean,
    isVisitorListLoadComplete : boolean,
    isMigrationListLoadComplete : boolean,


}

const initialState : RightServer = {
    stayTime : null,
    regionList : [],
    regionOptions : [],
    visitorList : [],
    visitorDayAgoList : [],
    visitorWeekAgoList : [],
    visitorMonthAgoList : [],
    visitorDayPredictList : [],
    visitorWeekPredictList : [],
    visitorMonthPredictList : [],
    migrationInfoList : [],
    isStayTimeLoadComplete : false,
    isVisitorListLoadComplete : false,
    isMigrationListLoadComplete : false,
}

const rightServerStore = createSlice({
    name : 'rightServerStore',
    initialState,
    reducers : {
        updateStayTime : (state:RightServer=initialState, action : PayloadAction<StayTimeResponse|null>)=>{
            return{
                ...state,
                stayTime : action.payload
            }
        },
        updateRegionList : (state:RightServer = initialState, action : PayloadAction<RegionResponse[]>) => {
            return{
                ...state,
                regionList : action.payload
            }
        },
        updateRegionOptions : (state:RightServer = initialState, action: PayloadAction<SelectOption[]>) => {
            return{
                ...state,
                regionOptions : action.payload
            }
        },
        updateVisitorList : (state:RightServer = initialState, action : PayloadAction<VisitorResponse[]>) => {
            return{
                ...state,
                visitorList : action.payload
            }
        },
        updateVisitorDayAgoList : (state:RightServer = initialState, action:PayloadAction<VisitorAgoData[]>) => {

            return{
                ...state,
                visitorDayAgoList : action.payload
            }
        },
        updateVisitorWeekAgoList : (state:RightServer = initialState, action:PayloadAction<VisitorAgoData[]>) => {
            return{
                ...state,
                visitorWeekAgoList : action.payload
            }
        },
        updateVisitorMonthAgoList : (state:RightServer = initialState, action:PayloadAction<VisitorAgoData[]>) => {
            return{
                ...state,
                visitorMonthAgoList : action.payload
            }
        },
        updateVisitorDayPredictList : (state:RightServer = initialState, action:PayloadAction<VisitorPredictData[]>) => {
            return{
                ...state,
                visitorDayPredictList : action.payload
            }
        },
        updateVisitorWeekPredictList : (state:RightServer = initialState, action:PayloadAction<VisitorPredictData[]>) => {
            return{
                ...state,
                visitorWeekPredictList : action.payload
            }
        },
        updateVisitorMonthPredictList : (state:RightServer = initialState, action:PayloadAction<VisitorPredictData[]>) => {

            return{
                ...state,
                visitorMonthPredictList : action.payload
            }
        },
        updateMigrationInfoList : (state:RightServer = initialState, action:PayloadAction<MigrationResponse[]>) => {
            return{
                ...state,
                migrationInfoList : action.payload
            }
        },
        updateVisitorListLoadComplete : (state: RightServer = initialState, action : PayloadAction<boolean>) => {
            return{
                ...state,
                isVisitorListLoadComplete : action.payload,
            }
        },
        updateMigrationListLoadComplete : (state: RightServer = initialState, action : PayloadAction<boolean>) => {
            return{
                ...state,
                isMigrationListLoadComplete : action.payload,
            }
        },
        updateStayTimeLoadComplete : (state: RightServer = initialState, action : PayloadAction<boolean>) => {
            return{
                ...state,
                isStayTimeLoadComplete : action.payload,
            }
        }

    }
})


export const {
    updateStayTime,
    updateRegionList,
    updateRegionOptions,
    updateVisitorList,
    updateVisitorDayPredictList,
    updateVisitorWeekPredictList,
    updateVisitorMonthPredictList,
    updateVisitorDayAgoList,
    updateVisitorWeekAgoList,
    updateVisitorMonthAgoList,
    updateMigrationInfoList,
    updateStayTimeLoadComplete,
    updateVisitorListLoadComplete,
    updateMigrationListLoadComplete,
} = rightServerStore.actions

export default rightServerStore
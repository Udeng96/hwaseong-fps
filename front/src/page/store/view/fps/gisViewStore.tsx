import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HS_POS} from "../../../../config/config";
import {LatLngTuple} from "leaflet";
import {GIS_DATE_OPTION, GIS_FUNC_MODE} from "../../../../config/const/fpsConst";
import {TimeParam, VisitorPopupData} from "../../../../config/interface/fpsInterface";
import moment from "moment";
import {CctvData} from "../../../../config/interface/commonInterface";

interface GisView {
    zoomLevel : number, // zoom level
    gisFuncMode : string, // 지도 기능
    gisCenter : LatLngTuple,
    activeDateOption : string,
    activeDate : TimeParam,
    playCctv : CctvData | null,
    activeCctvMarker : String | null,
    activeClusterMarkerCctvList : CctvData[];
    activeClusterLatLng : [number, number] | null,
    isActiveCctvMarker : boolean,
    activeVisitorMarker : number | null,
    activeVisitorPopup : VisitorPopupData | null,
    activePtzCctvInfo : CctvData | null,

}

const initialState : GisView = {
    zoomLevel : 17,
    gisFuncMode : GIS_FUNC_MODE.N ,
    gisCenter : [HS_POS[0],HS_POS[1]],
    activeDateOption : GIS_DATE_OPTION.T,
    activeDate : {startDtm:moment().format('YYYY-MM-DD'), endDtm:moment().format('YYYY-MM-DD')},
    playCctv : null,
    activeCctvMarker : null,
    activeClusterMarkerCctvList : [],
    activeClusterLatLng : null,
    isActiveCctvMarker : false,
    activeVisitorMarker : null,
    activeVisitorPopup : null,
    activePtzCctvInfo : null,
}

const gisViewStore = createSlice({
    name : 'gisViewStore',
    initialState,
    reducers : {
        updateZoomLevel : (state: GisView = initialState, action : PayloadAction<number>) => {
            return{
                ...state,
                zoomLevel : action.payload
            }
        },
        updateGisFuncMode : (state: GisView = initialState, action : PayloadAction<string>) => {

            // console.log("mode:::::",action.payload);
            return{
                ...state,
                gisFuncMode : action.payload
            }
        },
        updateGisCenter : (state: GisView = initialState, action : PayloadAction<LatLngTuple>) => {
            return{
                ...state,
                gisCenter : action.payload
            }
        },
        updateActiveDateOption : (state : GisView = initialState, action : PayloadAction<string>) => {
            return{
                ...state,
                activeDateOption : action.payload
            }
        },
        updateActiveDate : (state : GisView = initialState, action : PayloadAction<TimeParam>) => {
            return{
                ...state,
                activeDate : action.payload
            }
        },
        updatePlayCctv : (state: GisView = initialState, action : PayloadAction<CctvData | null>) => {

            return{
                ...state,
                playCctv : action.payload
            }
        },
        updateActiveCctvMarker : (state : GisView = initialState, action : PayloadAction<String | null>) => {
            return{
                ...state,
                activeCctvMarker : action.payload
            }
        },
        updateActiveClusterMarkerCctvList : (state : GisView = initialState, action: PayloadAction<CctvData[]>) => {
            return{
                ...state,
                activeClusterMarkerCctvList : action.payload
            }
        },
        updateActiveClusterLatLng : (state:GisView = initialState, action : PayloadAction<[number, number] | null>) => {

            return{
                ...state,
                activeClusterLatLng : action.payload
            }
        },
        updateIsActiveCctvMarker : (state : GisView = initialState, action : PayloadAction<boolean>) => {

            return{
                ...state,
                isActiveCctvMarker : action.payload
            }
        },
        updateActiveVisitorMarker : (state: GisView = initialState, action : PayloadAction<number|null>) => {

            return{
                ...state,
                activeVisitorMarker : action.payload
            }

        },
        updateActiveVisitorPopup : (state:GisView = initialState,  action:PayloadAction<VisitorPopupData | null >) => {
            return{
                ...state,
                activeVisitorPopup : action.payload,
            }
        },
        updateActivePtzCctvInfo : (state : GisView = initialState, action: PayloadAction<CctvData | null >) => {
            return{
                ...state,
                activePtzCctvInfo : action.payload
            }
        }
    }
})



export const {
    updateZoomLevel,
    updateGisFuncMode,
    updateActiveDateOption,
    updateActiveDate,
    updatePlayCctv,
    updateActiveCctvMarker,
    updateActiveClusterMarkerCctvList,
    updateActiveClusterLatLng,
    updateIsActiveCctvMarker,
    updateActiveVisitorMarker,
    updateActiveVisitorPopup,
    updateActivePtzCctvInfo,
} = gisViewStore.actions

export default gisViewStore
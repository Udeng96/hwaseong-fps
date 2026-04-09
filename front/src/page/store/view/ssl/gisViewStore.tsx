import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HS_POS} from "../../../../config/config";
import {LatLngTuple} from "leaflet";
import {GIS_FUNC_MODE} from "../../../../config/const/fpsConst";
import {CctvData} from "../../../../config/interface/commonInterface";

interface GisView {
    zoomLevel : number, // zoom level
    gisFuncMode : string, // 지도 기능
    gisCenter : LatLngTuple,
    playCctv : CctvData | null,
    activeCctvMarker : String | null,
    activeClusterMarkerCctvList : CctvData[];
    activeClusterLatLng : [number, number] | null,
    isActiveCctvMarker : boolean,

}

const initialState : GisView = {
    zoomLevel : 17,
    gisFuncMode : GIS_FUNC_MODE.N ,
    gisCenter : [HS_POS[0],HS_POS[1]],
    playCctv : null,
    activeCctvMarker : null,
    activeClusterMarkerCctvList : [],
    activeClusterLatLng : null,
    isActiveCctvMarker : false,

}

const sslGisViewStore = createSlice({
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
        }
    }
})



export const {
    updateZoomLevel,
    updateGisFuncMode,
    updatePlayCctv,
    updateActiveCctvMarker,
    updateActiveClusterMarkerCctvList,
    updateActiveClusterLatLng,
    updateIsActiveCctvMarker,
} = sslGisViewStore.actions

export default sslGisViewStore
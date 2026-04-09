import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HS_POS} from "../../../../config/config";
import {LatLngTuple} from "leaflet";
import {GIS_FUNC_MODE} from "../../../../config/const/fpsConst";
import {DeviceResponseData} from "../../../../config/interface/sslInterface";

interface SslView {
    activeDevice : DeviceResponseData | null
    activeDeviceList : DeviceResponseData | null
}

const initialState : SslView = {
    activeDevice : null,
    activeDeviceList : null
}

const sslViewStore = createSlice({
    name : 'sslViewStore',
    initialState,
    reducers : {
        updateActiveDevice : (state: SslView = initialState, action : PayloadAction<DeviceResponseData | null>) => {
            return{
                ...state,
                activeDevice : action.payload
            }
        },
        updateActiveListDevice : (state: SslView = initialState, action : PayloadAction<DeviceResponseData | null>) => {
            return{
                ...state,
                activeDeviceList : action.payload
            }
        },
    }
})

export const {
    updateActiveDevice,
    updateActiveListDevice
} = sslViewStore.actions

export default sslViewStore
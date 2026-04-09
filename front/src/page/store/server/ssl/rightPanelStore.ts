import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DeviceResponseData} from "../../../../config/interface/sslInterface";

interface RightPanelServer{
    deviceResponse : DeviceResponseData[]
}

const initialState : RightPanelServer = {
    deviceResponse : []
}

const rightPanelStore = createSlice({
    name : 'rightPanelStore',
    initialState,
    reducers : {
        updateDeviceList : (state:RightPanelServer=initialState, action : PayloadAction<DeviceResponseData[]>)=>{
            return{
                ...state,
                deviceResponse : action.payload
            }
        },
    }

})

export const {
    updateDeviceList
} = rightPanelStore.actions
export default rightPanelStore
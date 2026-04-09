import {CctvData} from "../../../../config/interface/commonInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommonServer{
    cctvList : CctvData[]
 }

 const initialState : CommonServer = {
    cctvList : []
 }

 const commonServerStore = createSlice({
     name : 'commonServerStore',
     initialState,
     reducers : {
         updateCctvList : (state: CommonServer = initialState, action : PayloadAction<CctvData[]>) =>{
             return{
                 ...state,
                 cctvList : action.payload
             }
         }
     }
 })


export const{
    updateCctvList
} =  commonServerStore.actions

export default commonServerStore
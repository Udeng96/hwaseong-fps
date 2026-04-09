import {UserInfo} from "../../../../config/interface/commonInterface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TopServer{
    userInfo : UserInfo | null,
 }

 const initialState : TopServer = {
    userInfo : null,
 }

 const topServerStore = createSlice({
     name : 'topServerStore',
     initialState,
     reducers : {
         updateUserInfo : (state:TopServer = initialState, action : PayloadAction<UserInfo|null>)=>{
             return{
                 ...state,
                 userInfo : action.payload
             }
         }
     }
 })

export const {
    updateUserInfo
} = topServerStore.actions

export default topServerStore
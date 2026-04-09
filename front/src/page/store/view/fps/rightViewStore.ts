import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RIGHT_ACTIVE_MENU} from "../../../../config/const/fpsConst";
import {SelectOption} from "../../../../config/interface/commonInterface";
import {FloatingData, FromStdData, ToStdData} from "../../../../config/interface/fpsInterface";
import {containsNumber} from "@turf/turf";

interface RightView {
    activeMenu: string,
    activeRegion: SelectOption | null,
    isModalOpen: boolean,
    filterFloatingList: FloatingData[],
    toFloatingList : ToStdData[],
    fromFloatingList : FromStdData[],
    isStayTimeLoadComplete : boolean,
    isVisitorListLoadComplete : boolean,
    isMigrationListLoadComplete : boolean,
    migrationDuration : number,


}

const initialState: RightView = {

    activeMenu: RIGHT_ACTIVE_MENU.F,
    activeRegion: null,
    isModalOpen: false,
    filterFloatingList: [],
    toFloatingList : [],
    fromFloatingList :[],
    isStayTimeLoadComplete : false,
    isVisitorListLoadComplete : false,
    isMigrationListLoadComplete : false,
    migrationDuration : 1,

}

const rightViewStore = createSlice({
    name: 'rightViewStore',
    initialState,
    reducers: {
        updateActiveMenu: (state: RightView = initialState, action: PayloadAction<string>) => {
            return {
                ...state,
                activeMenu: action.payload
            }
        },
        updateActiveRegion: (state: RightView = initialState, action: PayloadAction<SelectOption | null>) => {
            return {
                ...state,
                activeRegion: action.payload
            }
        },
        updateIsModalOpen: (state: RightView = initialState, action: PayloadAction<boolean>) => {

            return {
                ...state,
                isModalOpen: action.payload
            }
        },
        updateFilterFloatingList: (state: RightView = initialState, action: PayloadAction<FloatingData[]>) => {
            return {
                ...state,
                filterFloatingList: action.payload
            }
        },
        updateFromFloatingList : (state : RightView = initialState, action : PayloadAction<FromStdData[]>) => {
            return{
                ...state,
                fromFloatingList : action.payload
            }
        },
        updateToFloatingList : (state: RightView = initialState, action : PayloadAction<ToStdData[]>) => {
            return{
                ...state,
                toFloatingList : action.payload
            }
        },
        updateMigrationDuration : (state: RightView = initialState, action : PayloadAction<number>) => {
            return{
                ...state,
                migrationDuration : action.payload
            }
        }

    }
})

export const {
    updateActiveMenu,
    updateIsModalOpen,
    updateActiveRegion,
    updateFilterFloatingList,
    updateFromFloatingList,
    updateToFloatingList,
    updateMigrationDuration,
} = rightViewStore.actions

export default rightViewStore
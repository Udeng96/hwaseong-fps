import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommonView{
    isFullPlayerOpen : boolean,
    reloadCnt : number,
    activePage : string,
}

const initialState : CommonView = {

    isFullPlayerOpen : false,
    reloadCnt : 0,
    activePage : 'ssl'
}

const commonViewStore = createSlice({
    name : `commonViewStore`,
    initialState,
    reducers : {
        updateFullPlayerOpen :(state:CommonView = initialState, action: PayloadAction<boolean>) => {
            return{
                ...state,
                isFullPlayerOpen : action.payload
            }
        },
        updateReloadCnt : (state:CommonView = initialState, action : PayloadAction<number>) => {
            return {
                ...state,
                reloadCnt: state.reloadCnt + 1
            }
        },
        updateActivePage : (state:CommonView = initialState, action : PayloadAction<string>) => {
            return{
                ...state,
                activePage : action.payload
            }
        }
    }
})

export const{
    updateFullPlayerOpen,
    updateActivePage,
} = commonViewStore.actions

export default commonViewStore;
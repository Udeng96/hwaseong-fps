import {createAction} from "@reduxjs/toolkit";

const types = {
    REQUEST_GET_CCTV_LIST : `REQUEST_GET_CCTV_LIST`
}

const actions = {
    requestGetCctvList : createAction(types.REQUEST_GET_CCTV_LIST)
}

export {types,actions}
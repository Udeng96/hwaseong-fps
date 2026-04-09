import {createAction} from "@reduxjs/toolkit";

const types = {
    REQUEST_GET_DEVICE_LIST : `REQUEST_GET_DEVICE_LIST`
}

const actions = {
    requestGetDeviceList : createAction(types.REQUEST_GET_DEVICE_LIST)
}

export {types, actions}
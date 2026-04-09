import {createAction} from "@reduxjs/toolkit";

const types = {
    REQUEST_GET_USER_INFO: `REQUEST_GET_USER_INFO`,
    REQUEST_LOG_OUT : `REQUEST_LOG_OUT`,
}

const actions = {
    requestGetUserInfo: createAction(types.REQUEST_GET_USER_INFO),
    requestLogOut : createAction<string|null>(types.REQUEST_LOG_OUT),
}

export {types, actions}
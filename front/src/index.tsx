import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RootArea from "./page/component/rootArea";
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import RootStore from "./page/store/rootStore";
import {Reset} from "styled-reset";
import {Provider} from "react-redux";


// 공통 css
import "./public/common/css/common.css";
import "./public/common/css/gis.css";
import "./public/common/css/reset.css";
import "./public/common/css/content.css";
import "./public/common/css/modal.css";
import "./public/common/css/selectBox.css";
import "./public/common/css/datePicker.css";
import "./public/common/css/topBar.css";
import "./public/common/css/react-date-picker.css";
import "./public/common/css/gisClusterPopup.css";
import "./public/common/css/gisIcon.css";
import "./public/common/css/tooltip.css"
import "./public/common/css/gisCctvPopup.css";
import "./public/common/css/scrollStyle.css";
import "./public/common/css/loading.css"

// 인구 CSS

import "./public/dashboard/population/css/population.css";


// 가로등 css
import "./public/dashboard/streetLamp/css/streetLamp.css"
import rootSaga from "./page/saga/rootSaga";




const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: RootStore,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga);

root.render(
    <Provider store={store}>
        <Reset/>
        <RootArea/>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

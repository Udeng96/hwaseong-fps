import React, {useEffect} from "react";
import GisRootArea from "./gis/gisRootArea";
import RightPanelHeader from "./rightPanel/rightPanelHeader";
import StreetLampListArea from "./rightPanel/streetlamp/streetLampListArea";
import {useDispatch} from "react-redux";
import {actions} from "../../saga/actions/sslActions";
import config, {IS_DEV} from "../../../config/config";
import * as CommonActions from "../../saga/actions/commonActions";

const SslRootArea = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.requestGetDeviceList())
        dispatch(CommonActions.actions.requestGetCctvList());
    },[])

    const handleGoFPSBtn = () => {

        const token = sessionStorage.getItem("token") as string;


        if (IS_DEV) {
            if (token === '' || typeof token === 'undefined' || token == null) {

                // token 이 존재하지 않으면 oms 화면으로 돌아간다.
                window.location.href = config.PLATFORM.OMS.OMS_URL;

            } else {

                window.location.href = config.PLATFORM.DASHBOARD.FPS;

            }
        }else{

            window.location.href = config.PLATFORM.DASHBOARD.FPS;

        }

    }

    return(
        <>
            <section className="gis__wrap">
                <div className="gis__area">
                    <GisRootArea/>
                </div>
            </section>
            <section className="content__wrap">
                <RightPanelHeader/>
                <StreetLampListArea/>
            </section>
        </>
    )
}

export default SslRootArea;
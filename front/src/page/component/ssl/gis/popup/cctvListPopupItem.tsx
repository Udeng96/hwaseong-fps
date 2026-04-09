import React from "react";
import {CctvData} from "../../../../../config/interface/commonInterface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {updateActiveCctvMarker, updatePlayCctv} from "../../../../store/view/ssl/gisViewStore";

const CctvListPopupItem = (props:{cctv:CctvData}) => {

    const dispatch = useDispatch();
    const activeMarker = useSelector((state:RootState) => state.view.sslGis.activeCctvMarker);
    // const testCctv = useSelector((state:RootState)=>state.view.fpsR)


    const clickPlayBtn = (e:any) => {

        e.stopPropagation()

        dispatch(updatePlayCctv(props.cctv));

        if (activeMarker){
            dispatch(updateActiveCctvMarker(null));
            }
    }

    return(
        <li>
            <p className="cctv_name">{props.cctv.facNm}</p>
            <button type="button" className="btn_play" onClick={(e) => {
                clickPlayBtn(e)
            }}></button>
            <div className="tooltip_text">{props.cctv.facNm}</div>
        </li>
    )

}

export default CctvListPopupItem
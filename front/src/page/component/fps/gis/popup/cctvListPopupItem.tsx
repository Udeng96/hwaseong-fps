import React from "react";
import {CctvData} from "../../../../../config/interface/commonInterface";
import {useDispatch, useSelector} from "react-redux";
import {updateActiveCctvMarker, updatePlayCctv} from "../../../../store/view/fps/gisViewStore";
import {RootState} from "../../../../store/rootStore";

const CctvListPopupItem = (props:{cctv:CctvData}) => {

    const dispatch = useDispatch();
    const activeMarker = useSelector((state:RootState) => state.view.fpsGis.activeCctvMarker);
    const playCctv = useSelector((state:RootState) => state.view.fpsGis.playCctv);

    const clickPlayBtn = (e: any) => {

        e.stopPropagation();


        let newCctv : CctvData = {
            facId : props.cctv.facId,
            facNm : props.cctv.facNm,
            lat : props.cctv.lat,
            lng : props.cctv.lng,
            mgrNo : props.cctv.mgrNo
        }


        dispatch(updatePlayCctv(newCctv));

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
            < div className="tooltip_text">{props.cctv.facNm}</div>
        </li>
    )

}

export default CctvListPopupItem
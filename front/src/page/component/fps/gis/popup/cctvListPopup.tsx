import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import React from "react";
import {Popup} from "react-leaflet";
import {updateActiveClusterLatLng} from "../../../../store/view/fps/gisViewStore";
import CctvListPopupItem from "./cctvListPopupItem";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";

const  CctvListPopup = () => {

    const dispatch = useDispatch();
    const activeMenu = useSelector((state:RootState) => state.view.fpsRight.activeMenu);
    const activeClusterMarker = useSelector((state:RootState)=>state.view.fpsGis.activeClusterLatLng);
    const activeClusterCctvList = useSelector((state:RootState) => state.view.fpsGis.activeClusterMarkerCctvList);

    const playCctv = useSelector((state:RootState) => state.view.fpsGis.playCctv);

    const clickBtnClose = () => {
        dispatch(updateActiveClusterLatLng(null));
    }

    return(
        <>{

            (activeClusterMarker &&  !playCctv) &&
            activeMenu === RIGHT_ACTIVE_MENU.V &&
            <Popup position = {[activeClusterMarker[0],activeClusterMarker[1]]}>
                <div className="gis_cluster_popup" style={{"display": "block"}}>
                    <button type="button" className="btn_popup_close" onClick={clickBtnClose}></button>
                    <div className="cluster_list_frame">
                        <ul className="cluster_list">
                            {
                                activeClusterCctvList.length > 0 &&
                                activeClusterCctvList.map((cctv)=>(
                                    <CctvListPopupItem cctv={cctv}/>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Popup>

        }
        </>

    )

}
export default CctvListPopup
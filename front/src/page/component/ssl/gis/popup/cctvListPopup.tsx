import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import React from "react";
import {Popup} from "react-leaflet";
import {updateActiveClusterLatLng} from "../../../../store/view/ssl/gisViewStore";
import CctvListPopupItem from "./cctvListPopupItem";
import {MANAGER_TYPE} from "../../../../../config/config";

const CctvListPopup = (props:{userType:string}) => {

    const dispatch = useDispatch();
    const activeClusterMarker = useSelector((state: RootState) => state.view.sslGis.activeClusterLatLng);
    const activeClusterCctvList = useSelector((state: RootState) => state.view.sslGis.activeClusterMarkerCctvList);

    const playCctv = useSelector((state: RootState) => state.view.sslGis.playCctv);


    const clickBtnClose = () => {
        dispatch(updateActiveClusterLatLng(null));
    }

    return (
        <>
            {

                (activeClusterMarker && !playCctv && props.userType===MANAGER_TYPE) &&
                <Popup position={[activeClusterMarker[0], activeClusterMarker[1]]}>
                    <div className="gis_cluster_popup" style={{"display": "block"}}>
                        <button type="button" className="btn_popup_close" onClick={clickBtnClose}></button>
                        <div className="cluster_list_frame">
                            <ul className="cluster_list">
                                {
                                    activeClusterCctvList.length > 0 &&
                                    activeClusterCctvList.map((cctv,index) => (
                                        <CctvListPopupItem key={index} cctv={cctv}/>
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
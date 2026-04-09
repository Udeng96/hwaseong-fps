import {Popup} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {updateFullPlayerOpen} from "../../../../store/view/common/commonViewServer";
import CctvPlayer from "../../../common/cctvPlayer";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";
import {updateActiveCctvMarker, updatePlayCctv} from "../../../../store/view/ssl/gisViewStore";
import {useEffect} from "react";
import {MANAGER_TYPE} from "../../../../../config/config";

const GisPlayerPopup = (props:{userType:string}) => {

    const dispatch = useDispatch();
    const playCctv = useSelector((state: RootState) => state.view.sslGis.playCctv);
    const activeMenu = useSelector((state:RootState) => state.view.sslRight.activeDevice);
    const onClickCloseBtn = () => {

        dispatch(updatePlayCctv(null));
        dispatch(updateActiveCctvMarker(null));

    }

    const onClickExpansionBtn = () => {

        dispatch(updateFullPlayerOpen(true));
        console.log()
    }
    return (
        <>
            {
                (playCctv && props.userType === MANAGER_TYPE) &&
                <Popup position={[Number(playCctv.lng), Number(playCctv.lat)]}>
                    <div className="gis_cctv_popup">
                        <header className="gis_cctv_popup_header">
                            <p className="popup_header_text type_cctv_fixed">{playCctv.facNm}</p>
                            <button type="button" className="btn_popup_close" onClick={onClickCloseBtn}></button>
                        </header>
                        <div className="gis_cctv_popup_body">
                            <div className="cctv_in">
                                {

                                    playCctv &&
                                    <CctvPlayer playCctv={playCctv} isPtz={false}/>

                                }
                            </div>
                            <button type="button" className="btn_expansion" onClick={onClickExpansionBtn}></button>
                        </div>
                    </div>
                </Popup>

            }
        </>

    )

}


export default GisPlayerPopup
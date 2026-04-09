import {useDispatch, useSelector} from "react-redux";
import {useMap} from "react-leaflet";
import {RootState} from "../../../../store/rootStore";
import {updateGisFuncMode, updateIsActiveCctvMarker, updateZoomLevel} from "../../../../store/view/fps/gisViewStore";
import {
    GIS_FUNC_MODE,
    GIS_MAX_ZOOM,
    GIS_MIN_ZOOM,
    RIGHT_ACTIVE_MENU
} from "../../../../../config/const/fpsConst";
import {useEffect, useState} from "react";
import {MANAGER_TYPE} from "../../../../../config/config";

const GisFuncLayer = () => {

    const dispatch = useDispatch();
    const map = useMap();

    const zoomLevel = useSelector((state: RootState) => state.view.fpsGis.zoomLevel);
    const gisMode = useSelector((state: RootState) => state.view.fpsGis.gisFuncMode);
    const isCctvMarkerOn = useSelector((state: RootState) => state.view.fpsGis.isActiveCctvMarker);
    const activeMenu = useSelector((state: RootState) => state.view.fpsRight.activeMenu);
    const userInfo = useSelector((state:RootState)=> state.server.top.userInfo);

    const [userType, setUserType] = useState<String>("003");
    useEffect(()=>{

        if (userInfo){
            setUserType(userInfo.userType);
        }
    },[userInfo])

    // gis 모드 변경
    const handleGisMode = (mode: string) => {

        if (gisMode === mode) {
            dispatch(updateGisFuncMode(GIS_FUNC_MODE.N));
        } else {
            dispatch(updateGisFuncMode(mode));
        }
    }

    useEffect(()=>{
        if (gisMode === GIS_FUNC_MODE.N){
            map.eachLayer((l)=>{
                if(l.options.pane === 'drawLayer'){
                    map.removeLayer(l);
                }
            })
        }
    },[gisMode])

    // gis zoom level 변경
    const handlePlusBtn = () => {
        dispatch(updateZoomLevel(zoomLevel + 1));
    }

    const handleMinusBtn = () => {
        dispatch(updateZoomLevel(zoomLevel - 1));
    }

    return (
        <div className="map-func">
            <div className="map-func__item btn-zoom">
                <button
                    className={`btn-widget btn-widget--zoomin ${zoomLevel === GIS_MAX_ZOOM && 'btn-widget--zoomin--disable'}`}
                    onClick={handlePlusBtn}></button>
                <button
                    className={`btn-widget btn-widget--zoomout ${zoomLevel === GIS_MIN_ZOOM && 'btn-widget--zoomout--disable'}`}
                    onClick={handleMinusBtn}></button>
            </div>
            <div className="map-func__item btn-func">
                <div
                    className={`btn-func__widget btn-func__widget--distanc ${gisMode === GIS_FUNC_MODE.L && 'active'}`}>
                    <button className={`btn-widget btn-widget--distance ${gisMode === GIS_FUNC_MODE.L && 'active'}`}
                            onClick={e => {
                                handleGisMode(GIS_FUNC_MODE.L);
                                e.stopPropagation();
                            }}></button>
                    <div className="gis-tooltip"></div>
                </div>
                <div className={`btn-func__widget btn-func__widget--extent ${gisMode === GIS_FUNC_MODE.G && 'active'}`}>
                    <button className={`btn-widget btn-widget--extent ${gisMode === GIS_FUNC_MODE.G && 'active'}`}
                            onClick={e => {
                                handleGisMode(GIS_FUNC_MODE.G);
                                e.stopPropagation();
                            }}></button>
                    <div className="gis-tooltip"></div>
                </div>
                <div
                    className={`btn-func__widget btn-func__widget--radius ${gisMode === GIS_FUNC_MODE.R && 'active'} `}>
                    <button className={`btn-widget btn-widget--radius ${gisMode === GIS_FUNC_MODE.R && 'active'} `}
                            onClick={e => {
                                handleGisMode(GIS_FUNC_MODE.R);
                                e.stopPropagation();
                            }}></button>
                    <div className="gis-tooltip"></div>
                </div>
                {
                    activeMenu === RIGHT_ACTIVE_MENU.V &&
                    userType === MANAGER_TYPE &&
                    <div
                        className={`btn-func__widget btn-func__widget--cctv_marker ${isCctvMarkerOn && 'active'} `}>
                        <button
                            className={`btn-widget btn-widget--cctv_marker ${isCctvMarkerOn && 'active'}`} onClick={(e) => {
                                dispatch(updateIsActiveCctvMarker(!isCctvMarkerOn));
                                e.stopPropagation();
                            }
                        }></button>
                        <div className="gis-tooltip"></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default GisFuncLayer
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootStore";
import {useEffect} from "react";
import {useMap, useMapEvents} from "react-leaflet";
import {updateZoomLevel} from "../../../store/view/ssl/gisViewStore";

const GisControl = () => {

    const dispatch = useDispatch();
    const map = useMap();
    const zoomLevel = useSelector((state:RootState)=>state.view.fpsGis.zoomLevel);
    const gisCenter = useSelector((state:RootState)=>state.view.fpsGis.gisCenter);


    // zoom level 이 바뀌었을 때 지도 변화
    useEffect(()=>{
        map.setView(map.getCenter(), zoomLevel, {
            animate : true,
            duration : 1,
            easeLinearity : 1,
            noMoveStart : true
        })
    },[zoomLevel])


    // 지도 중심 위치가 변경이 되면 해당 위치로 지도 이동
    useEffect(()=>{
        map.panTo(gisCenter, {animate:false})
    }, [gisCenter])


    // 지도에 관한 이벤트
    useMapEvents({
        zoom : event => {
            let level = event.target._zoom
            // console.log("zoomLevel:",level);
            // console.log("gisCenter:",map.getCenter());

            dispatch(updateZoomLevel(level)); // zoom level이 변화하면 store에 반영
        },
        // click: event => {
        //     console.log("map clicked... event", event)
        // }
    })

    return null;

}

export default GisControl
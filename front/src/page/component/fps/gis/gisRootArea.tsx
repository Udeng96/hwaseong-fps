import LegendLayer from "./layer/legendLayer";
import DateOptionLayer from "./layer/dateOptionLayer";
import GisFuncLayer from "./layer/gisFuncLayer";
import {MapContainer, Pane, TileLayer} from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import {domain, HS_POS, IS_DEV} from "../../../../config/config";
import GisControl from "./gisControl";
import {GIS_FUNC_MODE, GIS_MAX_ZOOM, GIS_MIN_ZOOM, RIGHT_ACTIVE_MENU} from "../../../../config/const/fpsConst";
import DrawLayer from "./layer/drawLayer";
import VisitorMarker from "./marker/visitorMarker";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootStore";
import React from "react";
import {useEffect, useState} from "react";
import VisitLegendLayer from "./layer/visitLegendLayer";
import CctvMarker from "./marker/cctvMarker";
import CctvListPopup from "./popup/cctvListPopup";
import GisPlayerPopup from "./popup/gisPlayerPopup";
import MigrationLayer from "./layer/migrationLayer";
import VisitorCountInfoPopup from "./popup/visitorCountInfoPopup";
import CctvPtzPlayerPopup from "./popup/cctvPtzPlayerPopup";


const GisRootArea = () => {

    const activeMenu = useSelector((state: RootState) => state.view.fpsRight.activeMenu);
    const activeGisMenu = useSelector((state: RootState) => state.view.fpsGis.gisFuncMode);

    const [isMarkerShow, setIsMarkerShow] = useState<boolean>(false);
    const [cluster, setCluster] = useState(null);

    useEffect(() => {
        if (activeMenu === RIGHT_ACTIVE_MENU.F) {
            setIsMarkerShow(false);
        } else {
            setIsMarkerShow(true);
        }
    }, [activeMenu])

    return (

        <section className="gis__wrap">
            <ul className="gis__list">
                <div className="gis__area">
                    {/*leaflet 적용하기 위해선 MapContainer 로 감싸주고 지도에 표출되어야 하는 것은 Pane 을 사용해야함*/}
                    {/*주의할 점이 있는데 css를 따로 적용해주어야 한다.*/}
                    {/*leaflet/dist/leaflet.css를 따로 import 해주지 않으면 화면이 깨져서 나온다.*/}
                    <MapContainer
                        renderer={L.canvas()}
                        zoomControl={false}
                        zoom={18}
                        center={[HS_POS[0], HS_POS[1]]}
                        minZoom={GIS_MIN_ZOOM}
                        maxZoom={GIS_MAX_ZOOM}
                        // crs는 지도마다 표준이 따로 있는 것 같은데 알맞게 지정해 줘야함
                        crs={L.CRS.EPSG3857}
                        doubleClickZoom={false}
                        scrollWheelZoom={true}
                        attributionControl={false}
                        preferCanvas={true}
                        style={{width: '100%', height: '100%', zIndex: '1', borderRadius: '10px'}}
                    >
                        {/*leaflet event control*/}

                        <GisControl/>
                        {/*function layer는 화면에 그려지고 leaflet 기능과도 연관은 있지만 지도 위에 그려지는 것은 아니기에 pane을 사요하지 않는다. */}
                        <GisFuncLayer/>
                        <LegendLayer/>
                        <VisitLegendLayer/>


                        {/*기본 타일 레이어 지정*/}
                        {/*pane은 보통 leaflet 위에 그리고 기능?과 연동해야할 때 상용한다.*/}
                        {/*보통 marker 와 layer( 타일 레이어, draw layer 등 leaflet과 연동이 되어야 할 때 꼭 같이 선언해 줘야한다.*/}
                        <Pane name={"baseMap"} style={{zIndex: 2}}>
                            {
                                <TileLayer key={`vworld_normal_${'0'}`} {...{minZoom: 6, maxZoom: 18}}
                                           url={
                                                // "https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png":
                                                   `http://${domain}/proxy?https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png`
                                           }/> //개발
                            }
                        </Pane>
                        <Pane name={'drawLayer'} style={{zIndex: 10003}}>
                            {
                                activeGisMenu !== GIS_FUNC_MODE.N &&
                                <DrawLayer/>
                            }
                        </Pane>
                        <Pane name={'visitorMarker'}>
                            {
                                isMarkerShow ?
                                    <VisitorMarker/> : ''
                            }
                        </Pane>
                        <Pane name={'visitorPopup'}>
                            <VisitorCountInfoPopup/>
                        </Pane>
                        {

                        }
                        <Pane name={'cctvPtzPlayerPopup'}>
                            <CctvPtzPlayerPopup/>
                        </Pane>
                        <Pane name={'cctvMarker'} style={{zIndex: 10000}}>
                            <CctvMarker setMapCluster={setCluster}/>
                        </Pane>
                        <Pane name={'cctvClusterPopup'} style={{zIndex: 10001}}>
                            <CctvListPopup/>
                        </Pane>
                        <Pane name={'cctvPlayerPopup'} style={{zIndex: 100002}}>
                            <GisPlayerPopup/>
                        </Pane>
                        <MigrationLayer/>
                    </MapContainer>
                </div>

                <li className="gis__item active">
                    <DateOptionLayer/>
                </li>
            </ul>
        </section>

    )

}

export default GisRootArea
import {MapContainer, Pane, TileLayer} from "react-leaflet";
import L from "leaflet";
import {domain, HS_POS, IS_DEV, MANAGER_TYPE} from "../../../../config/config";
import {GIS_MAX_ZOOM, GIS_MIN_ZOOM} from "../../../../config/const/fpsConst";
import GisControl from "./gisControl";
import React, {useEffect, useState} from "react";
import GisFuncLayer from "./layer/gisFuncLayer";
import DrawLayer from "./layer/drawLayer";
import DeviceMarker from "./marker/deviceMarker";
import CctvMarker from "./marker/cctvMarker";
import CctvListPopup from "./popup/cctvListPopup";
import GisPlayerPopup from "./popup/gisPlayerPopup";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootStore";


const GisRootArea = () => {
    const [cluster, setCluster] = useState(null);

    const userInfo = useSelector((state:RootState)=>state.server.top.userInfo);
    const [userType, setUserType] = useState<string>("003");
    useEffect(()=>{

        if (userInfo){
            setUserType(userInfo.userType);
        }
    },[userInfo])

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
                        zoom={16}
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
                        <GisFuncLayer userType={userType}/>
                        {/*<LegendLayer/>*/}

                        {/*기본 타일 레이어 지정*/}
                        {/*pane은 보통 leaflet 위에 그리고 기능?과 연동해야할 때 상용한다.*/}
                        {/*보통 marker 와 layer( 타일 레이어, draw layer 등 leaflet과 연동이 되어야 할 때 꼭 같이 선언해 줘야한다.*/}
                        <Pane name={"baseMap"} style={{zIndex: 2}}>
                            {
                                <TileLayer key={`vworld_normal_${'0'}`} {...{minZoom: 6, maxZoom: 18}}
                                           url={
                                    IS_DEV ?"https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png" :
                                        `http://${domain}/proxy?https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png`
                                }/> //개발
                            }
                        </Pane>
                        <Pane name={'drawLayer'} style={{zIndex: 500}}>
                            {
                                <DrawLayer/>
                            }
                        </Pane>
                        <Pane name={'deviceMarker'} style={{zIndex: 300}}>
                            <DeviceMarker/>
                        </Pane>
                        <Pane name={'cctvMarker'} style={{zIndex: 300}}>
                            <CctvMarker userType={userType} setMapCluster={setCluster}/>
                        </Pane>
                        <Pane name={'cctvClusterPopup'} style={{zIndex: 300}}>
                            <CctvListPopup userType={userType}/>
                        </Pane>
                        <Pane name={'cctvPlayerPopup'} style={{zIndex: 300}}>
                            <GisPlayerPopup userType={userType}/>
                        </Pane>

                    </MapContainer>
                </div>

                <li className="gis__item active">

                </li>
            </ul>

        </section>
    )
}

export default GisRootArea
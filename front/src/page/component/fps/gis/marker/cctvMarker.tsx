import {useMap} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import React, {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState} from "react";
import {
    updateActiveCctvMarker,
    updateActiveClusterLatLng,
    updateActiveClusterMarkerCctvList,
    updatePlayCctv,
} from "../../../../store/view/fps/gisViewStore";
import {CctvData} from "../../../../../config/interface/commonInterface";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import 'leaflet.markercluster/src/MarkerClusterGroup';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";


const CctvMarker = (props: { setMapCluster: Function }) => {


    const map = useMap();
    const dispatch = useDispatch();

    const cctvList = useSelector((state: RootState) => state.server.common.cctvList);
    const activeCctvMarker = useSelector((state: RootState) => state.view.fpsGis.activeCctvMarker);
    const playCctv = useSelector((state: RootState) => state.view.fpsGis.playCctv);

    const activeMenu = useSelector((state:RootState)=> state.view.fpsRight.activeMenu);
    const activeCluster = useSelector((state:RootState) => state.view.fpsGis.activeClusterLatLng);

    const isCctvMarkerOn = useSelector((state:RootState)=>state.view.fpsGis.isActiveCctvMarker);
    const [cluster, setCluster] = useState<any>(null);
    const [activeLatLng, setActiveLatLng] = useState<[number, number]| null>(null);

    useEffect(()=>{

        dispatch(updateActiveClusterLatLng(activeLatLng));

    },[activeLatLng])

    useEffect(()=>{

        setActiveLatLng(activeCluster);

    },[activeCluster])


    useEffect(() => {

        if (cluster) {
            //@ts-ignore
            cluster.off('clusterclick');
            cluster.on('clusterclick', clusterClick);
            map.addLayer(cluster);
            props.setMapCluster(cluster);

        } else {


            //@ts-ignore
            let data = new window.L.MarkerClusterGroup({
                iconCreateFunction: clusterIconFn,
                maxClusterRadius: 60,
                zoomToBoundsOnClick: false,
                clusterPane: 'cctvMarker',
                pane: 'cctvMarker',
                animate: true,
                removeOutsideVisibleBounds: true,
                spiderfyOnMaxZoom: false,
                showCoverageOnHover: false,
            })

            setCluster(data);
        }

        return () => {
            if (cluster) {
                cluster.on('clusterclick', clusterClick);
                map.removeLayer(cluster);
            }
        }
    }, [cluster,activeLatLng,playCctv])


    // cluster 마커를 클릭했을 때의 로직
    // 원래는 클러스터 개수에 따라 zoom level 을 조정하는 코드도 있어야 하는데,
    // 병점은 더 확대할 필요가 없기 때문에 zoom level 조정 코드는 삭제했다.
    const clusterClick = (_cluster: any) => {

        dispatch(updatePlayCctv(null));
        dispatch(updateActiveCctvMarker(null));


        // cluster를 클릭하면 cluster 안에 있는 marker들의 data 정보들을 가지고 온다.
        // 여기서 data는 marker에 지정해준 cctv 정보이기 때문에
        // cluster를 클릭할 때 cctv 리스트를 가져올 수 있다.

        //@ts-ignore
        let clusterCctvList = _cluster.layer.getAllChildMarkers().map((item: any) => item.options.data);

        if ( activeLatLng === null ){
            setActiveLatLng([ Number(_cluster.latlng.lat), Number(_cluster.latlng.lng)]);

        }else{
            if (activeLatLng[0] === _cluster.latlng.lat && activeLatLng[1] === _cluster.latlng.lng){
                setActiveLatLng(null);

            }else{
                setActiveLatLng([Number(_cluster.latlng.lat), Number(_cluster.latlng.lng)]);

            }
        }
        cluster.refreshClusters(); // 클러스터 강력 새로고침


        // cluster list popup 에 표출해야하기 때문에 저장해준다.
        dispatch(updateActiveClusterMarkerCctvList(clusterCctvList));

        return
    }

    // cluster marker
    const clusterIconFn = (cluster: { getAllChildMarkers: () => any; _latlng: { lat: number; lng: number; }; getChildCount: () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined | any; } | any, clusterCctvList?: CctvData[] | null, clickClusterLatLon: number[] | null = [0, 0]) => {
        //@ts-ignore
        let clusterMarker = L.divIcon({
            className: `custom-cctv-cluster-icon`,
            //@ts-ignore
            html: ReactDOMServer.renderToString(
                <div
                    className={`cctv_cluster_icon ${(activeLatLng && activeLatLng[0] === cluster._latlng.lat && activeLatLng[1] === cluster._latlng.lng )? 'active' : ''}`}>
                    <div className={"count_num"}>{cluster.getChildCount()}</div>
                </div>
            ),
            iconAnchor: [25, 25]
        })

        return clusterMarker;
    }

    useEffect(() => {

        if (!activeLatLng) {
            if (cluster) {
                cluster.options.iconCreateFunction = (c: any) => clusterIconFn(c, null, null);
                cluster.refreshClusters();
            }
        } else{
            if (cluster){
                cluster.options.iconCreateFunction = (c: any) => clusterIconFn(c, null, null);
                cluster.refreshClusters();
            }
        }

    }, [activeLatLng])

    // marker
    const renderIcon = (cctv: CctvData) => {
        return L.divIcon({
            className: 'custom-cctv-icon',
            html: ReactDOMServer.renderToString(
                <div className={`gis_icon cctv_fixed_icon ${cctv.facId === activeCctvMarker ? 'active' : ''}`}/>
            ),
            iconAnchor: [25, 35],
        })
    }

    // marker 그리기
    useEffect(() => {
        map.eachLayer((l) => {

            //@ts-ignore
            if (l.options.data) {

                //@ts-ignore
                l.setIcon(renderIcon(l.options.data))
                l.off('click');
                l.on('click', markerClick);
            }
        })
    }, [activeCctvMarker,playCctv])

    const markerClick = (e: any) => {

        let cctvData = e.target.options.data;
        dispatch(updateActiveClusterLatLng(null));

        if (playCctv) {

            if (cctvData.facId === playCctv.facId) {
                dispatch(updatePlayCctv(null));
                dispatch(updateActiveCctvMarker(null));
            } else {
                dispatch(updatePlayCctv(cctvData));
                dispatch(updateActiveCctvMarker(cctvData.facId));
            }
        } else {
            dispatch(updateActiveCctvMarker(cctvData.facId));
            dispatch(updatePlayCctv(cctvData));
        }
    }

    const makeMarker = (cctv: CctvData) => {

        // 원래는 marker 옵션에 없지만
        // cctv 정보를 넣어주기 위해
        // ts-ignore 를 사용하고 data 를 추가해줬다.
        // data 는 단순히 key 값이므로 이름을 cctvData 등 다른 것으로 변경해줘도 괜찮다.
        const marker = L.marker([Number(cctv.lng), Number(cctv.lat)], {
            icon: renderIcon(cctv),
            pane: 'cctvMarker',
            //@ts-ignore
            data: cctv,
            active: false,
        })

        marker.on('click', markerClick);
        return marker;
    }

    useEffect(() => {

        if (activeMenu  === RIGHT_ACTIVE_MENU.V && isCctvMarkerOn){
            if (cctvList.length > 0) {
                if (cluster) {
                    cluster.addLayers(
                        cctvList.map(cctv => makeMarker(cctv))
                    )
                }
            }
        }

        return () => {
            cluster && cluster.clearLayers();
        }

    }, [cluster, cctvList, activeLatLng, activeMenu, activeCluster , playCctv, isCctvMarkerOn])

    return null;
}


export default CctvMarker
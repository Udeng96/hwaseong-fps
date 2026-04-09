import {useMap} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState} from "react";
import {CctvData} from "../../../../../config/interface/commonInterface";
import ReactDOMServer from "react-dom/server";
import React from "react";
import L from "leaflet";
import 'leaflet.markercluster/src/MarkerClusterGroup';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import {
    updateActiveCctvMarker,
    updateActiveClusterLatLng,
    updateActiveClusterMarkerCctvList,
    updatePlayCctv
} from "../../../../store/view/ssl/gisViewStore";
import {MANAGER_TYPE} from "../../../../../config/config";


const CctvMarker = (props: { setMapCluster: Function, userType:string }) => {


    const map = useMap();
    const dispatch = useDispatch();
    const isCctvMarkerOn = useSelector((state: RootState) => state.view.sslGis.isActiveCctvMarker)
    const cctvList = useSelector((state: RootState) => state.server.common.cctvList);
    const activeCctvMarker = useSelector((state: RootState) => state.view.sslGis.activeCctvMarker);
    const playCctv = useSelector((state: RootState) => state.view.sslGis.playCctv);

    const activeMenu = useSelector((state:RootState)=> state.view.sslRight.activeDevice);
    const activeCluster = useSelector((state:RootState) => state.view.sslGis.activeClusterLatLng);


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
            if (cluster && (props.userType !== MANAGER_TYPE)) {
                cluster.on('clusterclick', clusterClick);
                map.removeLayer(cluster);
            }
        }
    }, [cluster,activeLatLng,playCctv,props.userType])

    const clusterClick = (_cluster: any) => {

        dispatch(updatePlayCctv(null));
        dispatch(updateActiveCctvMarker(null));

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
        cluster.refreshClusters();

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
            iconAnchor: [23, 18]
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
            iconAnchor: [22, 26],
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

        const marker = L.marker([cctv.lng, cctv.lat], {
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

        if(isCctvMarkerOn) {
            if (cctvList.length > 0 && props.userType === MANAGER_TYPE) {
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

    }, [cluster, cctvList, activeLatLng, activeMenu, activeCluster , playCctv, isCctvMarkerOn, props.userType])

    return null;
}


export default CctvMarker
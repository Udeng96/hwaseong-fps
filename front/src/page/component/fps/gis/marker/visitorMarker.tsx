import {useMap} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {useEffect, useState} from "react";
import {VisitorCountData, VisitorPercentData} from "../../../../../config/interface/fpsInterface";
import L, {LatLng} from "leaflet";
import ReactDOMServer from "react-dom/server";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";
import {updateActiveVisitorMarker} from "../../../../store/view/fps/gisViewStore";


const VisitorMarker = () => {

    const map = useMap();
    const dispatch = useDispatch();
    const activeMenu = useSelector((state:RootState)=> state.view.fpsRight.activeMenu);
    const visitorCountList = useSelector((state:RootState) => state.server.fpsRight.visitorList);
    const regionList = useSelector((state:RootState)=>state.server.fpsRight.regionList);

    const isCctvMarkerOn = useSelector((state:RootState)=> state.view.fpsGis.isActiveCctvMarker);
    const activeVisitorMarker = useSelector((state:RootState) => state.view.fpsGis.activeVisitorMarker);

    const [visitorCountData, setVisitorCountData] = useState<VisitorCountData[]>([]);
    const [percentList, setPercentList] = useState<VisitorPercentData[]>([]);
    const [total, setTotal] = useState<number>(0)
    useEffect(()=>{

        if (visitorCountList.length>0){

            let allRegion = 0;


            visitorCountList[0].visitorCountResponse.map((response) => {
                if (Number(response.count >= 0)) {
                    allRegion += 1;
                }
            })


            allRegion-=1;

            let average = visitorCountList[0].totalCount/allRegion;
            setVisitorCountData(visitorCountList[0].visitorCountResponse);
            setTotal(average);
        }

    },[visitorCountList])

    useEffect(()=>{

        let newPercentList : VisitorPercentData[] = [];



        if(visitorCountList.length>0 && regionList.length>1){
            visitorCountData.map((data,index)=>{
                if (data.region!=="0" && regionList[index-1].regionId!=="0"){
                    let count = data.count>=0? data.count : 0;
                    let percentage = count/total * 200
                    let percentData : VisitorPercentData = {
                        percent : Math.round(percentage),
                        lat : Number.parseFloat(regionList[index-1].gisY),
                        lng : Number.parseFloat(regionList[index-1].gisX),
                        regionId : regionList[index-1].regionId
                    }

                    newPercentList.push(percentData);
                }
            })

            setPercentList(newPercentList);
        }
    },[visitorCountData])


    useEffect(()=>{


        map.eachLayer((l)=>{
            //@ts-ignore
            if (l.options.visitorData){
                let findIndex = -1;
                percentList.map((data,index)=> {
                    //@ts-ignore
                    if (data._leaflet_id === l._leaflet_id) findIndex = index;
                })

                //@ts-ignore
                l.setIcon(renderIcon(l.options.visitorData, findIndex))
                l.off('click');
                l.on('click',markerClick);
            }
        })

    },[percentList, activeVisitorMarker])


    const markerClick = (e:any) => {

        let visitorData = e.target.options.visitorData;

        if (activeVisitorMarker){
            if (Number(activeVisitorMarker) === Number(visitorData.regionId)){
                dispatch(updateActiveVisitorMarker(null));
            }else{
                dispatch(updateActiveVisitorMarker(visitorData.regionId));
            }
        }else{
            dispatch(updateActiveVisitorMarker(visitorData.regionId));
        }

    }

    const setIconNumber = (percent:number) => {
        if(percent< 100){
            return "1";
        }else if (percent< 200){
            return "2";
        }else if (percent < 250){
            return "3";
        }else if (percent < 300){
            return "4";
        }else if (percent >=300){
            return "5"
        }
    }

    const renderIcon = (visitor : VisitorPercentData) => {
        return L.divIcon({
            className: 'event_custom_icon',
            html: ReactDOMServer.renderToString(
                <div className={`gis__icon--visitor0${setIconNumber(visitor.percent)} ${visitor.regionId}`}/>
            ),
            iconAnchor: [30, 30]
        })
    }

    const makeMarker = (visitor: VisitorPercentData) => {
        const visitorMarker = L.marker(new LatLng(Number(visitor.lat), Number(visitor.lng)), {
            icon: renderIcon(visitor),
            pane: 'visitorMarker',
            //@ts-ignore
            visitorData: visitor,
            active: false,
        })

        visitorMarker.on('click',markerClick);

        return visitorMarker
    }

    useEffect(() => {


        map.eachLayer((l) => {
            //@ts-ignore
            if (l.options.visitorData) {
                map.removeLayer(l);
            }
        })

        if (percentList.length > 0 && activeMenu === RIGHT_ACTIVE_MENU.V && !isCctvMarkerOn) {
            percentList.map((visitor) => {
                let marker = makeMarker(visitor);
                map.addLayer(marker);
            })
        }

    }, [percentList,activeMenu,isCctvMarkerOn])




    return null;


}

export default VisitorMarker;
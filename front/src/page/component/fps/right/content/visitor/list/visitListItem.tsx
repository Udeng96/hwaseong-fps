import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store/rootStore";
import {
    updateActivePtzCctvInfo,
    updateActiveVisitorMarker,
    updateActiveVisitorPopup
} from "../../../../../../store/view/fps/gisViewStore";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {latLng} from "leaflet";
import {VisitorPercentData, VisitorPopupData} from "../../../../../../../config/interface/fpsInterface";

const VisitListItem = (props:{ locId:number, locNm : string,  locVal : string | null}) => {

    const dispatch = useDispatch();
    const activeVisitorMarker = useSelector((state:RootState) => state.view.fpsGis.activeVisitorMarker);
    const regionResponse = useSelector((state:RootState)=> state.server.fpsRight.regionList);
    const [visitorData, setVisitorData] = useState<VisitorPopupData|null>(null);

    const visitorItemRef : MutableRefObject<any> = useRef();

    useEffect(()=>{

        scrollToActiveItem();





        regionResponse.map((region) => {
            if(Number(region.regionId) === Number(activeVisitorMarker) && Number(activeVisitorMarker) === props.locId){


                let visitorPopupData : VisitorPopupData = {
                    locId : Number(props.locId),
                    locNm : props.locNm,
                    count : props.locVal? Number(props.locVal.split(',').join('')): 0,
                    lat : Number(region.gisX),
                    lng : Number(region.gisY),
                }


                setVisitorData(visitorPopupData);

            }
        })
    },[activeVisitorMarker])

    useEffect(()=>{

        if (visitorData){
            if (activeVisitorMarker){


                dispatch(updateActiveVisitorPopup(visitorData));

            }else{
                dispatch(updateActiveVisitorPopup(null));
            }
        }

    },[visitorData])

    const scrollToActiveItem = () => {

        if (visitorItemRef.current){

            const itemClassList = (visitorItemRef.current.classList);
            if (itemClassList.contains('active')){
                visitorItemRef.current.scrollIntoView({behavior:'smooth',block:'center'})
            }
        }

    }

    const handleVisitorList = () => {

        if (activeVisitorMarker){

            if (Number(props.locId) === Number(activeVisitorMarker)){
                dispatch(updateActiveVisitorMarker(null));
            }else{
                dispatch(updateActiveVisitorMarker(props.locId));

            }
        }else{
            dispatch(updateActiveVisitorMarker(props.locId));
        }
    }

    return(
        <li ref={visitorItemRef} className={`visitor__item ${props.locId === Number(activeVisitorMarker) ? 'active' : ''} ${props.locVal===null ? 'visitor__item--noData' : ''}`} onClick={handleVisitorList}>
            <div className="loc__name">{props.locNm}</div>
            <div className={`loc__value ${props.locVal? 'people__value' : 'loc__value--nodata'}`}>{props.locVal && props.locVal}</div>
        </li>
    )

}

export default VisitListItem
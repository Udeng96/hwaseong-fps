import {Popup, useMap} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {updateActivePtzCctvInfo, updatePlayCctv} from "../../../../store/view/fps/gisViewStore";
import {updateFullPlayerOpen} from "../../../../store/view/common/commonViewServer";
import CctvPlayer from "../../../common/cctvPlayer";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";
import {useEffect, useState} from "react";
import {CctvData} from "../../../../../config/interface/commonInterface";
import GeometryUtil from "leaflet-geometryutil";
import {MANAGER_TYPE} from "../../../../../config/config";

const CctvPtzPlayerPopup = () => {

    const dispatch = useDispatch();
    const map = useMap();

    const cctvList = useSelector((state:RootState)=> state.server.common.cctvList);
    const activeMarker = useSelector((state:RootState) => state.view.fpsGis.activeVisitorMarker);
    const activeVisitorItem = useSelector((state:RootState)=>state.view.fpsGis.activeVisitorPopup);
    const zoomlevel = useSelector((state:RootState) => state.view.fpsGis.zoomLevel);
    const userInfo = useSelector((state:RootState)=>state.server.top.userInfo);

    const playCctv = useSelector((state:RootState)=>state.view.fpsGis.playCctv);

    const isCctvMarkerOn = useSelector((state:RootState)=>state.view.fpsGis.isActiveCctvMarker);


    const activePtzCctvInfo = useSelector((state:RootState) =>state.view.fpsGis.activePtzCctvInfo);

    const [newCctvList, setNewCctvList] = useState<CctvData[]>([]);
    const [userType, setUserType] = useState<string>("003");
    // const playCctv = useSelector((state: RootState) => state.view.fpsGis.playCctv);
    const activeMenu = useSelector((state:RootState) => state.view.fpsRight.activeMenu);

    useEffect(()=>{

        let list : CctvData[] = [];
        cctvList.map((cctv)=>{
            if (!cctv.facNm.includes('검지')){
                list.push(cctv);
            }
        })

        setNewCctvList(list);

    },[cctvList])

    useEffect(()=>{

        if (userInfo){
            setUserType(userInfo.userType);
        }

    },[userInfo])



    useEffect(()=>{


        dispatch(updateActivePtzCctvInfo(null));

        if (activeMarker && activeVisitorItem && newCctvList.length>0){

            let sortedCctvByDistance = newCctvList.sort((_a: CctvData, _b: CctvData)=>{



                    //@ts-ignore
                    const aDistance = GeometryUtil.distance(map, [activeVisitorItem.lat,activeVisitorItem.lng], [_a.lat, _a.lng]);
                    //@ts-ignore
                    const bDistance = GeometryUtil.distance(map, [activeVisitorItem.lat,activeVisitorItem.lng], [_b.lat, _b.lng]);


                return aDistance-bDistance;


            })


            dispatch(updateActivePtzCctvInfo(sortedCctvByDistance[0]))
            if (playCctv){
                dispatch(updatePlayCctv(null));
            }


        }else{
            dispatch(updateActivePtzCctvInfo(null));
        }


    },[zoomlevel, activeVisitorItem, activeMarker])



    const onClickCloseBtn = () => {

        dispatch(updateActivePtzCctvInfo(null))

    }


    const onClickExpansionBtn = () => {

        dispatch(updateFullPlayerOpen(true));

    }
    return (
        <>
            {
                userType === MANAGER_TYPE &&
                activePtzCctvInfo &&
                activeVisitorItem &&
                !isCctvMarkerOn &&
                activeMenu === RIGHT_ACTIVE_MENU.V &&
                <Popup position={[Number(activeVisitorItem.lng-0.00018), Number(activeVisitorItem.lat)]}>
                    <div className="gis_cctv_popup">
                        <header className="gis_cctv_popup_header">
                            <p className="popup_header_text type_cctv_fixed">{activePtzCctvInfo.facNm}</p>
                            <button type="button" className="btn_popup_close" onClick={onClickCloseBtn}></button>
                        </header>
                        <div className="gis_cctv_popup_body">
                            <div className="cctv_in">
                                {

                                    activePtzCctvInfo &&
                                    <CctvPlayer playCctv={activePtzCctvInfo} isPtz={true}/>

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


export default CctvPtzPlayerPopup
import {Popup} from "react-leaflet";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";
import {useEffect, useState} from "react";
import {MANAGER_TYPE} from "../../../../../config/config";

const VisitorCountInfoPopup = () => {

    const activeVisitorPopup = useSelector((state:RootState) => state.view.fpsGis.activeVisitorPopup);
    const activeMenu = useSelector((state:RootState)=>state.view.fpsRight.activeMenu);
    const activeVisitor = useSelector((state:RootState)=>state.view.fpsGis.activeVisitorMarker);
    const userInfo = useSelector((state:RootState)=> state.server.top.userInfo);

    const [userType, setUserType] = useState<String>("003")

    useEffect(()=>{

        if (userInfo){
            setUserType(userInfo.userType)
        }

    },[userInfo])

    return (
        <>
            {
                (userType!==MANAGER_TYPE && activeVisitor && activeVisitorPopup && activeMenu === RIGHT_ACTIVE_MENU.V)&&
                <Popup position = {[activeVisitorPopup.lng, activeVisitorPopup.lat]}>
                    <div className={"facility_info_frame"} onClick={e => e.stopPropagation()}>
                        <p className={"facility_info_title"}>{activeVisitorPopup.locNm}
                        </p>
                        <div className={"facility_info_loca"}>
                            <span className={"title"}>방문객 수</span>
                            <span className={"info"}>{activeVisitorPopup.count.toLocaleString()}명</span>
                        </div>
                    </div>
                </Popup>

            }
        </>


    )


}

export default VisitorCountInfoPopup
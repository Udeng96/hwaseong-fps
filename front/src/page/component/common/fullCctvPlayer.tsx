import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootStore";
import {updateFullPlayerOpen} from "../../store/view/common/commonViewServer";
import CctvPlayer from "./cctvPlayer";
import React, {useEffect, useState} from "react";
import {MANAGER_TYPE} from "../../../config/config";
import {CctvData} from "../../../config/interface/commonInterface";
import {updateActivePtzCctvInfo, updateActiveVisitorMarker} from "../../store/view/fps/gisViewStore";

const FullCctvPlayer = () => {

    const dispatch = useDispatch();

    const playCctv = useSelector((state:RootState) => state.view.fpsGis.playCctv);
    const userInfo = useSelector((state:RootState)=>state.server.top.userInfo);
    const isFullPlayerOpen = useSelector((state:RootState) => state.view.common.isFullPlayerOpen);

    const activePtzCctvInfo = useSelector((state:RootState) =>state.view.fpsGis.activePtzCctvInfo);
    const [userType,setUserType] = useState<string>("003");
    const [activeFullCctv, setActiveFullCctv] = useState<null|CctvData>(null);

    //ESC를 누르면 full popup playter 종료
    useEffect(() => {
        // ESC 키 입력을 감지하는 이벤트 리스너 등록
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                dispatch(updateFullPlayerOpen(false));
                setActiveFullCctv(null);
                dispatch(updateActivePtzCctvInfo(null));
                dispatch(updateActiveVisitorMarker(null));
            }
        };

        if (isFullPlayerOpen){
            // 컴포넌트가 마운트될 때 이벤트 리스너 등록
            window.addEventListener('keydown', handleEscKey);

            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거 (메모리 누수 방지)
            return () => {
                window.removeEventListener('keydown', handleEscKey);
            };
        }


    }, []);

    useEffect(()=>{

        if (userInfo){
            setUserType(userInfo.userType);
        }

    },[userInfo])

    useEffect(()=>{

        if (userType === MANAGER_TYPE){
            //playCctv
            if (playCctv && !activePtzCctvInfo){
                setActiveFullCctv(playCctv);
            }else if (!playCctv && activePtzCctvInfo){
                setActiveFullCctv(activePtzCctvInfo);
            }else if (playCctv && activePtzCctvInfo){
                setActiveFullCctv(activePtzCctvInfo)
            }else{
                setActiveFullCctv(null);
            }
        }else{
            setActiveFullCctv(null);
        }

    },[playCctv, activePtzCctvInfo])



    const onClickCloseBtn = () => {

        dispatch(updateFullPlayerOpen(false));
        setActiveFullCctv(null);
        dispatch(updateActivePtzCctvInfo(null));
        dispatch(updateActiveVisitorMarker(null));



    }


    return(

        <div className="gis_cctv_popup full_size">
            <header className="gis_cctv_popup_header">
                <p className="popup_header_text type_cctv_fixed">{
                    activePtzCctvInfo? activePtzCctvInfo.facNm :
                        playCctv? playCctv.facNm
                            :'-'}</p>
                <button type="button" className="btn_popup_close"  onClick={onClickCloseBtn}></button>
            </header>
            <div className="gis_cctv_popup_body">
                <div className="cctv_in">
                    {
                        activePtzCctvInfo ?
                            (isFullPlayerOpen) && <CctvPlayer playCctv={activePtzCctvInfo} isPtz={true}/> :
                            playCctv ?
                                (isFullPlayerOpen) && <CctvPlayer playCctv={playCctv} isPtz={false}/> :
                                ''

                    }
                </div>
            </div>
        </div>

    )

}

export default FullCctvPlayer
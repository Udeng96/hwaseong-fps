import FloatListItem from "./floatListItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store/rootStore";
import {RIGHT_ACTIVE_MENU} from "../../../../../../../config/const/fpsConst";
import {useEffect, useState} from "react";
import {FloatingData, FromStdData, ToStdData} from "../../../../../../../config/interface/fpsInterface";
import {
    updateFilterFloatingList,
    updateFromFloatingList,
    updateToFloatingList
} from "../../../../../../store/view/fps/rightViewStore";
import {Root} from "react-dom/client";

const FloatListArea = () => {

    const dispatch = useDispatch();
    const activeMenu = useSelector((state: RootState) => state.view.fpsRight.activeMenu);
    const migrationInfoList = useSelector((state: RootState) => state.server.fpsRight.migrationInfoList);
    const activeRegion = useSelector((state:RootState)=>state.view.fpsRight.activeRegion);

    const migrationDuration = useSelector((state:RootState)=> state.view.fpsRight.migrationDuration);
    const [filterFloatList, setFilterFloatList] = useState<FloatingData[]>([]);;

    useEffect(() => {


        let newFloatingList: FloatingData[] = [];

        let fromDataList: FromStdData[] = [];
        let toDataList: ToStdData[] = [];


        if (activeRegion){
            migrationInfoList.map((info) => {



                for (let index = 1; index < 21; index++) {
                    if (Number(info.toId) === index && index === Number(activeRegion.value)){
                        if (Number(info.count)>migrationDuration*20){
                            let fromData: FromStdData = {
                                stdRegion: info.toName,
                                fromRegion: info.forName,
                                stdId: info.toId,
                                fromCount: Number(info.count),
                                fromX: info.fromCoordinates.gisX,
                                fromY: info.fromCoordinates.gisY,
                                stdX: info.toCoordinates.gisX,
                                stdY: info.toCoordinates.gisY,
                            }

                            fromDataList.push(fromData);

                        }



                    }


                    if (Number(info.fromId) === index && index === Number(activeRegion.value)) {
                        if (Number(info.count)>migrationDuration*20){
                            let toData: ToStdData = {
                                stdRegion: info.forName,
                                toRegion: info.toName,
                                stdId: info.fromId,
                                toCount: Number(info.count),
                                stdX: info.fromCoordinates.gisX,
                                stdY: info.fromCoordinates.gisY,
                                toX: info.toCoordinates.gisX,
                                toY: info.toCoordinates.gisY
                            }

                            toDataList.push(toData);
                        }

                    }
                }


            })

        }
        dispatch(updateFromFloatingList(fromDataList));
        dispatch(updateToFloatingList(toDataList));


        fromDataList.map((from, index) => {
            toDataList.map((to, toIndex) => {
                let floatingData: FloatingData = {
                    stdId: from.stdId,
                    fromRegion: from.fromRegion,
                    toRegion: to.toRegion,
                    stdRegion: to.stdRegion,
                    fromCount: from.fromCount,
                    toCount: to.toCount,
                    fromX: from.fromX,
                    fromY: from.fromY,
                    toX: to.toX,
                    toY: to.toY,
                    stdX: from.stdX,
                    stdY: from.stdY,
                }

                newFloatingList.push(floatingData);
            })
        })

        newFloatingList = newFloatingList.sort((a,b)=>Number(a.stdId)-Number(b.stdId));

        setFilterFloatList(newFloatingList);
        dispatch(updateFilterFloatingList(newFloatingList));



    }, [migrationInfoList,activeRegion])



    return (
        <div className="content__panel">
            <div className="content__panel__head">
                <h3 className={`panel__title panel__title--flow ${activeMenu === RIGHT_ACTIVE_MENU.F && 'active'}`}>
                    <i></i>유동인구 현황</h3>
            </div>
            <div className="content__panel__body">
                <div className="situation">
                    <div className="situation__list__head">
                        <ul className="row list__box">
                            <li className="list__value"><p>유입지역</p></li>
                            <li className="list__value list__value--inflow"><i></i><p>유입인구</p></li>
                            <li className="list__value list__value--location"><p><i></i>기준지역</p>
                            </li>
                            <li className="list__value"><i></i><p>유출지역</p></li>
                            <li className="list__value list__value--outflow"><i></i><p>유출인구</p></li>
                        </ul>
                    </div>
                    <div className="situation__list__body custom-scroll">
                        <div className="event__list__body__box">

                            {
                                filterFloatList.length>0 &&
                                filterFloatList.map((data)=>(
                                    <FloatListItem data={data}/>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FloatListArea
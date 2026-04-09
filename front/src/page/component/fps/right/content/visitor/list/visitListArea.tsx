import VisitListItem from "./visitListItem";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/rootStore";
import {useEffect, useState} from "react";
import {VisitorCountData} from "../../../../../../../config/interface/fpsInterface";

const VisitListArea = () => {

    const visitorCountList = useSelector((state:RootState)=>state.server.fpsRight.visitorList);
    const regionList = useSelector((state:RootState)=>state.server.fpsRight.regionOptions);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [visitorCountData, setVisitorCountData] = useState<VisitorCountData[]>([]);
    useEffect(()=>{


        if (visitorCountList.length>0){




            setTotalCount(visitorCountList[0].totalCount);
            setVisitorCountData(visitorCountList[0].visitorCountResponse);

        }


    },[visitorCountList])



    const setValue = (value: number) => {
        if (value > -1){
            return value.toLocaleString()
        }else{
            return null;
        }
    }

    return(

        <div className="content__panel__body">
            <div className="visitor">
                <div className="visitor__head">
                    <div className="visitor__all">
                        <div className="mark"></div>
                        전체 방문객 수
                    </div>
                    <div className="visitor__all__value people__value">{totalCount.toLocaleString()}</div>
                </div>
                <div className="visitor__body custom-scroll">
                    <ul className="visitor__list">
                        {
                            (visitorCountList[0].visitorCountResponse.length>0 && regionList.length>0)&&
                            visitorCountList[0].visitorCountResponse.map((data,index)=>(
                                index > 0 ?
                                <VisitListItem locId = {Number(regionList[index-1].value)}
                                               locNm={regionList[index-1].label}
                                               locVal={setValue(data.count)}
                                /> : ''
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>

    )

}

export default VisitListArea
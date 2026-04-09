import LegendItem from "./legendItem";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/rootStore";

const LegendArea = () => {

    const stayTime = useSelector((state:RootState)=>state.server.fpsRight.stayTime);


    return(

        <div className="chart__legend__area">
            <LegendItem color={'red'} title={'1분~5분'} value={stayTime? stayTime.durFrom1To5M : 0}/>
            <LegendItem color={'orange'} title={'6분~10분'} value={stayTime?stayTime.durFrom5To10M : 0}/>
            <LegendItem color={'yellow'} title={'11분~20분'} value={stayTime?stayTime.durFrom10To20M : 0}/>
            <LegendItem color={'sky'} title={'21~40분'} value={stayTime?stayTime.durFrom20To40M : 0}/>
            <LegendItem color={'blue'} title={'41~60분'} value={stayTime?stayTime.durFrom40To60M : 0}/>
            <LegendItem color={'purple'} title={'60분 이상'} value={stayTime?stayTime.durOver1H : 0}/>
        </div>


    )

}

export default LegendArea
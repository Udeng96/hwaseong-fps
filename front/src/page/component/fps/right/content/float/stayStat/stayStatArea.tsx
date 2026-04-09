import ChartArea from "./chartArea";
import LegendArea from "./legendArea";

const StayStatArea = () => {

    return(
        <div className="content__panel">
            <div className="content__panel__head">
                <h3 className="panel__title panel__title--stay"><i></i>머문 시간별 통계</h3>
            </div>
            <div className="content__panel__body">
                <div className="stay">
                    <ChartArea/>
                    <LegendArea/>
                </div>
            </div>
        </div>
    )

}

export default StayStatArea
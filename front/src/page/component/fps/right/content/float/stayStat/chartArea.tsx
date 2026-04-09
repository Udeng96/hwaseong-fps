import StayChart from "./stayChart";

const ChartArea = () => {

    return(

        <div className="chart__area">
            <div id="stayTimeChart" className="chart__in">
                <StayChart/>
            </div>
        </div>

    )
}

export default ChartArea
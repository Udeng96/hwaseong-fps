import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store/rootStore";
import {useEffect, useState} from "react";
import {CHART_TYPE} from "../../../../../../../../config/const/fpsConst";
import {Root} from "react-dom/client";

const ModalLastVisitorAnalyticChart = (props:{type : string}) => {

    const isModalOpen = useSelector((state:RootState)=>state.view.fpsRight.isModalOpen);

    const regionList = useSelector((state:RootState)=>state.server.fpsRight.regionList);

    const lastDayList = useSelector((state:RootState)=> state.server.fpsRight.visitorDayAgoList);
    const lastWeekList = useSelector((state:RootState)=>state.server.fpsRight.visitorWeekAgoList);
    const lastMonthList = useSelector((state:RootState) => state.server.fpsRight.visitorMonthAgoList);

    const predictDayList = useSelector((state:RootState) => state.server.fpsRight.visitorDayPredictList);
    const predictWeekList = useSelector((state:RootState) => state.server.fpsRight.visitorWeekPredictList);
    const predictMonthList = useSelector((state:RootState) => state.server.fpsRight.visitorMonthPredictList);

    const [placeList, setPlaceList] = useState<string[]>([]);
    const [nowList, setNowList] = useState<number[]>([]);
    const [lastList, setLastList] = useState<number[]>([]);
    const [predictList, setPredictList] = useState<number[]>([]);

    useEffect(()=>{

        let newPlaceList : string[] = [];
        let newLastList : number[] = [];
        let newNowList : number[] = [];
        let newPredictList : number[] = [];

        if (regionList.length>0){
            regionList.map((region,index)=>{
                if (region.regionId !== '0'){
                    newPlaceList.push(region.name.split('(')[0]);
                }
            })

            if (isModalOpen){
                if (props.type === CHART_TYPE.today){

                    lastDayList.map((day)=>{
                        if (day.region !== 0){
                            newLastList.push(day.previous);
                            newNowList.push(day.count);
                        }
                    });

                    predictDayList.map((day) => {
                        if (day.region !== 0){
                            newPredictList.push(day.prediction);
                        }
                    })


                }else if (props.type === CHART_TYPE.week){

                    lastWeekList.map((week)=>{
                        if (week.region !== 0){
                            newLastList.push(week.previous);
                            newNowList.push(week.count);
                        }
                    })

                    predictWeekList.map((week) => {
                        if (week.region !== 0) {
                            newPredictList.push(week.prediction);
                        }
                    })

                }else{

                    lastMonthList.map((month)=>{
                        if (month.region !== 0){
                            newLastList.push(month.previous);
                            newNowList.push(month.count);
                        }
                    })

                    predictMonthList.map((month)=>{
                        if (month.region!==0){
                            newPredictList.push(month.prediction);
                        }
                    })

                }


                setLastList(newLastList);
                setNowList(newNowList);
                setPlaceList(newPlaceList);
                setPredictList(newPredictList);
            }

        }


    },[isModalOpen,lastDayList,lastMonthList,lastWeekList, regionList, predictDayList,predictWeekList,predictMonthList]);



    const options = {
        chart: {
            type: "column",
            height: 170,
            spacingBottom: 0,
            marginBottom: 30,
            backgroundColor: 'transparent',
        },
        title: {
            text: "",
        },
        subtitle: {
            text: "",
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            shared: true,
            useHTML: true,
            pointFormat: '<p class="tooltip__text">{point.name} <b style="font-weight:500;font-size: 11px;"><span style="color:{point.color}; padding-right:6px;">&#9632;</span>{point.y}</b>명</p>',
            style: {
                fontFamily: "NotoSansCJKkr",
                color: "#fff",
                fontSize: 10,
                fontWeight: 300,
            },
            backgroundColor: "#22242E",
            borderColor: "#DB5C18",
            // borderRadius: 12,
        },

        xAxis: {
            styledMode: true,
            // scrollbar : {
            //     enabled : true,
            //     style : {
            //         fill:'red',
            //     }
            // },
            categories: placeList,
            crosshair: true,
            labels: {
                style: {
                    fontFamily: "NotoSansCJKkr",
                    color: "#A5A7B5",
                    fontSize: 10,
                    fontWeight: 300,
                    width: 60,
                },
            },
            lineColor: '#40424F',
        },

        yAxis: {
            min: 0,
            title: {
                enabled: false,
            },
            labels: {
                style: {
                    fontFamily: "NotoSansCJKkr",
                    color: "#A5A7B5",
                    fontSize: 10,
                    fontWeight: 300,
                },
            },
            gridLineColor: '#40424F',
            // tickPositions: [],
        },
        plotOptions: {

            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: props.type === CHART_TYPE.today ? '전일' : props.type === CHART_TYPE.week ? '전주' : '전월',
                data: lastList,
            },
            {
                name: props.type === CHART_TYPE.today ? '금일' : props.type === CHART_TYPE.week ? '금주' : '금월',
                data: nowList,
            },
            {
                name: props.type === CHART_TYPE.today ? '익일 예측' : props.type === CHART_TYPE.week ? '익주 예측' : '익월 예측',
                data: predictList,
            }
        ],
        colors: ['#30BEFF', '#FC7220','#ffc000'],

    };

    return (

        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>

    )

}

export default ModalLastVisitorAnalyticChart;
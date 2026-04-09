import {useEffect, useState} from "react";
import {CHART_TYPE} from "../../../../../../../config/const/fpsConst";
import ModalLastVisitorAnalyticChart from "./chart/modalLastVisitorAnalyticChart";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../store/rootStore";

const ModalPanel = (props: { type: string }) => {

    const [dateType, setDateType] = useState<string>('일');

    const lastDayList = useSelector((state: RootState) => state.server.fpsRight.visitorDayAgoList);
    const lastWeekList = useSelector((state: RootState) => state.server.fpsRight.visitorWeekAgoList);
    const lastMonthList = useSelector((state: RootState) => state.server.fpsRight.visitorMonthAgoList);


    useEffect(() => {

        if (props.type === CHART_TYPE.today) {
            setDateType('일');
        } else if (props.type === CHART_TYPE.month) {
            setDateType('월');
        } else {
            setDateType('주');
        }

    }, [props.type])

    return (

        // <div className="modal__panel modal__panel--error">
        <div className="modal__panel">
            <div className="modal__panel__head">
                <div
                    className={`modal__panel__title modal__panel__title--${props.type === CHART_TYPE.today ? 'day' : props.type === CHART_TYPE.month ? 'month' : 'year'}`}>
                    <i></i><span>{`전${dateType}대비 `}</span> 방문객 수
                </div>
                <div className="modal__chart__legend">
                    <ul className="chart__legend__list">
                        <li className="chart__legend__item">
                            <i className="prev-day"></i>
                            <p>{`전${dateType}`}</p>
                        </li>
                        <li className="chart__legend__item">
                            <i className="next-day"></i>
                            <p>{`금${dateType}`}</p>
                        </li>
                        <li className="chart__legend__item">
                            <i className="predict-day"></i>
                            <p>{`익${dateType} 예측`}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="modal__panel__head">
                {

                    props.type === CHART_TYPE.today ?
                        lastDayList.length === 0 ?
                            <div className="modal__chart__area">
                                <div className="modal__error">
                                    <div className="btn__box">
                                        <button type="button" className="btn--reload"></button>
                                        <p>Reload</p>
                                    </div>
                                    <p className="modal__error__message">통계 차트 로드에 문제가 발생하였습니다.</p>
                                </div>
                            </div>
                            :
                            <div className="modal__chart__area">
                                {/*<div className="custom-scroll-x">*/}
                                <div id="visitorDayChart" className="chart__in">
                                    <ModalLastVisitorAnalyticChart type={props.type}/>
                                </div>
                                {/*</div>*/}
                            </div>
                        :
                        props.type === CHART_TYPE.week ?
                            lastWeekList.length === 0 ?
                                <div className="modal__chart__area">
                                    <div className="modal__error">
                                        <div className="btn__box">
                                            <button type="button" className="btn--reload"></button>
                                            <p>Reload</p>
                                        </div>
                                        <p className="modal__error__message">통계 차트 로드에 문제가 발생하였습니다.</p>
                                    </div>
                                </div>
                                :
                                <div className="modal__chart__area">
                                    {/*<div className="custom-scroll-x">*/}
                                    <div id="visitorDayChart" className="chart__in">
                                        <ModalLastVisitorAnalyticChart type={props.type}/>
                                    </div>
                                    {/*</div>*/}
                                </div>
                            :
                            lastMonthList.length === 0?
                                <div className="modal__chart__area">
                                    <div className="modal__error">
                                        <div className="btn__box">
                                            <button type="button" className="btn--reload"></button>
                                            <p>Reload</p>
                                        </div>
                                        <p className="modal__error__message">통계 차트 로드에 문제가 발생하였습니다.</p>
                                    </div>
                                </div>
                                :
                                <div className="modal__chart__area">
                                    {/*<div className="custom-scroll-x">*/}
                                    <div id="visitorDayChart" className="chart__in">
                                        <ModalLastVisitorAnalyticChart type={props.type}/>
                                    </div>
                                    {/*</div>*/}
                                </div>


                }


            </div>
        </div>

    )

}

export default ModalPanel
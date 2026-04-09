import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {GIS_DATE_OPTION, RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";
import {updateActiveDate, updateActiveDateOption} from "../../../../store/view/fps/gisViewStore";
import moment from "moment";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {TimeParam} from "../../../../../config/interface/fpsInterface";
import * as RightActions from "../../../../saga/actions/fpsActions";
import {updateMigrationDuration} from "../../../../store/view/fps/rightViewStore";


const DateOptionLayer = () => {

    const dispatch = useDispatch();
    const activeDateOption = useSelector((state: RootState) => state.view.fpsGis.activeDateOption);
    const activeDate = useSelector((state: RootState) => state.view.fpsGis.activeDate);

    const [pickerStart, setPickerStart] = useState<Date>(moment().toDate());
    const [pickerEnd, setPickerEnd] = useState<Date>(moment().toDate());
    const [paramDtm, setParamDtm] = useState<TimeParam>(activeDate);
    const [updateDtm, setUpdateDtm] = useState<string>(moment().format('YYYY-MM-DD HH:mm:ss'))
    const activeMenu = useSelector((state: RootState) => state.view.fpsRight.activeMenu);

    const setDtmForm = (e: Date | null): string => {

        let newSelect = '';
        if (e) {
            let year = e.getFullYear();
            let month = e.getMonth();
            let date = e.getDate();

            let newYear = `${year}`
            let newMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
            let newDate = date < 10 ? `0${date}` : `${date}`;


            newSelect = `${newYear}-${newMonth}-${newDate}`


        }

        return newSelect
    }

    const handleActiveDateOption = (dateOption: string) => {
        dispatch(updateActiveDateOption(dateOption));
        let startDtm: moment.Moment;
        let endDtm = moment();
        if (dateOption === GIS_DATE_OPTION.T) {
            startDtm = moment();
        } else if (dateOption === GIS_DATE_OPTION.M) {
            startDtm = moment().subtract(1, 'months');
        } else if (dateOption === GIS_DATE_OPTION.ThreeM) {
            startDtm = moment().subtract(3, 'months');
        } else if (dateOption === GIS_DATE_OPTION.sixM) {
            startDtm = moment().subtract(6, 'months');
        } else if (dateOption === GIS_DATE_OPTION.W) {
            startDtm = moment().subtract(1, 'weeks');
        } else {
            startDtm = moment().subtract(1, 'years');
        }

        setPickerEnd(endDtm.toDate());
        setPickerStart(startDtm.toDate());
        setParamDtm({startDtm: startDtm.format('YYYY-MM-DD'), endDtm: endDtm.format('YYYY-MM-DD')});

    }


    const onClickDtmBtn = () => {
        // console.log("paramDtm:",paramDtm);
        let start = moment(paramDtm.startDtm);
        let end = moment(paramDtm.endDtm);

        let diff = end.diff(start, 'days');

        dispatch(updateMigrationDuration(diff));

        dispatch(updateActiveDate(paramDtm));
        dispatch(RightActions.actions.requestGetStayTime(paramDtm));
        dispatch(RightActions.actions.requestGetVisitorCountList(paramDtm));
        dispatch(RightActions.actions.requestGetMigrationList(paramDtm));
        setUpdateDtm(moment().format('YYYY-MM-DD HH:mm:ss'));

    }

    const setDateParam = () : TimeParam => {
        let today = moment().format('YYYY-MM-DD');


        let param : TimeParam = {
            startDtm : today,
            endDtm : today
        }
        return param
    }


    const onclickLatestVisitorListBtn = () => {


        // 현재 실시간이 active 라면
        if (activeDateOption === GIS_DATE_OPTION.H){
            dispatch(updateActiveDateOption(GIS_DATE_OPTION.T));
            dispatch(RightActions.actions.requestGetVisitorCountList(setDateParam()));

        }else{
            dispatch(updateActiveDateOption(GIS_DATE_OPTION.H))
            dispatch(RightActions.actions.requestGetVisitorCountList({latest:"latest"}));

        }

        setUpdateDtm(moment().format('YYYY-MM-DD HH:mm:ss'));

    }

    const handleChangeStartDate = (date: Date | null) => {

        if (date) {

            setPickerStart(date);

            let newParam: TimeParam = {
                startDtm: setDtmForm(date),
                endDtm: paramDtm.endDtm
            }

            setParamDtm(newParam);

            if (paramDtm.endDtm === moment().format('YYYY-MM-DD')) {
                if (setDtmForm(date) === moment().format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.T));
                } else if (setDtmForm(date) === moment().subtract(1, 'weeks').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.W));
                } else if (setDtmForm(date) === moment().subtract(1, 'months').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.M));
                } else if (setDtmForm(date) === moment().subtract(3, 'months').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.ThreeM));
                } else if (setDtmForm(date) === moment().subtract(6, 'months').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.sixM));
                } else if (setDtmForm(date) === moment().subtract(1, 'years').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.Y));
                } else {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.N))
                }
            } else {
                dispatch(updateActiveDateOption(GIS_DATE_OPTION.N))
            }
        }

    }

    const handleChangeEndDate = (date: Date | null) => {
        if (date) {
            setPickerEnd(date);

            let newParam: TimeParam = {
                startDtm: paramDtm.startDtm,
                endDtm: setDtmForm(date)
            }

            setParamDtm(newParam);

            if (paramDtm.endDtm === moment().format('YYYY-MM-DD')) {
                if (setDtmForm(date) === moment().format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.T));
                } else if (setDtmForm(date) === moment().subtract(1, 'weeks').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.W));
                } else if (setDtmForm(date) === moment().subtract(1, 'months').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.M));
                } else if (setDtmForm(date) === moment().subtract(3, 'months').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.ThreeM));
                } else if (setDtmForm(date) === moment().subtract(6, 'months').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.sixM));
                } else if (setDtmForm(date) === moment().subtract(1, 'years').format('YYYY-MM-DD')) {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.Y));
                } else {
                    dispatch(updateActiveDateOption(GIS_DATE_OPTION.N))
                }
            }
        }
    }

    return (
        <div className="gis__widget">
            <div className="gis__period">
                <div className="period__type"><i></i>기간 설정</div>
                <div className="btn__group--period">
                    <button type="button"
                            className={`btn__period ${activeDateOption === GIS_DATE_OPTION.T && 'active'}`}
                            onClick={event => handleActiveDateOption(GIS_DATE_OPTION.T)}>오늘
                    </button>
                    <button type="button"
                            className={`btn__period ${activeDateOption === GIS_DATE_OPTION.W && 'active'}`}
                            onClick={event => handleActiveDateOption(GIS_DATE_OPTION.W)}>1주일
                    </button>
                    <button type="button"
                            className={`btn__period ${activeDateOption === GIS_DATE_OPTION.M && 'active'}`}
                            onClick={event => handleActiveDateOption(GIS_DATE_OPTION.M)}>1개월
                    </button>
                    <button type="button"
                            className={`btn__period ${activeDateOption === GIS_DATE_OPTION.ThreeM && 'active'}`}
                            onClick={event => handleActiveDateOption(GIS_DATE_OPTION.ThreeM)}>3개월
                    </button>
                    <button type="button"
                            className={`btn__period ${activeDateOption === GIS_DATE_OPTION.sixM && 'active'}`}
                            onClick={event => handleActiveDateOption(GIS_DATE_OPTION.sixM)}>6개월
                    </button>
                    <button type="button"
                            className={`btn__period ${activeDateOption === GIS_DATE_OPTION.Y && 'active'}`}
                            onClick={event => handleActiveDateOption(GIS_DATE_OPTION.Y)}>1년
                    </button>
                </div>
                <div className="datepicker__area">
                </div>
                <div className="datepicker__wrap datepicker__wrap--Range">
                    <div className="calendar_input_box" id={"start"}>
                        <label htmlFor={"fromCalendar"} className={"datepicker_btn"}/>
                        <DatePicker
                            onChange={(e) => handleChangeStartDate(e)}
                            className={"datepicker__input"}
                            id={'fromCalendar'}
                            selected={pickerStart}
                            value={paramDtm.startDtm}
                            maxDate={pickerEnd}
                        />
                    </div>
                    <span className="term">~</span>]
                    <div className="calendar_input_box" id={"end"}>
                        <label htmlFor={"toCalendar"} className={"datepicker_btn"}/>
                        <DatePicker
                            onChange={(e) => handleChangeEndDate(e)}
                            className={'datepicker__input'}
                            id={'toCalendar'}
                            selected={pickerEnd}
                            value={paramDtm.endDtm}
                            maxDate={moment().toDate()}
                            minDate={pickerStart}
                            showIcon={true}
                        />
                    </div>


                </div>
                <button className="btn btn--inquire" onClick={onClickDtmBtn}>조회</button>
                <div className="period__update">
                    <p className="period__update__title">업데이트 일시</p>
                    <p className="period__update__value">{updateDtm}</p>
                </div>
            </div>
            <div className="gis__latest">
                {activeMenu === RIGHT_ACTIVE_MENU.V ? (
                    <button className={`btn btn--latest ${activeDateOption === GIS_DATE_OPTION.H ? 'active' : ''}`} onClick={onclickLatestVisitorListBtn}>
                        <i></i>
                        실시간 방문객
                    </button>
                ) : null}
            </div>
        </div>
    )
}

export default DateOptionLayer
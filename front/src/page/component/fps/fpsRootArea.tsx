import GisRootArea from "./gis/gisRootArea";
import RightRootArea from "./right/rightRootArea";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as rightActions from "../../saga/actions/fpsActions";
import * as RightActions from "../../saga/actions/fpsActions";
import moment from "moment";
import {TimeParam} from "../../../config/interface/fpsInterface";
import * as CommonActions from "../../saga/actions/commonActions";
import {VISITOR_ANALYTIC_TYPE} from "../../../config/const/fpsConst";
import {RootState} from "../../store/rootStore";
import LoadingArea from "../common/loadingArea";

const FpsRootArea = () => {

    const dispatch = useDispatch();
    const isVisitorLoadComplete = useSelector((state:RootState) => state.server.fpsRight.isVisitorListLoadComplete);
    const isMigrationLoadComplete = useSelector((state:RootState) => state.server.fpsRight.isMigrationListLoadComplete);



    const setDateParam = () : TimeParam => {
        let today = moment().format('YYYY-MM-DD');


        let param : TimeParam = {
            startDtm : today,
            endDtm : today
        }
        return param
    }


    useEffect(()=>{
        dispatch(rightActions.actions.requestGetStayTime(setDateParam())); // 처음 시작할 때 한 번 불러와야한다.
        dispatch(rightActions.actions.requestGetRegionList()); // 지역 리스트 뽑아오기
        dispatch(rightActions.actions.requestGetVisitorCountList(setDateParam())); // 방문객 수 리스트

        dispatch(RightActions.actions.requestGetVisitorAnalyticList(VISITOR_ANALYTIC_TYPE.day)); // day 통계
        dispatch(RightActions.actions.requestGetVisitorAnalyticList(VISITOR_ANALYTIC_TYPE.week)); // week 통계
        dispatch(RightActions.actions.requestGetVisitorAnalyticList(VISITOR_ANALYTIC_TYPE.month)); // month 통계
        dispatch(RightActions.actions.requestGetMigrationList(setDateParam())); // 유동인구 이주

        dispatch(CommonActions.actions.requestGetCctvList());
    },[])

    return(
        <>
            {
                (!isMigrationLoadComplete || !isVisitorLoadComplete )  && <LoadingArea/>
            }
            <GisRootArea/>
            <RightRootArea/>
        </>
    )
}

export default FpsRootArea;
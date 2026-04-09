import TopbarArea from "./common/topbarArea";
import Router from "../router/router";
import {useDispatch, useSelector} from "react-redux";
import * as TopActions from "../saga/actions/topActions";
import {useEffect} from "react";
import FullCctvPlayer from "./common/fullCctvPlayer";
import {RootState} from "../store/rootStore";

const RootArea = () => {

    const isFullPlayerOpen = useSelector((state:RootState) => state.view.common.isFullPlayerOpen);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(TopActions.actions.requestGetUserInfo())
    },[])

    return(
        <div className={"dashWrap"}>
            {
                isFullPlayerOpen ?
                    <FullCctvPlayer/>
                    :
                    <>
                        <TopbarArea/>
                        <Router/>
                    </>
            }

        </div>
    )


}

export default RootArea;
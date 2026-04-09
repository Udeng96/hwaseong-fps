import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/rootStore";
import {logout} from "../../saga/apis/topApis";
import config, {DASHBOARD_URL} from "../../../config/config";
import {useEffect} from "react";
import {PAGE} from "../../../config/const/commonConst";

const TopbarArea = () => {

    const userInfo = useSelector((state:RootState)=>state.server.top.userInfo);
    const activePage = useSelector((state:RootState) => state.view.common.activePage);
    const nowHref = window.location.href.split('/' );
    const lastContext = nowHref[nowHref.length-1];
    const token = sessionStorage.getItem("token") as string;

    const clickLogo = () => {
        window.location.href = config.PLATFORM.OMS.OMS_URL;
    }


    const clickMenu = (page : string) => {
        window.location.href = `${DASHBOARD_URL}/${page}`;

    }


    return(
        <section className="top-bar">
            <div className="top-bar__logo" onClick={clickLogo}></div>
            <div className="menu_tap">
                <div className={`menu street_lamp__tap ${lastContext===PAGE.smart_streetlamp? 'active' : '' }`}
                     onClick={event => clickMenu(PAGE.smart_streetlamp)}
                     aria-disabled={lastContext===PAGE.smart_streetlamp}
                >
                    <p>스마트 가로등</p>
                </div>
                <div className={`menu population__tap ${lastContext===PAGE.floating_population ? 'active' : ''}`}
                     onClick={event => clickMenu(PAGE.floating_population)}
                     aria-disabled={lastContext === PAGE.floating_population}
                >
                    <p>유동인구</p>
                </div>
            </div>

            <div className="user">
                <p><span>{userInfo? userInfo.userName : '관리자'}</span> 님 환영합니다</p>
            </div>
            <button className="btn btn--logout" onClick={logout}>로그아웃</button>
        </section>
    )
}

export default TopbarArea
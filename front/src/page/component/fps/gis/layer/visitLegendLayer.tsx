import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";

const VisitLegendLayer = () => {

    const activeMenu = useSelector((state:RootState)=>state.view.fpsRight.activeMenu);

    return (
        <div className={`gis__legend gis__legend--visitor ${activeMenu === RIGHT_ACTIVE_MENU.F && 'hidden'}`}>
            <div className="legend__wrap">
                <p className="legend__title"><span>방문객 수</span> 시각화 기준표 ( 기준 : 평균 대비 )</p>
                <div className="legend__area">
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--visitor01"></div>
                        <p className="legend__box__name">0 ~ 100 %</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--visitor02"></div>
                        <p className="legend__box__name">100 ~ 200 %</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--visitor03"></div>
                        <p className="legend__box__name">200 ~ 250 %</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--visitor04"></div>
                        <p className="legend__box__name">250 ~ 300 %</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--visitor05"></div>
                        <p className="legend__box__name">300 % ~</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default VisitLegendLayer
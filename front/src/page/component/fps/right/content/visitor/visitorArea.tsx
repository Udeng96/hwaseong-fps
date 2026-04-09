import VisitListArea from "./list/visitListArea";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/rootStore";
import {RIGHT_ACTIVE_MENU} from "../../../../../../config/const/fpsConst";

const VisitorArea = () => {

    const activeMenu = useSelector((state:RootState)=> state.view.fpsRight.activeMenu);

    return(
        <li className={`container__item container__item--visitor ${activeMenu===RIGHT_ACTIVE_MENU.V && 'active'}`}>
            <div className="content__panel">
                <div className="content__panel__head">
                    <h3 className="panel__title panel__title--visitor"><i></i>방문객 수(명)</h3>
                </div>
                <VisitListArea/>

            </div>
        </li>
    )

}

export default VisitorArea
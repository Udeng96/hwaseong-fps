import FloatArea from "./float/floatArea";
import VisitorArea from "./visitor/visitorArea";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";

const RightContentBody = () => {

    const activeMenu = useSelector((state:RootState)=> state.view.fpsRight.activeMenu);

    return(

        <div className="content__container">
            <ul className="container__list">
                {
                    activeMenu === RIGHT_ACTIVE_MENU.F ?
                        <FloatArea/> :
                        <VisitorArea/>
                }
            </ul>
        </div>

    )

}

export default RightContentBody
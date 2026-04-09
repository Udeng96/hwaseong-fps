import RegionOption from "./region/regionOption";
import FloatListArea from "./list/floatListArea";
import StayStatArea from "./stayStat/stayStatArea";
import RegionArea from "./region/regionArea";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/rootStore";
import {RIGHT_ACTIVE_MENU} from "../../../../../../config/const/fpsConst";

const FloatArea = () => {

    const activeMenu = useSelector((state:RootState)=>state.view.fpsRight.activeMenu)

    return(
        <li className={`container__item container__item--flow ${activeMenu === RIGHT_ACTIVE_MENU.F && 'active'}`}>
            <RegionArea/>
            <FloatListArea/>
            <StayStatArea/>
        </li>
    )


}

export default FloatArea
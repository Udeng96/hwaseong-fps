import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {RIGHT_ACTIVE_MENU} from "../../../../../config/const/fpsConst";
import {updateActiveMenu} from "../../../../store/view/fps/rightViewStore";

const RightContentHeader = () => {


    const dispatch = useDispatch();
    const activeMenu = useSelector((state:RootState)=>state.view.fpsRight.activeMenu);

    const handleMenu = (menu : string) => {
        dispatch(updateActiveMenu(menu));
    }

    return(

        <div className="content__tab">
            <button className={`btn__tab btn__tab--flow ${activeMenu === RIGHT_ACTIVE_MENU.F && 'active'}`} onClick={event =>handleMenu(RIGHT_ACTIVE_MENU.F)}>유입/유출 현황</button>
            <button className={`btn__tab btn__tab--visitor ${activeMenu === RIGHT_ACTIVE_MENU.V && 'active'}`} onClick={event => handleMenu(RIGHT_ACTIVE_MENU.V)}>위치별 방문객 수 현황</button>
        </div>

    )

}

export default RightContentHeader
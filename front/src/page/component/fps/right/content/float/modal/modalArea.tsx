import ModalPanel from "./modalPanel";
import {CHART_TYPE} from "../../../../../../../config/const/fpsConst";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store/rootStore";
import {updateIsModalOpen} from "../../../../../../store/view/fps/rightViewStore";
import {actions} from "../../../../../../saga/actions/fpsActions"

const ModalArea = () => {

    const dispatch = useDispatch();
    const isModalOpen = useSelector((state:RootState)=>state.view.fpsRight.isModalOpen);

    const handleCloseBtn = () => {
        dispatch(updateIsModalOpen(!isModalOpen));
    }

    const handleExcelDownloadBtn = () => {
        dispatch(actions.requestGetExcelDownload())
    }


    return(
        <div id="modal-visitor" className={`modal modal--visitor ${isModalOpen&&'modal--open'}`}>
            <div className="dimmed"></div>
            <div className="modal__wrap">
                <div className="modal__content">
                    <div className="modal__head">
                        <h2 className="title modal__title"><i></i><span>위치별 방문객 수</span> 통계</h2>
                        <button className={"btn btn--excel"} onClick={handleExcelDownloadBtn}><i></i>엑셀 다운로드</button>
                        <button className="btn btn--close btn-close" onClick={handleCloseBtn}></button>

                    </div>
                    <div className="modal__body">
                        <ModalPanel type={CHART_TYPE.today}/>
                        <ModalPanel type={CHART_TYPE.week}/>
                        <ModalPanel type={CHART_TYPE.month}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalArea
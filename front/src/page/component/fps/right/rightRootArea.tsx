import RightContentArea from "./content/rightContentArea";
import ModalArea from "./content/float/modal/modalArea";
import {useDispatch} from "react-redux";
import {updateIsModalOpen} from "../../../store/view/fps/rightViewStore";
import config, {IS_DEV} from "../../../../config/config";

const RightRootArea = () => {

    const dispatch = useDispatch();
    const handleModalBtn = () =>{
        dispatch(updateIsModalOpen(true));
    }

    const handleGoSSLBtn = () => {

        const token = sessionStorage.getItem("token") as string;


        if (IS_DEV) {
            if (token === '' || typeof token === 'undefined' || token == null) {

                // token 이 존재하지 않으면 oms 화면으로 돌아간다.
                window.location.href = config.PLATFORM.OMS.OMS_URL;

            } else {

                window.location.href = config.PLATFORM.DASHBOARD.SSL;

            }
        }else{

            window.location.href = config.PLATFORM.DASHBOARD.SSL;

        }

    }


    return (
        <section className="content__wrap">
            <div className="content__head">
                <i className="title__icon title__icon--population"></i>
                <div className="title__box">
                    <h2 className="title">유동인구</h2>
                    <p>Floating Population Dashboard</p>
                </div>
                <button className="btn btn--population-statistics" onClick={handleModalBtn}><i></i>위치별 방문객
                    수 통계
                </button>
            </div>
            <RightContentArea/>
            <ModalArea/>
        </section>
    )
}

export default RightRootArea

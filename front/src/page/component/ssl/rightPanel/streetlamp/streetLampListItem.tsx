import React, {useEffect} from "react";
import {DeviceResponseData} from "../../../../../config/interface/sslInterface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import {updateActiveDevice, updateActiveListDevice} from "../../../../store/view/ssl/sslViewStore";

const StreetLampListItem = (props: { item: DeviceResponseData }) => {
    const dispatch = useDispatch();

    const deviceActive = useSelector((state: RootState) => state.view.sslRight.activeDevice)
    const activeDeviceList = useSelector((state: RootState) => state.view.sslRight.activeDeviceList);
    const exceptFloatingList: string[] = ['진안동 525-37', '병점동 345-129', '병점동 355-39'];
    const exceptZectorList: string[] = ['진안동 512-6', '진안동 525-44', '진안동 525-37', '병점동 347-16', '진안동 527-3', '병점동345-129'];
    const allExceptList: string [] = ['진안동 544-114', '진안동 544-67', '진안동 512-6', '진안동 515-9', '진안동 842-38', '진안동 539-2', '진안동 525-44', '진안동 842-38', '진안동 525-37', '병점동 347-16', '진안동 527-3', '병점동 348-35', '병점동 345-129'];

    const onclickListHandler = (dvcId: any) => {

        if (activeDeviceList?.dvcId === dvcId) {
            dispatch(updateActiveListDevice(null))
        } else {
            dispatch(updateActiveDevice(null))
            const activeDevice: DeviceResponseData = {
                dvcId: props.item.dvcId,
                dvcNm: props.item.dvcNm,
                location: props.item.location,
                lat: props.item.lat,
                lng: props.item.lng,
            }

            dispatch(updateActiveListDevice(activeDevice))
        }
    }

    const scrollToActiveItem = () => {
        const activeItemElement = document.querySelector('.lamp__item.active')
        if (activeItemElement) {
            activeItemElement.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }

    useEffect(() => {
        scrollToActiveItem();
    }, [deviceActive]);


    return (
        <>
            <ul className="lamp__list">
                <li className={`lamp__item ${deviceActive?.dvcId === props.item.dvcId
                || activeDeviceList?.dvcId === props.item.dvcId ? 'active' : ''}`}
                    onClick={() => onclickListHandler(props.item.dvcId)}>
                    <div className="lamp__item__head">
                        <i className="icon__lamp icon__lamp--smart"></i>
                        <div className="lamp__title">
                            <h3 className="sub-title">{props.item.dvcNm}</h3>
                            <div className="lamp__address">
                                <div className="lamp__address__name">설치위치</div>
                                <div className="lamp__address__value">{props.item.location}</div>
                            </div>
                        </div>
                    </div>

                    <div className="lamp__item__body">
                        <ul className="lamp__info__list">
                            {
                                allExceptList.includes(props.item.dvcNm) ?
                                    '' :
                                    <li className="lamp__info__item lamp__info__item--on">
                                        {/*<li className="lamp__info__item lamp__info__item--off">*/}
                                        <div className="lamp__info__name">LED 가로등</div>
                                        <div className="lamp__info__icon"><i
                                            className="lamp__info__icon--ledLamp"></i></div>
                                        {/*<div className="lamp__info__state">ON</div>*/}
                                    </li>}
                            {/*<li className="lamp__info__item lamp__info__item--working">*/}

                            {
                                allExceptList.includes(props.item.dvcNm) ?
                                    '' :
                                    <li className="lamp__info__item lamp__info__item--off">
                                        <div className="lamp__info__name">카메라(회전)</div>
                                        <div className="lamp__info__icon"><i
                                            className="lamp__info__icon--cctvPtz"></i></div>
                                        {/*<div className="lamp__info__state">작동중</div>*/}
                                    </li>
                            }
                            {/*<li className="lamp__info__item lamp__info__item--working">*/}
                            {

                                allExceptList.includes(props.item.dvcNm) ?
                                    '' :
                                    <li className="lamp__info__item lamp__info__item--off">
                                        <div className="lamp__info__name">카메라(고정)</div>
                                        <div className="lamp__info__icon"><i
                                            className="lamp__info__icon--cctvFix"></i></div>
                                        {/*<div className="lamp__info__state">작동중</div>*/}
                                    </li>
                            }
                            {/*<li className="lamp__info__item lamp__info__item--occur">*/}
                            {
                                allExceptList.includes(props.item.dvcNm) ?
                                    '' :
                                    <li className="lamp__info__item lamp__info__item--off">
                                        <div className="lamp__info__name">비상벨</div>
                                        <div className="lamp__info__icon"><i
                                            className="lamp__info__icon--emergencyBell"></i></div>
                                        {/*<div className="lamp__info__state">이상 발생</div>*/}
                                    </li>
                            }
                            {
                                allExceptList.includes(props.item.dvcNm)?
                                    '' :
                                <li className="lamp__info__item lamp__info__item--off">
                                    <div className="lamp__info__name">LED 안내판</div>
                                    <div className="lamp__info__icon"><i
                                        className="lamp__info__icon--ledBorad"></i></div>
                                    {/*<div className="lamp__info__state">미작동</div>*/}
                                </li>
                            }
                            {
                                exceptZectorList.includes(props.item.dvcNm) ?
                                    '' :
                                    <>
                                        {/*<li className="lamp__info__item lamp__info__item--working">*/}
                                        <li className="lamp__info__item lamp__info__item--off">
                                            <div className="lamp__info__name">스마트젝터</div>
                                            <div className="lamp__info__icon"><i
                                                className="lamp__info__icon--projector"></i></div>
                                            <div className="lamp__info__state">미작동</div>
                                            {/*<div className="lamp__info__state">작동중</div>*/}
                                        </li>
                                    </>

                            }

                            <li className="lamp__info__item lamp__info__item--off">
                                <div className="lamp__info__name">IoT AP</div>
                                <div className="lamp__info__icon"><i
                                    className="lamp__info__icon--ito"></i></div>
                                {/*<div className="lamp__info__state">미작동</div>*/}
                            </li>
                            {/*<li className="lamp__info__item lamp__info__item--working">*/}
                            <li className="lamp__info__item lamp__info__item--off">
                                <div className="lamp__info__name">공공 Wifi AP</div>
                                <div className="lamp__info__icon"><i
                                    className="lamp__info__icon--publicWifi"></i></div>
                                {/*<div className="lamp__info__state">작동중</div>*/}
                            </li>
                            {
                                exceptFloatingList.includes(props.item.dvcNm) ?
                                    '' :
                                    <li className="lamp__info__item lamp__info__item--working">
                                        {/*<li className="lamp__info__item lamp__info__item--off">*/}
                                        <div className="lamp__info__name">유동인구 센서</div>
                                        <div className="lamp__info__icon"><i
                                            className="lamp__info__icon--population"></i></div>
                                        <div className="lamp__info__state">작동중</div>
                                        {/*<div className="lamp__info__state">미작동</div>*/}
                                    </li>
                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default StreetLampListItem
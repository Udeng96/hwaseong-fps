import React from "react";
import {DeviceResponseData} from "../../../../../config/interface/sslInterface";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootStore";
import StreetLampListItem from "./streetLampListItem";

const StreetLampListArea = () => {
    const deviceList = useSelector((state:RootState)=> state.server.sslRight.deviceResponse)

    return (
        <>
            <div className="content__body">
                <div className="lamp__list__wrap">
                    <div className="custom-scroll lamp__list__scroll">
                        {
                            deviceList.length > 0 && deviceList
                                    .filter(item => item.dvcId !== 0)
                                    .map((item: DeviceResponseData, index: number) => (
                                        <StreetLampListItem item={item} key={index} />
                                    ))
                        }
                        {/*<ul className="lamp__list">*/}
                        {/*    <li className="lamp__item active">*/}
                        {/*        <div className="lamp__item__head">*/}
                        {/*            <i className="icon__lamp icon__lamp--smart"></i>*/}
                        {/*            <div className="lamp__title">*/}
                        {/*                <h3 className="sub-title">{props.item.dvcNm}</h3>*/}
                        {/*                <div className="lamp__address">*/}
                        {/*                    <div className="lamp__address__name">설치위치</div>*/}
                        {/*                    <div className="lamp__address__value">{props.item.location}</div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="lamp__item__body">*/}
                        {/*            <ul className="lamp__info__list">*/}
                        {/*                <li className="lamp__info__item lamp__info__item--on">*/}
                        {/*                    <div className="lamp__info__name">LED 가로등</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--ledLamp"></i></div>*/}
                        {/*                    <div className="lamp__info__state">ON</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--working">*/}
                        {/*                    <div className="lamp__info__name">카메라(회전)</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--cctvPtz"></i></div>*/}
                        {/*                    <div className="lamp__info__state">작동중</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--working">*/}
                        {/*                    <div className="lamp__info__name">카메라(고정)</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--cctvFix"></i></div>*/}
                        {/*                    <div className="lamp__info__state">작동중</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--occur">*/}
                        {/*                    <div className="lamp__info__name">비상벨</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--emergencyBell"></i></div>*/}
                        {/*                    <div className="lamp__info__state">이상 발생</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--off">*/}
                        {/*                    <div className="lamp__info__name">LED 안내판</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--ledBorad"></i></div>*/}
                        {/*                    <div className="lamp__info__state">미작동</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--working">*/}
                        {/*                    <div className="lamp__info__name">스마트젝터</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--projector"></i></div>*/}
                        {/*                    <div className="lamp__info__state">작동중</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--off">*/}
                        {/*                    <div className="lamp__info__name">IoT AP</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--ito"></i></div>*/}
                        {/*                    <div className="lamp__info__state">미작동</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--working">*/}
                        {/*                    <div className="lamp__info__name">공공 Wifi AP</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--publicWifi"></i></div>*/}
                        {/*                    <div className="lamp__info__state">작동중</div>*/}
                        {/*                </li>*/}
                        {/*                <li className="lamp__info__item lamp__info__item--off">*/}
                        {/*                    <div className="lamp__info__name">유동인구 센서</div>*/}
                        {/*                    <div className="lamp__info__icon"><i*/}
                        {/*                        className="lamp__info__icon--population"></i></div>*/}
                        {/*                    <div className="lamp__info__state">미작동</div>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*    </li>*/}
                        {/*    /!*<li className="lamp__item lamp__item--off">*!/*/}
                        {/*    /!*    <div className="lamp__item__head">*!/*/}
                        {/*    /!*        <i className="icon__lamp icon__lamp--smart"></i>*!/*/}
                        {/*    /!*        <div className="lamp__title">*!/*/}
                        {/*    /!*            <h3 className="sub-title">둘리문고 2앞</h3>*!/*/}
                        {/*    /!*            <div className="lamp__address">*!/*/}
                        {/*    /!*                <div className="lamp__address__name">설치위치</div>*!/*/}
                        {/*    /!*                <div className="lamp__address__value">병점동 348-10 둘리문고 앞</div>*!/*/}
                        {/*    /!*            </div>*!/*/}
                        {/*    /!*        </div>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*    <div className="lamp__item__body">*!/*/}
                        {/*    /!*        <ul className="lamp__info__list">*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">LED 가로등</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--ledLamp"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">OFF</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">카메라(회전)</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--cctvPtz"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">카메라(고정)</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--cctvFix"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">비상벨</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--emergencyBell"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미발생</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">LED 안내판</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--ledBorad"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">스마트젝터</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--projector"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">IoT AP</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--ito"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">공공 Wifi AP</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--publicWifi"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">유동인구 센서</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--population"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*        </ul>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</li>*!/*/}
                        {/*    /!*<li className="lamp__item lamp__item--off">*!/*/}
                        {/*    /!*    <div className="lamp__item__head">*!/*/}
                        {/*    /!*        <i className="icon__lamp icon__lamp--smart"></i>*!/*/}
                        {/*    /!*        <div className="lamp__title">*!/*/}
                        {/*    /!*            <h3 className="sub-title">둘리문고 앞</h3>*!/*/}
                        {/*    /!*            <div className="lamp__address">*!/*/}
                        {/*    /!*                <div className="lamp__address__name">설치위치</div>*!/*/}
                        {/*    /!*                <div className="lamp__address__value">병점동 348-10 둘리문고 앞</div>*!/*/}
                        {/*    /!*            </div>*!/*/}
                        {/*    /!*        </div>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*    <div className="lamp__item__body">*!/*/}
                        {/*    /!*        <ul className="lamp__info__list">*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">LED 가로등</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--ledLamp"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">OFF</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">카메라(회전)</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--cctvPtz"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">카메라(고정)</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--cctvFix"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">비상벨</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--emergencyBell"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미발생</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">LED 안내판</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--ledBorad"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">스마트젝터</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--projector"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">IoT AP</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--ito"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">공공 Wifi AP</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--publicWifi"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*            <li className="lamp__info__item lamp__info__item--off">*!/*/}
                        {/*    /!*                <div className="lamp__info__name">유동인구 센서</div>*!/*/}
                        {/*    /!*                <div className="lamp__info__icon"><i*!/*/}
                        {/*    /!*                    className="lamp__info__icon--population"></i></div>*!/*/}
                        {/*    /!*                <div className="lamp__info__state">미작동</div>*!/*/}
                        {/*    /!*            </li>*!/*/}
                        {/*    /!*        </ul>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</li>*!/*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
export default StreetLampListArea
import {FloatingData} from "../../../../../../../config/interface/fpsInterface";

const FloatListItem = (props:{data:FloatingData}) => {

    return(
        <div className="event__list__item active ">
            <ul className="row list__box">
                <li className="list__value">
                    <p>{props.data.fromRegion.split('(')[0]}</p>
                    <div className="tooltip">{props.data.fromRegion.split('(')[0]}</div>
                </li>
                <li className="list__value list__value--inflow"><p>{`${props.data.fromCount}명`}</p>
                </li>
                <li className="list__value list__value--location">
                    <div>
                        <i></i><p>{props.data.stdRegion.split('(')[0]}</p>
                        <div className="tooltip">{props.data.stdRegion.split('(')[0]}</div>
                    </div>
                </li>
                <li className="list__value">
                    <p>{props.data.toRegion.split('(')[0]}</p>
                    <div className="tooltip">{props.data.toRegion.split('(')[0]}</div>
                </li>
                <li className="list__value list__value--outflow"><p>{`${props.data.toCount}명`}</p>
                </li>
            </ul>
        </div>

    )

}

export default FloatListItem
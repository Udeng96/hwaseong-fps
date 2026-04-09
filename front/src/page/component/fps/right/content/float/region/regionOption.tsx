import Select, {OnChangeValue} from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store/rootStore";
import {useEffect, useState} from "react";
import {SelectOption} from "../../../../../../../config/interface/commonInterface";
import {updateActiveRegion} from "../../../../../../store/view/fps/rightViewStore";

const RegionOption = () =>{

    const dispatch =  useDispatch();
    const regionOptions : SelectOption[] = useSelector((state:RootState)=> state.server.fpsRight.regionOptions);
    const [selectOption, setSelectOption] = useState<SelectOption>(regionOptions[0]);

    useEffect(()=>{

        if (regionOptions.length>0){

            setSelectOption(regionOptions[0]);
            dispatch(updateActiveRegion(regionOptions[0]));

        }

    },[regionOptions])

    const handleChange = (e: any) => {
        setSelectOption(e!!);
        dispatch(updateActiveRegion(e!!));

    }

    return(
        <div className="select-box">
            <Select
                isSearchable={false}
                className={"select-area"}
                classNamePrefix={"select-area"}
                defaultMenuIsOpen={false}
                defaultInputValue={''}
                value={selectOption}
                defaultValue={selectOption}
                options={regionOptions}
                onChange={(e) => handleChange(e)}
            />
        {/*    */}
        {/*    <button className="btn--select select__region">전체</button>*/}
        {/*    <div className="drop-down drop__select__region">*/}
        {/*        <div className="region__scroll custom-scroll">*/}
        {/*            <ul className="select__list__wrap">*/}
        {/*                <li className="select__list">*/}
        {/*                    <button className="select__list__item selected">전체</button>*/}
        {/*                </li>*/}
        {/*                <li className="select__list">*/}
        {/*                    <button className="select__list__item">지역명01</button>*/}
        {/*                </li>*/}
        {/*                <li className="select__list">*/}
        {/*                    <button className="select__list__item">지역명02지역명02지역명02지역명02지역명02*/}
        {/*                    </button>*/}
        {/*                </li>*/}
        {/*                <li className="select__list">*/}
        {/*                    <button className="select__list__item">지역명03</button>*/}
        {/*                </li>*/}
        {/*                <li className="select__list">*/}
        {/*                    <button className="select__list__item">지역명04</button>*/}
        {/*                </li>*/}
        {/*                <li className="select__list">*/}
        {/*                    <button className="select__list__item">지역명05</button>*/}
        {/*                </li>*/}
        {/*                <li className="select__list">*/}
        {/*                    <button className="select__list__item">지역명06</button>*/}
        {/*                </li>*/}
        {/*            </ul>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        </div>
    )
}

export default RegionOption
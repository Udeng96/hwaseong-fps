const LegendItem = (props : {color : string,  title : string,  value : number}) => {

    return(
        <div className={`chart__legend__box chart__legend__box--${props.color}`}>
            <p className="chart__legend__title"><i></i>{props.title}</p>
            <p className="chart__legend__value">{props.value}</p>
        </div>
    )

}

export default LegendItem
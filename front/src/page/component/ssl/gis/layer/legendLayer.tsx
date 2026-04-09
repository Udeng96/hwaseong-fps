const LegendLayer = () => {
    return(
        <div className="gis__legend gis__legend--flow">
            <div className="legend__wrap">
                <p className="legend__title"><span>이용자 동선</span> 기준표</p>
                <div className="legend__area">
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--user-path01"></div>
                        <p className="legend__box__name">0~99명</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--user-path02"></div>
                        <p className="legend__box__name">100~499명</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--user-path03"></div>
                        <p className="legend__box__name">500~999명</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--user-path04"></div>
                        <p className="legend__box__name">1,000~2,499명</p>
                    </div>
                    <div className="legend__box">
                        <div className="legend__box__img legend__box__img--user-path05"></div>
                        <p className="legend__box__name">2,500명 이상 </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LegendLayer
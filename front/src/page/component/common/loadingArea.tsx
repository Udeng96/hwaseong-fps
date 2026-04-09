const LoadingArea = () => {

    return(
        <div className="loading" style={{display:'none'}}>
            <div className="dimmed"></div>
            <div className="loading__wrap">
                <div className="loading__ani">
                    <div className="loading__ani__dot">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <p className="loading__message">데이터를 불러오는 중입니다.</p>
            </div>
        </div>
    )

}
export default LoadingArea
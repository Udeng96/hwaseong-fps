export interface StayTimeResponse{
    durFrom1To5M : number,
    durFrom5To10M : number,
    durFrom10To20M : number,
    durFrom20To40M : number,
    durFrom40To60M : number,
    durOver1H : number,
}

export interface RegionResponse{
    regionId : string,
    gisX : string,
    name : string,
    gisY : string,
}

export interface VisitorResponse{
    totalCount : number,
    visitorCountResponse : VisitorCountData[]
}

export interface AnalyticVisitorResponse{
    visitorPredictCountData : AnalyticVisitorCountData[]
}

export interface MigrationResponse{
    fromId : string,
    toId : string,
    forName : string,
    toName : string,
    count : string,
    fromCoordinates : CoordinatesData,
    toCoordinates : CoordinatesData
}

export interface CoordinatesData{
    gisX : number,
    gisY : number
}

export interface VisitorCountData{
    region : string,
    count : number,
}

export interface AnalyticVisitorCountData{
    region : number,
    count : number,
    previous : number,
    predictLower : number,
    predictUpper : number,
}


export interface TimeParam{

    startDtm : string,
    endDtm : string

}

export interface VisitorParam{
    starDtm ?: string,
    endDtm ?: string,
    latest ?: string,
}

export interface LastParam{
    startDtm : string,
    endDtm : string,
    previous : string,
}

export interface VisitorPercentData{
    lat : number,
    lng : number,
    regionId : string,
    regionNm ?:string,
    percent : number,
}

export interface VisitorAgoData{
    region : number,
    count : number,
    previous : number,
}

export interface VisitorPredictData{
    region : number,
    count : number,
    prediction : number,
}

export interface FloatingData{

    stdId : string,
    fromRegion : string,
    toRegion : string,
    stdRegion : string,
    fromCount : number,
    toCount : number,
    fromX : number,
    fromY : number,
    toX : number,
    toY : number,
    stdX : number,
    stdY : number,
}

export interface FromStdData{
    fromRegion : string,
    stdRegion : string,
    stdId : string,
    fromCount : number,
    fromX : number,
    fromY : number,
    stdX : number,
    stdY : number,
}

export interface ToStdData{
    stdRegion : string,
    toRegion : string,
    stdId : string,
    toCount : number,
    stdX : number,
    stdY : number,
    toX : number,
    toY : number,
}

export interface MigrationData{
    from : string,
    to : string,
    fromGis : [number,  number],
    toGis : [number,  number],
    count : number,
}

export interface MigrationType {

    from : [number,  number],
    to : [number,  number],
    labels : [string,  string],
    color : string,
    value : string,

}

export interface VisitorPopupData{
    locId : number,
    locNm : string,
    count : number,
    lat : number,
    lng : number,
}





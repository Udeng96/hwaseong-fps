export interface SelectOption {
    value : string,
    label : string,
}

export interface UserInfo{
    token : string,
    userName : string,
    userType : string,
    loginId : string,
    cpNo : string,
}

export interface CctvData{
    facId : string,
    facNm : string,
    lat : number,
    lng : number
    mgrNo : string
}
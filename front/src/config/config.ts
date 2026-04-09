import {LatLngTuple} from "leaflet";


export const domain = (window.location.host);


//////////////////////////////// DEP

const API_URL : string = `http://${domain}/bjapi`;
// // const API_URL : string = `http://localhost:22512/bjapi`;
const OMS_URL : string = `http://${domain}/oms`;
export const DASHBOARD_URL : string = `http://${domain}/bjapi`;
export const STREAM_URL = `ws://${domain}/xeus-gate/stream`;




///////////////////////////////////// DEV
//api url
// const API_URL : string = `http://localhost:22512/bjapi`;
// const OMS_URL : string = `http://localhost:11910/oms`;
// export const DASHBOARD_URL : string = `http://localhost:3000/bjapi`;
// export const STREAM_URL = `ws://localhost:22512/`;


// 화성 위치
export const HS_POS : LatLngTuple  = [37.208704, 127.034740];
export const IS_DEV : boolean = false;

export const MANAGER_TYPE : string  = "001";

export const PLAYER_ID_PREFIX = 'video_Player_';


const URL_FPS= {
    STAY_TIME : `${API_URL}/fps/stayTime`,
    REGION_LIST : `${API_URL}/fps/region`,
    VISITOR_COUNT : `${API_URL}/fps/visitor`,
    VISITOR_ANALYTIC : `${API_URL}/fps/visitor/predictions`,
    MIGRATION : `${API_URL}/fps/migration`,
    EXCEL_DOWNLOAD : `${API_URL}/fps/excelDownload`,
}

const URL_SSL = {
    DEVICE_LIST : `${API_URL}/ssl/device`,
}

const URL_USER = {
    USER_INFO : `${API_URL}/user`,
}

const URL_COMMON = {
    CCTV_LIST : `${API_URL}/fps/cctv`,
}


const OMS = {
    OMS_URL,
    SYS_VIEW : `${OMS_URL}/login/goSysSelView`,
    LOG_OUT : `${OMS_URL}/api/user/logout`

}

const DASHBOARD = {
    FPS : `${DASHBOARD_URL}/fps`,
    SSL : `${DASHBOARD_URL}/ssl`
}

const API = {

    SYSTEM : {
        KEY : 'YOUR_API_KEY',
        SECRET : 'YOUR_API_SECRET',
    },

    API : {

        FPS : {
            URL_FPS
        },
        SSL : {
            URL_SSL
        }

    },
    TOP : {
        USER : {
            URL_USER
        }
    },
    COMMON : {
        URL_COMMON
    }
}


export default {
    PLATFORM: {
        OMS,
        DASHBOARD
    },
    API,
}

import config from "../../../config/config";
import {xhr} from "../../../config/xhr";


export const fetchCctvList = async() => {
    const {data} = await xhr.get(config.API.COMMON.URL_COMMON.CCTV_LIST);
    return data;
}
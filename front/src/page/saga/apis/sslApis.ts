import {xhr} from "../../../config/xhr";
import config from "../../../config/config";

export const fetchGetDevice = async() => {
    const {data} = await xhr.get(config.API.API.SSL.URL_SSL.DEVICE_LIST);
    return data;
}
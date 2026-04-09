import {xhr} from "../../../config/xhr";
import config from "../../../config/config";
import axios from "axios";

export const fetchUserInfo = async(params : string) => {
    const {data} = await xhr.get(config.API.TOP.USER.URL_USER.USER_INFO,{params: {token:params}});
    return data;
}

export const logout = async() =>{

    // 백엔드에서 cookie 와 session 에 token 을 넣어놨으므로 가져온다.
    const token = sessionStorage.getItem("token") as string;


    if (token === '' || typeof token === 'undefined' || token == null){

        // token 이 존재하지 않으면 oms 화면으로 돌아간다.
        window.location.href = config.PLATFORM.OMS.OMS_URL;

    }

    await axios.post(
        config.PLATFORM.OMS.LOG_OUT, null,
        {
            params : {token},
            headers : {
                systemKey : config.API.SYSTEM.KEY,
                secret : config.API.SYSTEM.SECRET
            }
        }
    ).then(function (response){
        const {data} = response
        const result = data.result
        const message = data.message

        if (result != 'FAIL'){
            window.location.href = config.PLATFORM.OMS.OMS_URL

        }else{
            alert('로그아웃에 실패하였습니다.')
        }
    }).catch(function (error){
        console.log("error:",error);
        alert('로그아웃에 실패하였습니다.')

    })
}


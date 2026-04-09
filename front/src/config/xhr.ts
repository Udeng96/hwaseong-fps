import axios from "axios";

// export const xhr = axios.create({
//
//
//
// })

const fetchClient = () => {

    let instance = axios.create();

    instance.interceptors.request.use(function (config) {
        let token:string = ``
        if (typeof window !== 'undefined') {

            token =  sessionStorage.getItem('token') as string;
        }
        config.headers!.token =  token ? token : '';
        return config;
    });

    return instance;
};
export const xhr = fetchClient()
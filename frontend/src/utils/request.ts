import axios from 'axios'
import qs from 'query-string'
import {message} from "antd";
// import Cookies from "js-cookie";

axios.defaults.baseURL = `http://${window.location.host}`

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 处理响应错误
    message?.error(error?.response?.data?.msg)
    return Promise.reject(error);
});

export const PostToBackend = (uri:string, data:any) => {
    // const jwt = Cookies.get('jwt')
    // axios.interceptors.request.use(
    //     config => {
    //         config.headers['Authorization'] = `Bearer ${jwt}`
    //         return config
    //     }
    // );
    return axios.post(uri, data)
}

export const GetFromBackend = (uri:string, data:any) => {
    // Request interceptors for API calls
    const param = qs.stringify(data)
    return axios.get(data ? `${uri}?${param}` : uri)
}
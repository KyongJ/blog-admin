import axios from 'axios';
import { message as Imessage } from 'antd';
axios.defaults.timeout = 5000; //超时时间5秒
axios.defaults.withCredentials = true; //允许跨域,携带cookie
//请求拦截
axios.interceptors.request.use(
    config => {
        // console.log('config',config);
        return config;
    },
    error => {
        return Promise.reject(error); //这里返回一个promise对象
    }
);

//响应拦截
axios.interceptors.response.use(
    response => {
        //请求成功对响应数据进行处理
        console.log('response', response);
        switch (response.data.code) {
            case 200:
                return response;
            case 2001:
                window.sessionStorage.removeItem('isLogin');
                Imessage.error(response.data.message);
                return;
            default:
                Imessage.error(response.data.message ? response.data.message : '系统出错');
                return;
        }
    },
    err => {
        return Promise.reject(err);
    }
);
export default function ajax(url: string, data = {}, type = 'GET', config?: object) {
    let promise: Promise<any>;
    return new Promise((resolve, reject) => {
        if (type === 'GET') {
            promise = axios.get(url, { params: data });
        } else if (type === 'POST') {
            console.log('data', data);
            promise = axios.post(url, data, config);
        } else if (type === 'DELETE') {
            promise = axios.delete(
                url,
                { data } // 指定请求参数
            );
        } else if (type === 'PUT') {
            promise = axios.put(url, data, config);
        }

        //成功
        promise
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

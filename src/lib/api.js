import axios from 'axios';


const key = '88b2fa8844a680b943e623bb7b04b7758ccbce01aae37e36b16ac889ca3b91f9';

const baseApi = "http://mock.biaoyansu.com/api/1/";


function sign(key, timestamp) {
    return btoa(key + timestamp);
}

export default function api(url, params) {

    let timestamp = (new Date).getTime();
    let signature = sign(key, timestamp);

    let opt = {
        headers: {
            'biao-mock-app-key': key,
            'biao-mock-timestamp': timestamp,
            'biao-mock-signature': signature,
        }
    }

    url = baseApi + url;

    return axios
        .post(url, params, opt)
        .then(res => {
            return res.data;
        });
}
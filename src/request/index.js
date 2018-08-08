import Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
// import { hashHistory } from 'react-router';
import apiConfig from './api';
// import Cookie from '../Tool/cookie';

const TIMEOUTLIMIT = 120000;

const embedFetch = (requestPromise, timeout = TIMEOUTLIMIT) => {
    let timeoutAction = null;
    const timerPromise = new Promise((resolve, reject) => {
        timeoutAction = () => {
            reject(new Error('请求超时'));
        };
    });
    setTimeout(() => {
        timeoutAction();
    }, timeout);
    return Promise.race([requestPromise, timerPromise]);
};

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
}

function json(response) {
    return response.json();
}

export function getData(url, queryObj) {
    const token = localStorage.getItem('pec_login_token');
    const reqHeader = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: token,
        },
    };
    const myFetch = fetch(`${url}?${queryString.stringify(queryObj)}`, reqHeader);
    return new Promise((resolve, reject) => {
        embedFetch(myFetch, TIMEOUTLIMIT)
            .then(status)
            .then(json)
            .then((responseData) => {
                resolve(responseData);
            })
            .catch((error) => {
                console.warn('服务器连接错误，请稍后再试');
                reject(error);
            });
    });
}

export function postJsonData(url, queryObj) {
    const token = localStorage.getItem('pec_login_token');
    const reqJson = {
        method: 'POST',
        body: JSON.stringify(queryObj),
        mode: 'cors',
        credentials: 'include',
        headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: token,
        },
    };
    reqJson['Content-Type'] = 'application/json; charset=utf-8';
    const myFetch = fetch(url, reqJson);

    return new Promise((resolve, reject) => {
        embedFetch(myFetch, TIMEOUTLIMIT)
            .then(status)
            .then(json)
            .then((responseData) => {
                resolve(responseData);
            })
            .catch((error) => {
                console.warn('服务器连接错误，请稍后再试');
                reject(error);
            });
    });
}

function getApi() {
    return apiConfig;
}
export const api = getApi();


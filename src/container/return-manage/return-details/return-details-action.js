import { getData, postJsonData, api } from '../../../request';

export const ADD = 'DEMO_ADD';

export function add() {
    return {
        type: ADD,
    };
}
export function a(x, y) {
    return x + y;
}
export function subtraction(x, y) {
    return x - y;
}
export function fetchData(cbk) {
    setTimeout(() => {
        cbk(2);
    }, 1000);
}
export function fetchData2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(3);
        }, 1000);
    });
}
// 测试mock的get请求
export function omsPager(params) {
    return () => getData(api.omsPager, { ...params }).then((res) => {
        console.log(res, 'res');
    });
}
// 测试mock的post请求
export function saveOms(params) {
    return () => postJsonData(api.saveOms, { ...params }).then((res) => {
        console.log(res, 'res');
    });
}

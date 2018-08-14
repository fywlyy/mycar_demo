import { api, getData } from '../../../request';

export const TEST = 'DELIVERY_TEST';
export const SET_CUSTOMER_LIST = 'DELIVERY_SET_CUSTOMER_LIST';
export const SET_DEPARTMENT_LIST = 'DELIVERY_SET_DEPARTMENT_LIST';
export const SET_PERSONAL_LIST = 'DELIVERY_SET_PERSONAL_LIST';
export const SET_ORDER_OPTION_LIST = 'DELIVERY_SET_ORDER_OPTION_LIST';
export function test() {
    return {
        type: TEST,
    };
}
/**
 * 设置客户列表
 * */
function setCustomerList(data) {
    return {
        type: SET_CUSTOMER_LIST,
        data,
    };
}
function setDepartmentList(data) {
    return {
        type: SET_DEPARTMENT_LIST,
        data,
    };
}
function setPersonalList(data) {
    return {
        type: SET_PERSONAL_LIST,
        data,
    };
}
function setOrderOptionList(data) {
    return {
        type: SET_ORDER_OPTION_LIST,
        data,
    };
}
export function queryCustomerList() {
    return function (dispatch) {
        getData(api.queryCustomerList, {}).then((res) => {
            if (res.success && res.data) {
                dispatch(setCustomerList(res.data));
            }
        });
    };
}
export function queryDepartmentList() {
    return function (dispatch) {
        getData(api.queryDepartmentList, {}).then((res) => {
            if (res.success && res.data) {
                dispatch(setDepartmentList(res.data));
            }
        });
    };
}
export function queryBusinessPersonalList() {
    return function (dispatch) {
        getData(api.queryBusinessPersonalList, {}).then((res) => {
            if (res.success && res.data) {
                dispatch(setPersonalList(res.data));
            }
        });
    };
}
export function queryOrderList() {
    return function (dispatch) {
        getData(api.queryOrderList).then((res) => {
            if (res.success && res.data) {
                dispatch(setOrderOptionList(res.data));
            }
        });
    };
}

export function queryInitData() {
    return function (dispatch) {
        dispatch(queryCustomerList());
        dispatch(queryDepartmentList());
        dispatch(queryBusinessPersonalList());
        dispatch(queryOrderList());
    };
}


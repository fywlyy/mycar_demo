import { notification } from 'antd';
import Api from '../../../request/api';
import { getData, postJsonData } from '../../../request';

const TYPES = {};
TYPES.LOAD_ING = 'TEST.LOAD_ING';
TYPES.INITIAL_DONE = 'TEST.INITIAL_DONE';
TYPES.WILL_UNMOUNT = 'TEST.WILL_UNMOUNT';
// loading
const loading = () => ({ type: TYPES.LOAD_ING });
const noticemessage = (type, title, message) => {
    notification[type]({
        message: title,
        description: message || '',
    });
};
// 初始化页面请求数据
const initial = params => (dispatch) => {
    dispatch(loading());
    return getData(Api.stockListPager, { ...params }).then(({ success, result, message }) => {
        if (success) {
            dispatch(loading());
            dispatch({ type: TYPES.INITIAL_DONE, data: result });
        } else {
            dispatch(noticemessage('error', message));
        }
    }).catch((err) => {
        dispatch(loading());
        if (err.message === 'Internal Server Error') {
            dispatch(noticemessage('error', 'Request error!'));
        }
    });
};
/** 参数改变 @param {{name:value}-参数} */
const setSearchParams = (params) => {
    return { type: TYPES.SET_SEARCH_PARAMS, searchParams: params };
};
// 卸载页面
const willUnmount = () => ({ type: TYPES.WILL_UNMOUNT });

export {
    initial,
    willUnmount,
    setSearchParams,
    TYPES,
};

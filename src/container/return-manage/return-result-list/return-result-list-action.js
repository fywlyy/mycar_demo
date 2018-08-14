import { message } from 'antd';
import { getData, api } from '../../../request';

export const SET_LIST_RETURN_RESULT = 'SET_LIST_RETURN_RESULT';
export const START_SEARCH_RETURN_RESULT = 'START_SEARCH_RETURN_RESULT';
export const END_SEARCH_RETURN_RESULT = 'END_SEARCH_RETURN_RESULT';

export function startSearch() {
    return {
        type: START_SEARCH_RETURN_RESULT,
    };
}

export function endSearch() {
    return {
        type: END_SEARCH_RETURN_RESULT,
    };
}

export function setReturnFormList(data) {
    return {
        type: SET_LIST_RETURN_RESULT,
        data,
    };
}

export function searchReturnResultList(params) {
    return (dispatch) => {
        dispatch(startSearch());
        return getData(api.queryReturnResultLsit, { ...params }).then((res) => {
            const { result, success, msg } = res;

            if (success) {
                result.content.map((item, index) => {
                    item.key = item.id;
                    item.index = index + 1;
                    return false;
                });
                dispatch(setReturnFormList({
                    listData: result.content,
                    total: result.totalElements,
                    params,
                }));
            } else {
                message.error(msg);
            }
            dispatch(endSearch());
        });
    };
}

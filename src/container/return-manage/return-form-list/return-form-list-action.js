import { message } from 'antd';
import { getData, api } from '../../../request';

export const SET_LIST_RETURN_FORM = 'SET_LIST_RETURN_FORM';
export const START_SEARCH_RETURN_FORM = 'START_SEARCH_RETURN_FORM';
export const END_SEARCH_RETURN_FORM = 'END_SEARCH_RETURN_FORM';

export function startSearch() {
    return {
        type: START_SEARCH_RETURN_FORM,
    };
}

export function endSearch() {
    return {
        type: END_SEARCH_RETURN_FORM,
    };
}

export function setReturnFormList(data) {
    return {
        type: SET_LIST_RETURN_FORM,
        data,
    };
}


export function searchReturnFormList(params) {
    return (dispatch) => {
        dispatch(startSearch());
        return getData(api.queryReturnFormLsit, { ...params }).then((res) => {
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

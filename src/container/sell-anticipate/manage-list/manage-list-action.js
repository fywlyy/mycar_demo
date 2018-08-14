import { api, getData } from '../../../request';

export const SAL_START_REQ = 'SAL_START_REQ';
export const SAL_FINISH_REQ = 'SAL_FINISH_REQ';
export const SAL_RECORD_QUERY_PARAMS = 'SAL_RECORD_QUERY_PARAMS';
export const SAL_RECORD_QUERY_RESULT = 'SAL_RECORD_QUERY_RESULT';

export function startQuery() {
    return {
        type: SAL_START_REQ,
    };
}

export function finishQuery() {
    return {
        type: SAL_FINISH_REQ,
    };
}

export function recordQueryParams(data) {
    return {
        type: SAL_RECORD_QUERY_PARAMS,
        data,
    };
}

export function recordQueryResult(data) {
    return {
        type: SAL_RECORD_QUERY_RESULT,
        data,
    };
}

export function queryList(params) {
    return async (dispatch) => {
        dispatch(startQuery());
        dispatch(recordQueryParams(params));
        const response = await getData(api.querySellAnticipateList, params);
        if (response.success) {
            dispatch(recordQueryResult(response.result));
        }

        dispatch(finishQuery());
    };
}


// export function deleteRow(id) {
//    return async (dispatch) => {
//
//    };
// }

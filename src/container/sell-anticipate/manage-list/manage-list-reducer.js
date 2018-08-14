import {
    SAL_START_REQ,
    SAL_FINISH_REQ,
    SAL_RECORD_QUERY_PARAMS,
    SAL_RECORD_QUERY_RESULT,
} from './manage-list-action';

const initialState = {
    queryParams: {
        __datesal: null,
        __userName: '',
        pageNo: 1,
        pageSize: 10,
    },
    isLoading: false,
    items: [],
    total: 0,

};

export default function sellAnticipate(state = initialState, action) {
    switch (action.type) {
        case SAL_START_REQ:
            return {
                ...state,
                isLoading: true,
            };

        case SAL_FINISH_REQ:
            return {
                ...state,
                isLoading: false,
            };

        case SAL_RECORD_QUERY_PARAMS:
            return {
                ...state,
                queryParams: action.data,
            };

        case SAL_RECORD_QUERY_RESULT:
            return {
                ...state,
                items: action.data.content,
                total: action.data.totalElements,
            };

        default:
            return state;
    }
}

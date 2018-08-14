import {
    SET_LIST_RETURN_RESULT,
    START_SEARCH_RETURN_RESULT,
    END_SEARCH_RETURN_RESULT,
} from './return-result-list-action';

const initialState = {
    params: {
        pageNo: 1,
        pageSize: 10,
        returnOrder: '',
        status: '',
    },
    total: 0,
    returnResultListData: [],
    isRequesting: false,
};

export default function returnResultList(state = initialState, action = {}) {
    switch (action.type) {
        case SET_LIST_RETURN_RESULT:
            return {
                ...state,
                returnResultListData: action.data.listData,
                params: action.data.params,
                total: action.data.total,
            };
        case START_SEARCH_RETURN_RESULT:
            return { ...state, isRequesting: true };
        case END_SEARCH_RETURN_RESULT:
            return { ...state, isRequesting: false };
        default:
            return state;
    }
}

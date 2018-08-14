import {
    SET_LIST_RETURN_FORM,
    START_SEARCH_RETURN_FORM,
    END_SEARCH_RETURN_FORM,
} from './return-form-list-action';

const initialState = {
    params: {
        pageNo: 1,
        pageSize: 10,
        returnOrder: '',
        status: '',
    },
    total: 0,
    returnFormListData: [],
    isRequesting: false,
};

export default function returnFormList(state = initialState, action = {}) {
    switch (action.type) {
        case SET_LIST_RETURN_FORM:
            return {
                ...state,
                returnFormListData: action.data.listData,
                params: action.data.params,
                total: action.data.total,
            };
        case START_SEARCH_RETURN_FORM:
            return { ...state, isRequesting: true };
        case END_SEARCH_RETURN_FORM:
            return { ...state, isRequesting: false };
        default:
            return state;
    }
}

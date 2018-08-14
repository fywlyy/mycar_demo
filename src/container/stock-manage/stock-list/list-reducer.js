import { TYPES } from './list-action';

const initialState = {
    tableList: [], // 详情信息
    loading: false, // 设置loading默认状态
    searchParams: {
        warehouse: '',
        skuCode: '',
        productName: '',
        barCode: '',
        pageNo: 1,
        pageSize: 10,
    },
    total: 15, // 总页数
};
export default function computer(state = initialState, action = {}) {
    switch (action.type) {
        case TYPES.INITIAL_DONE: {
            return { ...state, tableList: action.data.list };
        }
        case TYPES.LOAD_ING: {
            return { ...state, loading: !state.loading };
        }
        case TYPES.SET_SEARCH_PARAMS: {
            return { ...state, searchParams: { ...state.searchParams, ...action.searchParams } };
        }
        case TYPES.WILL_UNMOUNT: {
            console.log(initialState,'initialState')
            return { ...initialState };
        }
        default:
            return state;
    }
}

import {
    TEST,
    SET_ORDER_OPTION_LIST,
    SET_PERSONAL_LIST,
    SET_DEPARTMENT_LIST,
    SET_CUSTOMER_LIST
} from './new-delivery-order-action';

const initialState = {
    index: 0,
    customerOptionArr: [],
    departmentOptionArr: [],
    businessPersonalOptionArr: [],
    orderOptionArr: [],
    client: null,
    department: null,
    businessPersonal: null,
    order: null,
};
export default function computer(state = initialState, action = {}) {
    switch (action.type) {
        case TEST:
            return Object.assign({}, state, { index: state.index + 1 });
        case SET_DEPARTMENT_LIST:
            return Object.assign({}, state, { departmentOptionArr: action.data });
        case SET_CUSTOMER_LIST:
            return Object.assign({}, state, { customerOptionArr: action.data });
        case SET_PERSONAL_LIST:
            return Object.assign({}, state, { businessPersonalOptionArr: action.data });
        case SET_ORDER_OPTION_LIST:
            return Object.assign({}, state, { orderOptionArr: action.data });
        default:
            return state;
    }
}

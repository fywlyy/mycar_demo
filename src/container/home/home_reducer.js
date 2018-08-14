import {
    HOME_START_REQ,
    HOME_FINISH_REQ,
    HOME_ADD_NUM,
    HOME_SUBTRACT_NUM,
    HOME_RESET_NUM,
} from './home_action';

const initialState = {
    isRequesting: false,
    count: 0,
};

export default function computer(state = initialState, action = {}) {
    switch (action.type) {
        case HOME_START_REQ:
            return Object.assign({}, state, { isRequesting: true });

        case HOME_FINISH_REQ:
            return Object.assign({}, state, { isRequesting: false });

        case HOME_ADD_NUM:
            return {
                ...state,
                count: state.count + action.data,
            };

        case HOME_SUBTRACT_NUM:
            return {
                ...state,
                count: state.count - action.data,
            };

        case HOME_RESET_NUM:
            return {
                ...initialState,
            };

        default:
            return state;
    }
}

import { ADD } from './demo-action';

const initialState = {
    index: 0,
};
export default function computer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD:
            return Object.assign({}, state, { index: state.index + 1 });
        default:
            return state;
    }
}

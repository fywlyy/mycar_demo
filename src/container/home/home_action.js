export const HOME_START_REQ = 'HOME_START_REQ';
export const HOME_FINISH_REQ = 'HOME_FINISH_REQ';
export const HOME_ADD_NUM = 'HOME_ADD_NUM';
export const HOME_SUBTRACT_NUM = 'HOME_SUBTRACT_NUM';
export const HOME_RESET_NUM = 'HOME_RESET_NUM';

export function startRequest() {
    return {
        type: HOME_START_REQ,
    };
}

export function finishRequest() {
    return {
        type: HOME_FINISH_REQ,
    };
}


export function addNumber(data) {
    return {
        type: HOME_ADD_NUM,
        data,
    };
}

export function subtractNumber(data) {
    return {
        type: HOME_SUBTRACT_NUM,
        data,
    };
}

export function resetNumber() {
    return {
        type: HOME_RESET_NUM,
    };
}

const requestPromise = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1600);
    });


export function getPermissionFromServer(type, number) {
    return async (dispath) => {
        dispath(startRequest());
        const response = await requestPromise();
        if (response.success) {
            if (type === 'add') {
                dispath(addNumber(number));
            } else {
                dispath(subtractNumber(number));
            }
        }
        return dispath(finishRequest());
    };
}

/**
 * Created by zhongwangsheng on 2017/12/4.
 */
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import Reducer from '../reducer/index';

let EnhancerMiddleware = applyMiddleware(thunk);

/* eslint no-underscore-dangle: 0 */
if (process.env.NODE_ENV === 'develop-hot') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    EnhancerMiddleware = composeEnhancers(applyMiddleware(thunk));
}

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

export default () => {
    const store = createStore(persistedReducer, EnhancerMiddleware);
    const persistor = persistStore(store);
    return { store, persistor };
};

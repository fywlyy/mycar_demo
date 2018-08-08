import 'es6-promise/auto';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { render } from 'react-dom';

import './asset/css/style.scss';
import './asset/Iconfont/iconfont.css';

import RouterMap from './router/index';
import Store from './store/index';

const { store, persistor } = Store();
/* eslint no-underscore-dangle: 0 */
window._debug_store_ = store;
render((
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterMap routerStore={store} />
        </PersistGate>
    </Provider>), document.getElementById('root'));

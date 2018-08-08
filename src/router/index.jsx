import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
/* eslint import/no-extraneous-dependencies: 0 */
import createHistory from 'history/createHashHistory';
import React from 'react';
import App from '../container/app';
import Home from '../container/home';
import Demo from '../container/demo';
import LazyLoadDemo from '../container/lazyload-demo';
import DecoratorLazy from '../container/lazyload-demo/pages/decorator';
import NormalLazy from '../container/lazyload-demo/pages/normal';
import ScrollLazy from '../container/lazyload-demo/pages/scroll';
import OverflowLazy from '../container/lazyload-demo/pages/overflow';
import ImageLazy from '../container/lazyload-demo/pages/image';
import DebounceLazy from '../container/lazyload-demo/pages/debounce';
import PlaceholderLazy from '../container/lazyload-demo/pages/placeholder';
import FadeInLazy from '../container/lazyload-demo/pages/fadein';
// lazyload demo component


const Loading = () => (<p>Loading</p>);

const Other = Loadable({
    loader: () => import('../container/other'),
    loading: Loading,
});

const SphereViewer = Loadable({
    loader: () => import(/* webpackChunkName: "SphereViewer" */'../container/sphereViewer'),
    loading: Loading,
});

const MyCar360 = Loadable({
    loader: () => import(/* webpackChunkName: "MyCar360" */'../container/mycar-360'),
    loading: Loading,
});

const hashHistory = createHistory();

/**
* @usage : 根据登录情况，编写不同的模板
* @remark : 登录页面和不登录页面布局不一样
*/
const myRouter = () =>
    (
        <Router history={hashHistory}>
            <App>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/other" component={Other} />
                    <Route exact path="/demo" component={Demo} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/image-lazy" component={ImageLazy} />
                    <Route exact path="/decorator-lazy" component={DecoratorLazy} />
                    <Route exact path="/normal-lazy" component={NormalLazy} />
                    <Route exact path="/scroll-lazy" component={ScrollLazy} />
                    <Route exact path="/overflow-lazy" component={OverflowLazy} />
                    <Route exact path="/debounce-lazy" component={DebounceLazy} />
                    <Route exact path="/placeholder-lazy" component={PlaceholderLazy} />
                    <Route exact path="/fadein-lazy" component={FadeInLazy} />
                    <Route exact path="/lazy-demo" component={LazyLoadDemo} />
                    <Route exact path="/sphere-viewer" component={SphereViewer} />
                    <Route exact path="/my-car-360" component={MyCar360} />
                </Switch>
            </App>
        </Router>);

export default myRouter;

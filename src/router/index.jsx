import { Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
/* eslint import/no-extraneous-dependencies: 0 */
import createHistory from 'history/createHashHistory';
import React from 'react';
import App from '../container/app';
import LanguageDecorator from '../container/language-decorator';
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
import Login from '../container/login';
import SellAnticipateList from '../container/sell-anticipate/manage-list';
import SellAnticipateSubmit from '../container/sell-anticipate/plan-submit';
import StockList from '../container/stock-manage/stock-list';

const Loading = () => (<p>Loading</p>);

const Other = Loadable({
    loader: () => import('../container/other'),
    loading: Loading,
});

const NewDeliveryOrder = Loadable({
    loader: () => import(/* webpackChunkName: "NewDeliveryOrder" */'../container/delivery/new-delivery-order/NewDeliveryOrder'),
    loading: Loading,
});

const ReturnFormList = Loadable({
    loader: () => import(/* webpackChunkName: "ReturnFormList" */'../container/return-manage/return-form-list'),
    loading: Loading,
});

const ReturnResultList = Loadable({
    loader: () => import(/* webpackChunkName: "ReturnFormList" */'../container/return-manage/return-result-list'),
    loading: Loading,
});

const ReturnDetails = Loadable({
    loader: () => import(/* webpackChunkName: "ReturnFormList" */'../container/return-manage/return-details'),
    loading: Loading,
});

const hashHistory = createHistory();

const LoggedInApp = LanguageDecorator(App);
const UnLogin = LanguageDecorator(Login);

/**
* @usage : 根据登录情况，编写不同的模板
* @remark : 登录页面和不登录页面布局不一样
*/
const myRouter = () =>
    (
        <Router history={hashHistory}>
            <Switch>
                <Route path="/login" exact component={UnLogin} />
                <LoggedInApp>
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
                        <Route exact path="/sell-anticipate" component={SellAnticipateList} />
                        <Route exact path="/sell-anticipate/submit" component={SellAnticipateSubmit} />
                        <Route exact path="/new-delivery-order" component={NewDeliveryOrder} />
                        <Route exact path="/return-form-list" component={ReturnFormList} />
                        <Route exact path="/return-result-list" component={ReturnResultList} />
                        <Route exact path="/return-details" component={ReturnDetails} />
                        <Route exact path="/stock-list" component={StockList} />
                    </Switch>
                </LoggedInApp>
            </Switch>
        </Router>);

export default myRouter;

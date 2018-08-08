import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { IntlProvider, addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import 'intl';
import Layout from './layout';
import Navigator from './nav';

import zhDict from '../l18n/zh_CN';
import enDict from '../l18n/en_US';

addLocaleData([...en, ...zh]);

class App extends Component {
    static propTypes = {
        children: PropTypes.element,
    }

    static defaultProps = {
        children: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            langStore: [enDict, zhDict],
            langPrefix: ['en', 'zh'],
        };
    }

    componentDidMount() {}

    getLangIndex = () => {
        const { langPrefix } = this.state;
        const { language, userLanguage } = window.navigator;
        return _.indexOf(langPrefix, (language || userLanguage).substr(0, 2));
    }

    render() {
        const { langStore, langPrefix } = this.state;
        const slangIndex = this.getLangIndex() || 0;

        return (
            <IntlProvider locale={langPrefix[slangIndex]} messages={langStore[slangIndex]}>
                <Layout>
                    <Navigator />
                    <div className="content">
                        { this.props.children }
                    </div>
                </Layout>
            </IntlProvider>
        );
    }
}

module.exports = App;

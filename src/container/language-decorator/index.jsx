import React, { Component } from 'react';
import _ from 'lodash';

import { LocaleProvider } from 'antd';
import antCn from 'antd/lib/locale-provider/zh_CN';
import antEn from 'antd/lib/locale-provider/en_US';

import { IntlProvider, addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import 'intl';

import zhDict from '../../l18n/zh_CN';
import enDict from '../../l18n/en_US';

addLocaleData([...en, ...zh]);

/* eslint react/no-multi-comp: 0 */
const LanguageDecorator = WrappedComponent =>
    class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                langStore: [enDict, zhDict],
                langPrefix: ['en', 'zh'],
            };
        }

        getLangIndex = () => {
            const { langPrefix } = this.state;
            const { language, userLanguage } = window.navigator;
            return _.indexOf(langPrefix, (language || userLanguage).substr(0, 2));
        }

        render() {
            const { langStore, langPrefix } = this.state;
            const slangIndex = this.getLangIndex() || 1;

            return (
                <LocaleProvider locale={[antEn, antCn][slangIndex]}>
                    <IntlProvider locale={langPrefix[slangIndex]} messages={langStore[slangIndex]}>
                        <WrappedComponent {...this.props} />
                    </IntlProvider>
                </LocaleProvider>
            );
        }
    }

module.exports = LanguageDecorator;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import FadeTransitionView from '../component/fadeTransitionView';

import './index.scss';
import Logo from '../../asset/img/logo.png';

class Navigator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUrl: 1,
        };
    }

    render() {
        return (
            <FadeTransitionView>
                <header className="_nav">
                    <div className="_nav-logo">
                        <img src={Logo} alt={this.state.currentUrl} />
                    </div>
                    <div className="_nav-other">
            Other
                    </div>

                    <div className="_nav-content">
                        <ul className="_nav-menu clear-fix">
                            <li className="_nav-menu-item">
                                <span className="_nav-menu-title">
                                    <i className="icon iconfont icon-down" />
                  菜单一
                                </span>
                                <ul className="_nav-sub-menu">
                                    <li className="_nav-sub-menu-item">
                                        <Link to="/other">子菜单一</Link>
                                    </li>
                                    <li className="_nav-sub-menu-item">子菜单2</li>
                                    <li className="_nav-sub-menu-item">子菜单three</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </header>
            </FadeTransitionView>
        );
    }
}

export default Navigator;

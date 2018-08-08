import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* eslint no-unused-vars: 0 */
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './index.scss';

import * as computerAction from './home_action';

import Divider from '../component/divider';

const mapStateToProps = state => ({
    hardDisk: state.computer,
});

const mapPropsToAction = dispatch => ({
    computerAction: bindActionCreators(computerAction, dispatch),
});

@connect(mapStateToProps, mapPropsToAction)
class Computer extends Component {
    static propTypes = {
        hardDisk: PropTypes.shape({
            count: PropTypes.number,
            isRequesting: PropTypes.bool,
        }).isRequired,
        computerAction: PropTypes.shape({
            addNumber: PropTypes.func,
            subtractNumber: PropTypes.func,
            resetNumber: PropTypes.func,
            getPermissionFromServer: PropTypes.func,
        }).isRequired,
    }

    constructor(props) {
        super(props);
        /* eslint comma-dangle: 0 */
        this.state = {
            num: 0
        };
    }

    handleChange = (e) => {
        this.setState({
            num: e.target.value,
        });
    }

    handleAdd = () => {
        const { num } = this.state;
        if (!_.isNaN(Number(num))) {
            this.props.computerAction.addNumber(Number(num));
        }
    }

    handleSubtract = () => {
        const { num } = this.state;
        if (!_.isNaN(Number(num))) {
            this.props.computerAction.subtractNumber(Number(num));
        }
    }

    handleReset = () => {
        this.props.computerAction.resetNumber();
    }

    handleSyncAdd = () => {
        const { num } = this.state;
        if (!_.isNaN(Number(num))) {
            this.props.computerAction.getPermissionFromServer('add', Number(num));
        }
    }

    render() {
        return (
            <div className="home-page">
                <div className="container">
                    <h2 className="home-title">Hot module reload</h2>
                    <div className="home-block">
                        <input type="number" value={this.state.num} onChange={this.handleChange} />
                        <button onClick={this.handleAdd}>增加</button>
                        <button onClick={this.handleSubtract}>减少</button>
                        <button onClick={this.handleSyncAdd}>异步增加</button>
                        <button onClick={this.handleReset}>重置</button>
                        <br />
                        <br />
                        <pre>
                            {
                                this.props.hardDisk.isRequesting ?
                                    <p>i am calculating...</p>
                                    :
                                    `计算 结 果：${this.props.hardDisk.count}`
                            }
                        </pre>
                    </div>
                </div>
                <div className="container">
                    <VoidRender />
                </div>
            </div>
        );
    }
}

/* eslint react/no-multi-comp: 0 */
class VoidRender extends Component {
    constructor(props) {
        super(props);
        this.handleSome = this.handleSome.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    handleSome = () => {}

    render() {
        return (
            <Divider>
                <h3>五亿饭, 跪下skr...</h3>
            </Divider>
        );
    }
}


export default Computer;

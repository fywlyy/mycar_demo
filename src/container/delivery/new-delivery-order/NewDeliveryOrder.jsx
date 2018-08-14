/**
 * this is a demo page
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deliveryAction from './new-delivery-order-action';
import contentTitle from '../../component/content-title/ContentTitle';
import SearchForm from './components/SearchForm';
import './new-delivery-order.scss';

const mapStateToProps = state => ({
    newDeliveryOrder: state.newDeliveryOrder,
});
const mapPropsToAction = dispatch => ({
    deliveryAction: bindActionCreators(deliveryAction, dispatch),
});

@connect(mapStateToProps, mapPropsToAction)
export default class NewDeliveryOrder extends React.Component {
    static propTypes = {
        newDeliveryOrder: PropTypes.shape({
            index: PropTypes.number,
        }).isRequired,
        deliveryAction: PropTypes.shape({
            test: PropTypes.func,
            queryInitData: PropTypes.func,
        }).isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount() {
        this.props.deliveryAction.queryInitData();
    }
    handleAdd() {
        this.props.deliveryAction.test();
    }
    render() {
        const {
            newDeliveryOrder: {
                index,
            },
        } = this.props;
        const titleList = [
            {
                text: 'abcd',
            },
            {
                to: '/demo',
                text: 'demo',
            },
        ];
        return (
            <div className="new-delivery-order">
                {contentTitle(titleList)}
                <SearchForm handleSearch={() => {}} {...this.props.deliveryAction} />
                <button onClick={this.handleAdd}>add</button>
                hello world {index}
            </div>
        );
    }
}

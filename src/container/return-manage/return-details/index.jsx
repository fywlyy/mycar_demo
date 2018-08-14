/**
 * this is a returnDetails page
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as returnDetailsAction from './return-details-action';
import contentTitle from '../../component/content-title/ContentTitle';

import './return-details.scss';

const mapStateToProps = state => ({
    returnDetails: state.returnDetails,
});
const mapPropsToAction = dispatch => ({
    returnDetailsAction: bindActionCreators(returnDetailsAction, dispatch),
});

@connect(mapStateToProps, mapPropsToAction)
export default class returnDetails extends React.Component {
    static propTypes = {
        returnDetails: PropTypes.shape({
            index: PropTypes.number,
        }).isRequired,
        returnDetailsAction: PropTypes.shape({
            add: PropTypes.func,
            omsPager: PropTypes.func,
            saveOms: PropTypes.func,
        }).isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {};
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount() {
        this.props.returnDetailsAction.omsPager({ name: 'getName' });
        this.props.returnDetailsAction.saveOms({ name: 'postName' });
    }
    handleAdd() {
        this.props.returnDetailsAction.add();
    }
    render() {
        const {
            returnDetails: {
                index,
            },
        } = this.props;
        return (
            <div className="returnDetails">
                {contentTitle([{ to: '/new-delivery-order', text: 'return details' }])}
                <button onClick={this.handleAdd}>add</button>
                hello world{index}
            </div>
        );
    }
}

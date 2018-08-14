/**
 * this is a demo page
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as demoAction from './demo-action';
import contentTitle from '../component/content-title/ContentTitle';
import './demo.scss';

const mapStateToProps = state => ({
    demo: state.demo,
});
const mapPropsToAction = dispatch => ({
    demoAction: bindActionCreators(demoAction, dispatch),
});

@connect(mapStateToProps, mapPropsToAction)
export default class Demo extends React.Component {
  static propTypes = {
      demo: PropTypes.shape({
          index: PropTypes.number,
      }).isRequired,
      demoAction: PropTypes.shape({
          add: PropTypes.func,
          demoPager: PropTypes.func,
          demoSave: PropTypes.func,
      }).isRequired,
  }
  constructor(props) {
      super(props);
      this.state = {};
      this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
      this.props.demoAction.demoPager({ name: 'getName' });
      this.props.demoAction.demoSave({ name: 'postName' });
  }
  handleAdd() {
      this.props.demoAction.add();
  }
  render() {
      const {
          demo: {
              index,
          },
      } = this.props;
      return (
          <div className="demo">
              {contentTitle([{ to: '/new-delivery-order', text: 'NEW DELIVERY ORDER' }])}
              <button onClick={this.handleAdd}>add</button>
                hello world{index}
          </div>
      );
  }
}

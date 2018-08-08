/**
 * this is a demo page
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as demoAction from './demo-action';
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
      this.props.demoAction.omsPager({ name: 'getName' });
      this.props.demoAction.saveOms({ name: 'postName' });
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
              <button onClick={this.handleAdd}>add</button>
                hello world{index}
          </div>
      );
  }
}

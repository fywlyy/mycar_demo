import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class XX extends Component {
    static propTypes = {
        children: PropTypes.element,
    }

    static defaultProps = {
        children: null,
    }

    constructor(props) {
        super(props);

        this.state = { name: 'Chou' };
    }

    render() {
        return (
            <div className="demo-container">
                <h3 id="_react_d_c">
                    <em>__This is title</em>
                </h3>
                <div className="demo-container-in">
                    {`Hi, ${this.state.name} good good study, day day up`}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default XX;

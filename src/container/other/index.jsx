import React, { Component } from 'react';

export default class XX extends Component {
    constructor(props) {
        super(props);

        this.state = { custom: 1 };
    }

    render() {
        return (
            <div>
                good good study, day day up
                {this.state.custom}
                <p style={{ height: 100, background: 'pink' }}>
                    other page
                </p>
            </div>
        );
    }
}

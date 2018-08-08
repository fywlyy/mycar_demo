import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './index.scss';

const FadeInTransitionView = (props) => {
    const { children } = props;
    return (
        <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
        >
            {children}
        </ReactCSSTransitionGroup>
    );
};

FadeInTransitionView.propTypes = {
    children: PropTypes.element,
};

FadeInTransitionView.defaultProps = {
    children: null,
};

export default FadeInTransitionView;

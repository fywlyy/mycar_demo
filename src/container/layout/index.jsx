import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Layout = (props) => {
    const { children, prefixCls } = props;
    const layoutCls = classnames({
        _layout: true,
        [`${prefixCls}-layout`]: !!prefixCls,
    });

    return React.createElement('div', { className: layoutCls }, children);
};

Layout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    prefixCls: PropTypes.string,
};

Layout.defaultProps = {
    children: null,
    prefixCls: '',
};

export default Layout;

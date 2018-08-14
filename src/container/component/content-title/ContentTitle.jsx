import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './content-title.scss';

export default function contentTitle(list) {
    return (
        <div className="content-title">
            {
                list.map((item) => {
                    if (item.to) {
                        return (
                            <span
                                key={_.uniqueId()}
                            >
                                <Link to={item.to}>{item.text}</Link>
                            </span>
                        );
                    }
                    return <span key={_.uniqueId()}>{item.text}</span>;
                })
            }
        </div>
    );
}

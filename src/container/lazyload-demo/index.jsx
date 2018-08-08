/**
 * lazy load demo
 * */

import React from 'react';
import { Link } from 'react-router-dom';
import './lazyload.scss';

export default class Demo extends React.Component {
	render() {
		return (
			<ul className="nav">
				<li><Link to="/normal-lazy">normal</Link></li>
				<li><Link to="/image-lazy">using with <code>&lt;img&gt;</code></Link></li>
				<li><Link to="/decorator-lazy">using with <code>decorator</code></Link></li>
				<li><Link to="/scroll-lazy">using with <code>scrollTo</code></Link></li>
				<li><Link to="/overflow-lazy">using inside overflow container</Link></li>
				<li><Link to="/debounce-lazy">using <code>debounce</code></Link></li>
				<li><Link to="/placeholder-lazy">custom placeholder</Link></li>
				<li><Link to="/fadein-lazy">cool <code>fadeIn</code> effect</Link></li>
			</ul>
		);
	}
}

import React, { Component } from 'react';
import Loader from './loader.jsx';

class myImg extends Component {
    constructor(props) {
        super(props);
        const { thumbnail } = this.props;
        this.finishLoad = this.finishLoad.bind(this);
        this.state = {
            showThumb: true,
            thumbnail,
        };
    }

    finishLoad() {
        this.setState({
            thumbnail: this.props.imgSrc,
            showThumb: false,
        });
    }

    render() {
        const { imgSrc } = this.props;
        const { thumbnail, showThumb } = this.state;
        return (<div>
            <img style={{ display: 'none' }} src={imgSrc} onLoad={this.finishLoad} />
            {/*			<div className="my-img-layer">
			 <div className="outer"></div>
			 <div className="pie"></div>
			 </div> */}
            <div className="my-img-layer" style={{ display: `${showThumb ? 'block' : 'none'}` }}>
                <Loader end={!showThumb} />
            </div>
            <img src={thumbnail} className="display-img" />
                </div>);
    }
}
export default myImg;

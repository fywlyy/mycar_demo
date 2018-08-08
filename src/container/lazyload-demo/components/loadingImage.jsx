import React, {Component} from 'react';
import MyImg from './myImg.jsx';

class LoadingImage extends Component {
	constructor(props) {
		super(props);
		this.hideImage = this.hideImage.bind(this);
		this.state = {
			showImg: false,
		};
	}

	hideImage(showImg) {
		this.setState({
			showImg
		});
	}

	render() {
		const { showImg } = this.state;
		return (<div>
			{showImg  && <div className="show-image-ctt" onClick={() => {this.hideImage(false)}}>
				<MyImg
					thumbnail="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1601145303,3439020185&fm=27&gp=0.jpg"
					imgSrc="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533120096435&di=0ed987ba7245e2b6f3a061580c4a32b7&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F5824427b6bd48.jpg"
				/>
			</div>}
			<div className="imgs-ctt">
				<ul className="img-list">
					<li className="img-item" onClick={() => {this.hideImage(true)}}>
						<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1601145303,3439020185&fm=27&gp=0.jpg" />
					</li>
				</ul>
			</div>
		</div>);
	}
}

export default LoadingImage;

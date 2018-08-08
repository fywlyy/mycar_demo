import React, {Component} from 'react';

class Loader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer1: 180,
			timer2: 180,
		};
		this.countPie = 0
		this.pieT1 = 0
		this.pieT2 = 0
	}
	componentDidMount() {
		const _this = this;
		this.pieT1 = window.setInterval(() => {
			_this.setState({
				timer2: _this.state.timer2 + .6
			});
			_this.start1();
		}, 100);
	}
	componentWillUnmount() {
		window.clearInterval(this.pieT1);
		window.clearInterval(this.pieT2);
	}
	start1() {
		const _this = this;
		this.countPie += 1;
		if(this.countPie >= 300) {
			this.countPie = 0;
			window.clearInterval(this.pieT1);
			this.pieT2 = window.setInterval(() => {
				if(_this.props.end){
					window.clearInterval(_this.pieT1);
					window.clearInterval(_this.pieT2);
					_this.setState({timer2: 0,timer1: 0});
					return false;
				}
				_this.setState({
					timer1: _this.state.timer1 + .6
				});
				_this.start2();
			}, 100);
		}
	}
	start2() {
		const _this = this;
		this.countPie += 1;
		if(this.countPie >= 300) {
			this.countPie = 0;
			window.clearInterval(this.pieT2);
			this.pieT1 = window.setInterval(() => {
				if(_this.props.end){
					window.clearInterval(_this.pieT1);
					window.clearInterval(_this.pieT2);
					_this.setState({timer2: 0,timer1: 0});
					return false;

				}
				_this.setState({
					timer2: _this.state.timer2 + .6
				});
				_this.start1();
			}, 100);
		}
	}
	render() {
		const {timer1, timer2} = this.state;
		return (<div className="loader-pic-ctt"><div className="hold hold1">
			<div className="pie pie1" style={{transform: `rotate(${timer1}deg)`}}></div>
		</div>
			<div className="hold hold2">
				<div className="pie pie2" style={{transform: `rotate(${timer2}deg)`}}></div>
			</div></div>);
	}
}
export default Loader;

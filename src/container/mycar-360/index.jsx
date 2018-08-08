import React from 'react';
import '../../asset/plugins/3deye';

import './index.scss';

class MyCarShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        $('#myCar').vc3dEye({
            imagePath: '/src/asset/img/mycar_img/',
            totalImages: 51,
            imageExtension: 'png',
        });
    }

    render() {
        return (
            <div className="my-car" id="myCar" />
        );
    }
}

export default MyCarShow;

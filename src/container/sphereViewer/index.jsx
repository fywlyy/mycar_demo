import React from 'react';
import PhotoSphereViewer from '../../asset/plugins/photo-sphere-viewer';

import './index.scss';

class SphereViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            mycarArr: [{
                index: 0,
                colorName: '灰色',
                imgUrl: '/src/asset/img/mycar_gray.jpg',
            }, {
                index: 1,
                colorName: '黑色',
                imgUrl: '/src/asset/img/mycar_black.jpg',
            }, {
                index: 2,
                colorName: '棕色',
                imgUrl: '/src/asset/img/mycar_brown.jpg',
            }],
        };

        this.colorIndex = 0;
    }

    componentDidMount() {
        this.renderViewer(0, -Math.PI / 10, -Math.PI / 2);
    }

    initPhotoSphereViewer(options, rotateCb) {
        return new PhotoSphereViewer({
            autoload: false,
            // Path to the panorama
            panorama: options.imgUrl,

            // Container
            container: options.containerEl,

            default_position: {
                long: options.long,
                lat: options.lat,
            },

            // Deactivate the animation
            time_anim: 3000,

            anim_speed: '1rpm',

            // Display the navigation bar
            navbar: false,

            // Resize the panorama
            size: {
                width: '100%',
                height: '500px',
            },

            min_fov: 80,

            max_fov: 80,

            // HTML loader
            loading_msg: '',

            onready: () => {
                this.setState({
                    isLoading: false,
                });
            },

            onrotate: rotateCb || function a() {},

        });
    }

    handleFullscreen() {
        this.PSV.toggleFullscreen();
    }

    handleSwitch(index) {
        const $canvasBox = $('#canvas-box');

        if (this.colorIndex === index) {
            return;
        }

        this.PSV = null;
        this.setState({
            isLoading: true,
        });
        $canvasBox.html('');
        this.colorIndex = index;

        this.renderViewer(index, this.lat, this.long);
    }

    renderViewer(index, initLat, initLong) {
        const that = this;
        const { mycarArr } = this.state;
        const $canvasBox = $('#canvas-box');

        this.PSV = this.initPhotoSphereViewer({
            containerEl: $canvasBox[0],
            imgUrl: mycarArr[index].imgUrl,
            lat: initLat,
            long: initLong,
        }, (lt, lg) => {
            that.lat = lt;
            that.long = lg;
        });

        this.PSV.load();
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div className="sphere-viewer-module">
                <div id="viewer">
                    <div id="canvas-box" />
                </div>
                <div className="fullscreen" aria-hidden onClick={() => this.handleFullscreen()} />
                <div className="options-module">
                    <span className="color-btn" aria-hidden onClick={() => this.handleSwitch(0)}>灰色</span>
                    <span className="color-btn" aria-hidden onClick={() => this.handleSwitch(1)}>黑色</span>
                    <span className="color-btn" aria-hidden onClick={() => this.handleSwitch(2)}>棕色</span>
                </div>
                {
                    isLoading ?
                        <div className="loading-icon" /> : null
                }
            </div>
        );
    }
}

export default SphereViewer;

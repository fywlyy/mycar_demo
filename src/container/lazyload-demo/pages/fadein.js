import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Lazyload from 'react-lazyload';
import Operation from '../components/Operation';

export default class FadeIn extends Component {
  render() {
    return (
        <div className="wrapper" style={{marginTop: '100px'}}>
        <div className="widget-list image-container">
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww3.sinaimg.cn/mw690/62aad664jw1f2nxvya0u2j20u01hc16p.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxvz2cj6j20u01hck1o.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvzfjv6j20u01hc496.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww4.sinaimg.cn/mw690/62aad664jw1f2nxw0p95dj20u01hc7d8.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww2.sinaimg.cn/mw690/62aad664jw1f2nxw134xqj20u01hcqjg.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
          <Lazyload throttle={200} height={300}>
            <CSSTransitionGroup key="1"
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}>
              <img src="http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw1kcykj20u01hcn9p.jpg" />
            </CSSTransitionGroup>
          </Lazyload>
        </div>
      </div>
    );
  }
}


import React, { Component } from 'react';
import { shallow } from 'enzyme';

import Container from '../../src/container/component/divider';

describe('Test Container', () => {
  const container = shallow(<Container />);

  it('test container render', () => {
    expect(container.find('#_react_d_c').exists())
  })
});

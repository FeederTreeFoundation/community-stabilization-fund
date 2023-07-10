import React from 'react';
import MockDate from 'mockdate';
import { render } from '@testing-library/react';

import Home from '../pages/index';

describe('Home', () => {
  beforeAll(() => {
    MockDate.set('2001-03-21')
  });

  afterAll(() => {
    MockDate.reset()
  });

  it('renders homepage unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})

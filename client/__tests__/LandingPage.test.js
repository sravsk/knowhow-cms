import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../src/components/LandingPage.jsx';

describe('<LandingPage/>', () => {
  const mockFn = jest.fn();
  it('should be defined', () => {
    expect(LandingPage).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <LandingPage />
    );
    expect(tree).toMatchSnapshot();
  });
});


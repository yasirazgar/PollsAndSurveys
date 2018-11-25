import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from 'packs/Home';

describe("Home", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Home />);

    expect(wrapper).toMatchSnapshot();
  });

  it("sets state sideDrawerOpen to true on clicking sideDrawer toggle-button", () => {
    const wrapper = mount(<Home />);

    wrapper.find('.toggle-button').first().simulate('click');

    expect(wrapper.state('sideDrawerOpen')).toEqual(true);
  });
});

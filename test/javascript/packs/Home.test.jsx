import React from 'react';
import { shallow, mount } from 'enzyme';
import App from 'packs/App';

describe("App", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });

  it("sets state sideDrawerOpen to true on clicking sideDrawer toggle-button", () => {
    const wrapper = mount(<App />);

    wrapper.find('.toggle-button').first().simulate('click');

    expect(wrapper.state('sideDrawerOpen')).toEqual(true);
  });
});

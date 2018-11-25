import React from 'react'
import { shallow, mount } from 'enzyme'
import DrawerToggleButton from 'packs/SideDrawer/DrawerToggleButton'

describe("DrawerToggleButton", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<DrawerToggleButton />);

    expect(wrapper).toMatchSnapshot();
  });

  it("drawerToggleClickHandler gets called on clicking ToggleButton", () => {
    const clickHandler = jest.fn();
    const wrapper = mount(<DrawerToggleButton drawerToggleClickHandler={clickHandler} />)

    wrapper.find('.toggle-button').first().simulate('click');

    expect(clickHandler).toHaveBeenCalledTimes(1)
  });
});

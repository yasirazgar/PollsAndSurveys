import React from 'react'
import { shallow, mount } from 'enzyme'
import ToggleButton from 'packs/SideDrawer/ToggleButton'

describe("ToggleButton", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ToggleButton />);

    expect(wrapper).toMatchSnapshot();
  });

  it("clickHandler gets called on clicking ToggleButton", () => {
    const clickHandler = jest.fn();
    const wrapper = mount(<ToggleButton clickHandler={clickHandler} />)

    wrapper.find('.toggle-button').first().simulate('click');

    expect(clickHandler).toHaveBeenCalledTimes(1)
  });
});

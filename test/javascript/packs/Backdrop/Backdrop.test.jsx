import React from 'react'
import { shallow, mount } from 'enzyme'
import Backdrop from 'packs/Backdrop/Backdrop'

describe("Backdrop", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Backdrop />);

    expect(wrapper).toMatchSnapshot();
  });

  it("sets state sideDrawerOpen to true on clicking sideDrawer toggle-button", () => {
    const clickHandler = jest.fn();
    const wrapper = mount(<Backdrop backdropClickHandler={clickHandler} />)

    wrapper.find('.backdrop').first().simulate('click');

    expect(clickHandler).toHaveBeenCalledTimes(1)
  });
});

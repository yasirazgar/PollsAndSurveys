import React from 'react'
import { shallow } from 'enzyme'
import SideDrawer from 'packs/SideDrawer/SideDrawer'

describe("SideDrawer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SideDrawer />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with props, open: true", () => {
    const wrapper = shallow(<SideDrawer open={true} />)

    expect(wrapper).toMatchSnapshot();
  });
})

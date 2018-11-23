import React from 'react'
import { shallow, render, mount } from 'enzyme'
import Home from 'packs/Home'

it("renders correctly", () => {
  const wrapper = shallow(<Home />)

  expect(wrapper).toMatchSnapshot();
});

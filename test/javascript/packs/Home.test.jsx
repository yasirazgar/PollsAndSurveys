import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import Home from 'packs/Home';

const mockStore = configureMockStore();

describe("Home", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Home />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });

  // it("sets state sideDrawerOpen to true on clicking sideDrawer toggle-button", () => {
  //   const wrapper = shallow(
  //     <Provider store={mockStore({})}>
  //       <Home />
  //     </Provider>
  //   )

  //   wrapper.find('.toggle-button').first().simulate('click');

  //   expect(wrapper.state('sideDrawerOpen')).toEqual(true);
  // });
});

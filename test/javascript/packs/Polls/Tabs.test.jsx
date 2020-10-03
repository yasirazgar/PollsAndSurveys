import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import Tabs from 'packs/Polls/Tabs'

const mockStore = configureMockStore();

describe("Tabs", () => {
  it("renders correctly when logged out", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})} >
        <Tabs />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when logged in", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Tabs user={{name: 'user'}}/>
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });
})

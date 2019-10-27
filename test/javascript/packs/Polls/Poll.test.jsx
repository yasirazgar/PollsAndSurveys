import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import Poll from 'packs/Polls/Poll'

const mockStore = configureMockStore();

describe("Poll", () => {
  const poll = {
    poll_id: 1,
    question: 'Fav snake',
    categories: [[3, 'Animals']],
    options: {
      Python: {option_id: 1, percentage: 50.0, selected: true},
      Cobra: {option_id: 2, percentage: 25.0, selected: false},
      Viper: {option_id: 3, percentage: 25.0, selected: false},
      Mamba: {option_id: 4, percentage: 0.0,  selected: false}
    }
  }

  it("renders correctly with poll", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Poll poll={poll} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with currentPoll", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Poll currentPoll={poll} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });
})

import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import UserPoll from 'packs/Polls/UserPoll'

const mockStore = configureMockStore();

describe("UserPoll", () => {
  it("renders correctly with poll", () => {
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

    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <UserPoll poll={poll}/>
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });
})

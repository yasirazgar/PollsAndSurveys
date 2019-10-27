import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import Polls from 'packs/Polls/Polls'

const mockStore = configureMockStore();

describe("Polls", () => {
  const polls = [
    {
      poll_id: 1,
      question: 'Fav snake',
      categories: [[3, 'Animals']],
      options: {
        Python: {option_id: 1, percentage: 50.0, selected: true},
        Cobra: {option_id: 2, percentage: 25.0, selected: false},
        Viper: {option_id: 3, percentage: 25.0, selected: false},
        Mamba: {option_id: 4, percentage: 0.0,  selected: false}
      }
    },
    {
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
  ]

  it("renders correctly with search poll", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Polls searchPoll={polls} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with polls", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Polls polls={polls} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with polls", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Polls userPolls={polls} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with respondedPolls", () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <Polls respondedPolls={polls} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot();
  });
})

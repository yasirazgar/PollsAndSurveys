import React from 'react';
import { shallow, mount } from 'enzyme';
import App from 'packs/App';

describe("App", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});

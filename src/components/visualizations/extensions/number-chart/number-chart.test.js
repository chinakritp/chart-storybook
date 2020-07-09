import React from 'react'
import { mount } from 'enzyme'

import NumberChart from './number-chart'

const defaultProps = {
  compare: false,
  customs: {
    metricLabel: true,
    flipable: true,
    subNumeric: [
      { label: 'Number of houses', numeric_option: 'absolute' },
      { label: 'Rate', numeric_option: 'percentage' },
    ],
  },
  data: [
    { name: 'Number of houses', main: { value: 4000 } },
    { name: 'Rate', main: { value: 22.5 } },
  ],
  id: 'TM002',
  numeric: 'absolute',
  totalRecord: { main: 4324 },
}

const wrapper = mount(<NumberChart {...defaultProps} />)

// Test suites
describe('<Number chart />', () => {
  it('should render without crashing', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render 2 column and its context', () => {
    expect(wrapper.find('.column').length).toBe(2)
    expect(wrapper.find('.text-label').at(1)).toHaveText('Rate')
  })

  it('should render 1 column and its context', () => {
    const props = {
      data: [{ name: 'Number of houses', main: { value: 4000 } }],
    }

    wrapper.setProps(props)

    expect(wrapper.find('.column').length).toBe(1)
  })
})

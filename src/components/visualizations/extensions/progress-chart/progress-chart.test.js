import React from 'react'
import { mount } from 'enzyme'

import ProgressChart from './progress-chart'

const defaultProps = {
  compare: false,
  customs: {
    unit: true,
    reversedBar: true,
    footer: true,
    mainField: 'Used',
    additionals: {
      totalCapacity: 'Capacity',
      customTooltipLabel: 'Used',
    },
  },
  data: [
    { name: 'Used', main: { value: 5000 } },
    { name: 'Capacity', main: { value: 1000 } },
  ],
  id: 'TM002',
  numeric: 'absolute',
  unit: 'unit',
  totalRecord: { main: 4324 },
}

const wrapper = mount(<ProgressChart {...defaultProps} />)

// Test suites
describe('<Progress chart />', () => {
  it('should render without crashing', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render without reversedBar', () => {
    const props = {
      customs: {
        ...defaultProps.customs,
        reversedBar: false,
      },
    }

    wrapper.setProps(props)

    expect(wrapper.find('.tooltip-label')).toHaveText('Used')
  })
})

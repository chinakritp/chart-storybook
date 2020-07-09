import React from 'react'
import { shallow } from 'enzyme'

import Chart from './chart'

jest.mock('c3', () => ({
  c3: jest.fn(),
}))

const defaultProps = {
  customs: {
    additionals: {
      donut_title_unit: 'total ports',
      donut_title_compute: 'sum',
    },
    displayNoProperty: true,
    sortByValues: true,
    subtitle: true,
  },
  compare: true,
  data: [
    { name: 'Apple', main: { value: 50 }, compare: { value: 30 } },
    { name: 'Samsung', main: { value: 25 }, compare: { value: 30 } },
  ],
  id: 'CM007',
  numeric: 'percentage',
  totalRecord: { main: 11529 },
  disableGridLines: true,
  axisRotate: false,
  axisType: 'category',
  axisYVisible: false,
  padding: {},
  size: {},
  subtitle: true,
}

const wrapper = shallow(<Chart {...defaultProps} />)

describe('<Chart />', () => {
  it('should render chart without crashing', () => {
    expect(wrapper).toBeDefined()
  })
})

import React from 'react'
import { mount } from 'enzyme'

import Heatmap from './heatmap-chart'

const defaultProps = {
  compare: false,
  customs: {
    flipable: true,
    groups: ['2:00AM - 4:59AM', '5:00AM - 7:59AM'],
    groupLabel: ['Mon', 'Tue', 'Wed'],
    stack: true,
    subtitle: true,
    virtualGroup: [{ '2:00AM - 4:59AM': '2AM' }, { '5:00AM - 7:59AM': '5AM' }],
  },
  data: [
    { name: 'Mon', main: { '2:00AM - 4:59AM': 50, '5:00AM - 7:59AM': 10 } },
    { name: 'Tue', main: { '2:00AM - 4:59AM': 10, '5:00AM - 7:59AM': 55 } },
    { name: 'Wed', main: { '2:00AM - 4:59AM': 24, '5:00AM - 7:59AM': 24 } },
  ],
  id: 'TM009',
  numeric: 'absolute',
  totalRecord: { main: 852087 },
}

const wrapper = mount(<Heatmap {...defaultProps} />)

// Test suites
describe('<Heatmap />', () => {
  it('should render without crashing', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render subtitle with highest value', () => {
    const expected = { title: 'Tue 5:00AM - 7:59AM55' }

    expect(wrapper.find('.subtitle')).toHaveText(expected.title)
  })

  it('should not render subtitle', () => {
    const props = {
      customs: {
        ...defaultProps.customs,
        subtitle: false,
      },
    }

    wrapper.setProps(props)

    expect(wrapper.find('.subtitle')).not.toExist()
  })

  it('should render hint', () => {
    const props = {
      color: 3221198,
      label: '2:00PM - 4:59PM',
      style: { stroke: 'white', strokeWidth: '2px' },
      x: 1,
      y: 0,
    }

    wrapper.setState({ value: props })

    expect(wrapper.find('.rv-hint')).toExist()
  })

  it('should render tooltip value', () => {
    wrapper.find('.rv-voronoi__cell').simulate('mouseover')

    expect(wrapper.find('.rv-hint')).toHaveText('2:00AM - 4:59AM50')
  })
})

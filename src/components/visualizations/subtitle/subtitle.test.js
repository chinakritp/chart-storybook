import React from 'react'
import { mount } from 'enzyme'

import Subtitle from './subtitle'

const defaultProps = {
  compare: false,
  customIcons: null,
  highestValue: { main: { name: '< 30', value: 37.2 } },
  inputKeys: ['main'],
  isStack: false,
  numeric: 'percentage',
  possibleValues: ['value'],
  stackSubtitleValue: false,
  subtitleField: null,
  subtitleMainRef: null,
  subtitleTotal: null,
  subtitleType: '',
  subtitleUnit: false,
  unit: 'Points',
}

const wrapper = mount(<Subtitle {...defaultProps} />)

// Test suites
describe('<Subtitle />', () => {
  it('should render default subtitle without crashing', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render default subtitle with unit', () => {
    const props = {
      stackSubtitleValue: true,
      subtitleUnit: true,
      unit: 'Months',
    }

    wrapper.setProps(props)

    expect(wrapper).toHaveText('< 30 Months37%')
  })

  it('should render subtitle ref_and_highest type', () => {
    const props = {
      subtitleMainRef: {
        name: 'True',
        main: { value: 30 },
      },
      subtitleTotal: 100,
      subtitleType: 'ref_and_highest',
    }

    wrapper.setProps(props)

    expect(wrapper).toHaveText('True30%|< 3037%')
  })

  it('should render subtitle available_and_capacity type', () => {
    const props = {
      subtitleField: {
        field_name: 'tol_avail',
        label: 'Available',
        value: 335580,
      },
      subtitleTotal: 937276,
      subtitleType: 'available_and_capacity',
    }

    wrapper.setProps(props)

    expect(wrapper).toHaveText('Available335.6k of 937.3k')
  })

  it('should render subtitle metric_value type', () => {
    const props = {
      subtitleField: {
        field_name: 'network_avg_score',
        label: 'Average Score',
        value: 3.769,
      },
      subtitleType: 'metric_value',
    }

    wrapper.setProps(props)

    expect(wrapper).toHaveText('Average Score3.77%')
  })

  it('should render subtitle icon type', () => {
    const props = {
      customColors: [
        { label: 'Household', color_code: '#425ede' },
        { label: 'Condo', color_code: '#425ede' },
      ],
      customIcons: [
        { label: 'Household', icon_code: 'home', hex_code: '\ue88a' },
        { label: 'Condo', icon_code: 'condo', hex_code: '\ue88a' },
      ],
      data: [
        { name: 'Household', main: { value: 3134 } },
        { name: 'Condo', main: { value: 5000 } },
      ],
      subtitleType: 'icon',
      unit: 'People',
    }

    wrapper.setProps(props)

    expect(wrapper.find('.wrapper').at(0)).toHaveText('home3134People')
  })

  it('should render compare subtitle', () => {
    const props = {
      compare: true,
      inputKeys: ['main', 'compare'],
    }

    wrapper.setProps(props)

    expect(wrapper.find('.compareSubtitle')).toExist()
  })

  it('should render subtitle without value because of stack', () => {
    const props = {
      highestValue: { main: { name: '< 30', value: 37 } },
      isStack: true,
      numeric: 'absolute',
    }

    wrapper.setProps(props)

    expect(wrapper.find('.compareSubtitle')).not.toHaveText('37')
  })

  it('should render subtitle with total subtitle being denominator', () => {
    const props = {
      compare: false,
      isStack: false,
      subtitleTotal: 50,
      subtitleType: '',
    }

    wrapper.setProps(props)

    expect(wrapper).toHaveText('< 30 People74%')
  })
})

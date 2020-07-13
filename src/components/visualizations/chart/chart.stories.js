import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import mdx from './chart.mdx'

import Chart from './chart'

export default {
  title: 'Chart/Line',
  parameters: {
    component: Chart,
    componentSubtitle: 'Subtitle',
    docs: {
      page: mdx,
    },
  },
}

export const Basic = () => (
  <Chart
    id="line"
    subtitle={boolean('Subtitle', true, 'General option')}
    customs={{ sortByValues: boolean('Sort by value', false, 'General option') }}
    size={{ height: 200 }}
    data={[
      {
        name: 'Column1',
        main: { value: number('Column1', 6406, {}, 'Value') },
      },
      {
        name: 'Column2',
        main: { value: number('Column2', 3999, {}, 'Value') },
      },
      {
        name: 'Column3',
        main: { value: number('Column3', 6155, {}, 'Value') },
      },
      {
        name: 'Column4',
        main: { value: number('Column4', 862, {}, 'Value') },
      },
      {
        name: 'Column5',
        main: { value: number('Column5', 3866, {}, 'Value') },
      },
    ]}
  />
)

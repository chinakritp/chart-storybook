import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'

import DonutChart from './donut-chart'

export default {
  title: 'Chart/DonutChart',
  parameters: {
    component: DonutChart,
  },
}

export const Absolute = () => (
  <DonutChart
    subtitle={boolean('Subtitle', true, 'General option')}
    customs={{
      additionals: {
        donut_title_unit: 'counts',
        donut_title_compute: 'sum',
      },
    }}
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

export const PercentageWithAbsolute = () => (
  <DonutChart
    subtitle={boolean('Subtitle', true, 'General option')}
    customs={{
      additionals: {
        donut_title_unit: 'counts',
        donut_title_compute: 'sum',
      },
      percentWithAbsolute: true,
    }}
    numeric="absolute"
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

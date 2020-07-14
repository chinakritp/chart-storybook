import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'

import PieChart from './pie-chart'

export default {
  title: 'Chart/PieChart',
  parameters: {
    component: PieChart,
  },
}

export const Absolute = () => (
  <PieChart
    id="pie"
    subtitle={boolean('Subtitle', true, 'General option')}
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

export const Percentage = () => (
  <PieChart
    id="pie"
    subtitle={boolean('Subtitle', true, 'General option')}
    numeric="percentage"
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

export const Percentile = () => (
  <PieChart
    id="pie"
    subtitle={boolean('Subtitle', true, 'General option')}
    numeric="percentile"
    totalRecord={{ main: number('Total Record', 30000, {}, 'Value') }}
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
  <PieChart
    id="pie"
    subtitle={boolean('Subtitle', true, 'General option')}
    customs={{ percentWithAbsolute: true }}
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

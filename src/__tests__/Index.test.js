import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import 'jest-styled-components'
import ReactAvatarFirebase from '../index'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})
describe('App', () => {
  test('renders with default props', () => {
    act(() => {
      render(<ReactAvatarFirebase />, container)
    })

    const component = container.getElementsByTagName('div')[0]

    expect(component).toMatchSnapshot()
    expect(component).toHaveStyleRule('width', '128px')
    expect(component).toHaveStyleRule('height', '128px')
    expect(component).toHaveStyleRule(
      'border',
      expect.stringContaining('rgba(226,226,226,1)')
    )
    expect(component).toHaveStyleRule(
      'border',
      expect.stringContaining('rgba(226,226,226,0.4)'),
      {
        modifier: ':hover'
      }
    )
    expect(component).toHaveStyleRule(
      'transition',
      expect.stringContaining('0.3s')
    )
  })
  test('renders with passed props', () => {
    act(() => {
      render(
        <ReactAvatarFirebase
          borderColor='#c01247'
          size='256px'
          animationTime='0.1s'
          readOnly
        />,
        container
      )
    })

    const component = container.getElementsByTagName('div')[0]

    expect(component).toMatchSnapshot()
    expect(component).toHaveStyleRule('width', '256px')
    expect(component).toHaveStyleRule('height', '256px')
    expect(component).toHaveStyleRule(
      'border',
      expect.stringContaining('rgba(192,18,71,1)')
    )
    expect(component).not.toHaveStyleRule('border', {
      modifier: ':hover'
    })
    expect(component).toHaveStyleRule(
      'transition',
      expect.stringContaining('0.1s')
    )
  })
})

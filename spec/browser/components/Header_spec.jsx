import React from 'react'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils'

import expect, { spyOn } from 'expect'
import Header from 'app/components/Header'

describe('Header', () => {
  let headerProps = {
    enableBack: () => true,
    enableForward: () => true
  }

  const renderHeader = () => {
    return renderIntoDocument(
      <Header {...headerProps} />
    )
  }

  describe('url', () => {
    it('displays the url from props', () => {
      const url = 'http://www.github.com'
      headerProps.url = url
      const header = renderHeader()

      // div is the third one
      const titleBar = scryRenderedDOMComponentsWithTag(header, 'div')[2]
      expect(titleBar.textContent).toEqual(url)
    })
  })

  describe('buttons', () => {
    const renderButtons = () => {
      const component = renderHeader()
      return scryRenderedDOMComponentsWithTag(component, 'button')
    }

    it('has three buttons', () => {
      const buttons = renderButtons()
      expect(buttons.length).toEqual(3)
    })

    describe('back', () => {
      it('is not disabled if enableBack returns true', () => {
        headerProps.enableBack = () => true
        const backButton = renderButtons()[0]
        expect(backButton.disabled).toBe(false)
      })

      it('is disabled if enableBack returns false', () => {
        headerProps.enableBack = () => false
        const backButton = renderButtons()[0]

        expect(backButton.disabled).toBe(true)
      })

      it('triggers the onBack function if the button is clicked', () => {
        headerProps.enableBack = () => true
        headerProps.onBack = () => 'yo'
        const spy = spyOn(headerProps, 'onBack')

        const backButton = renderButtons()[0]
        Simulate.click(backButton)
        expect(spy).toHaveBeenCalled()
      })
    })

    describe('forward', () => {
      it('is not disabled if enableForward returns true', () => {
        headerProps.enableForward = () => true

        const forwardButton = renderButtons()[1]
        expect(forwardButton.disabled).toBe(false)
      })

      it('is disabled if enableForward returns false', () => {
        headerProps.enableForward = () => false

        const forwardButton = renderButtons()[1]
        expect(forwardButton.disabled).toBe(true)
      })

      it('triggers the onForward function if the button is clicked', () => {
        headerProps.enableForward = () => true
        headerProps.onForward = () => 'yo'
        const spy = spyOn(headerProps, 'onForward')

        const forwardButton = renderButtons()[1]
        Simulate.click(forwardButton)
        expect(spy).toHaveBeenCalled()
      })
    })
  })
})

import React from 'react'

import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils'

import expect, { spyOn } from 'expect'
import Tab from 'app/components/tabs/Tab'

describe('Tab', () => {
  const tabProps = {
    onChangeTab: () => true,
    onCloseTab: () => true
  }

  const renderTab = (props) => {
    return renderIntoDocument(
      <Tab {...props} />
    )
  }

  describe('title', () => {
    it('displays the title from props', () => {
      const title = 'Test Title'
      const props = {
        ...tabProps,
        title
      }

      const tab = renderTab(props)
      const tabTitle = scryRenderedDOMComponentsWithTag(tab, 'span')[0]
      expect(tabTitle.textContent).toEqual(title)
    })
  })

  describe('change tab', () => {
    const props = {
      ...tabProps,
      onChangeTab: () => true
    }

    it('calls change tab when tapped', () => {
      const spy = spyOn(props, 'onChangeTab')

      const tab = scryRenderedDOMComponentsWithTag(renderTab(props), 'div')[0]
      Simulate.click(tab)

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('onCloseTab', () => {
    const props = {
      ...tabProps,
      onCloseTab: () => true
    }

    it('closes the tab when tapped', () => {
      const spy = spyOn(props, 'onCloseTab')

      const button = scryRenderedDOMComponentsWithTag(renderTab(props), 'button')[0]
      Simulate.click(button)

      expect(spy).toHaveBeenCalled()
    })
  })
})

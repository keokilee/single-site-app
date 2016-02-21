import expect from 'expect'

import { tabs } from 'browser/reducers/tabs'
import {
  addTab,
  changeTab,
  removeTab,
  setTitle,
  setUrl,
  setLoading,
  setFavicon
} from 'browser/actions'

describe('reducers/tabs', () => {
  const initialState = tabs(undefined, {})

  describe('initial', () => {
    it('has an index of 0 to start', () => {
      expect(initialState.tabIndex).toEqual(0)
    })

    it('has an initial tab', () => {
      expect(initialState.tabs.length).toEqual(1)
    })
  })

  describe('navigation', () => {
    describe('set url', () => {
      const url = 'http://www.google.com'
      const nextState = tabs(initialState, setUrl(url, 0))

      it('sets the url for the specified tab', () => {
        expect(nextState.tabs[0].url).toEqual(url)
      })
    })

    describe('set loading', () => {
      it('sets loading for the specified tab', () => {
        const nextState = tabs(initialState, setLoading(true, 0))
        expect(nextState.tabs[0].loading).toEqual(true)
      })
    })

    describe('set favicon', () => {
      const favicon = 'http://www.google.com/favicon.ico'
      const nextState = tabs(initialState, setFavicon(favicon, 0))

      it('sets the favicon for the specified tab', () => {
        expect(nextState.tabs[0].favicon).toEqual(favicon)
      })
    })

    describe('set title', () => {
      const title = 'foobar'
      const nextState = tabs(initialState, setTitle(title, 0))

      it('sets the title for the specified tab', () => {
        expect(nextState.tabs[0].title).toEqual(title)
      })
    })
  })

  describe('add/change/remove', () => {
    describe('add tab', () => {
      const nextState = tabs(initialState, addTab({}))

      it('adds a tab to the list of tabs', () => {
        expect(nextState.tabs.length).toEqual(initialState.tabs.length + 1)
      })

      it('assigns an id to the tab', () => {
        const tab = nextState.tabs[1]
        expect(tab.id).toExist()
      })

      it('sets the tab index to the new tab', () => {
        expect(nextState.tabIndex).toEqual(nextState.tabs.length - 1)
      })
    })

    describe('changeTab', () => {
      const state = tabs(initialState, addTab())

      it('changes the tab to the given index in bounds', () => {
        const nextState = tabs(state, changeTab(1))
        expect(nextState.tabIndex).toEqual(1)
      })

      it('does not change the tab if the index is out of bounds', () => {
        const nextState = tabs(state, changeTab(100))
        expect(nextState.tabIndex).toEqual(state.tabIndex)
      })
    })

    describe('removeTab', () => {
      const state = tabs(initialState, addTab({}))

      it('removes a tab', () => {
        const nextState = tabs(state, removeTab(1))
        expect(nextState.tabs.length).toEqual(state.tabs.length - 1)
      })

      it('removes the tab at the specified index', () => {
        state.tabs[0].history = ['http://www.google.com']

        const nextState = tabs(state, removeTab(1))
        expect(nextState.tabs[0].history).toEqual(state.tabs[0].history)
      })

      it('does not remove a tab if the index does not exist', () => {
        const nextState = tabs(state, removeTab(100))
        expect(nextState.tabs.length).toEqual(state.tabs.length)
      })

      it('does not remove the last tab', () => {
        let nextState = tabs(state, removeTab(0))
        nextState = tabs(nextState, removeTab(0))
        expect(nextState.tabs.length).toEqual(initialState.tabs.length)
      })

      it('updates the tab index if we remove the last one', () => {
        const changedState = tabs(state, changeTab(1))
        const nextState = tabs(changedState, removeTab(1))

        expect(nextState.tabIndex).toEqual(changedState.tabIndex - 1)
      })
    })
  })
})

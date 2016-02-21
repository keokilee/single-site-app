import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'

import Navigation from 'browser/containers/Navigation'
import TabList from 'browser/components/tabs/TabList'
import WebViewList from 'browser/components/WebViewList'
import Menu from 'browser/containers/Menu'

import {
  getConfig,
  addTab,
  removeTab,
  removeActiveTab,
  changeTab
} from 'browser/actions'

import styles from 'styles/base.css'

class App extends Component {
  handleCloseEvent (e) {
    const { dispatch, tabs } = this.props
    if (tabs.length > 1) {
      dispatch(removeActiveTab())
      e.returnValue = false
    }
  }

  componentDidMount () {
    this.props.dispatch(getConfig())

    // Attach close event.
    window.onbeforeunload = (e) => this.handleCloseEvent(e)
  }

  render () {
    const { config, dispatch, tabIndex, tabs } = this.props

    return (
      <div styleName='app'>
        <Menu />
        <Navigation />
        <TabList
          onAddTab={() => dispatch(addTab())}
          onChangeTab={(index) => dispatch(changeTab(index))}
          onRemoveTab={(index) => dispatch(removeTab(index))}
          tabIndex={tabIndex}
          tabs={tabs} />

        { config
          ? <WebViewList
          sessionNamespace={config.sessionNamespace}
          tabIndex={tabIndex}
          tabs={tabs}
          url={config.url}
          />
          : null
        }
      </div>
    )
  }
}

App.propTypes = {
  config: PropTypes.object,
  dispatch: PropTypes.func,
  tabIndex: PropTypes.number,
  tabs: PropTypes.array
}

function select ({ config, tabs }) {
  return {
    config,
    tabIndex: tabs.tabIndex,
    tabs: tabs.tabs
  }
}

export default cssModules(connect(select)(App), styles)

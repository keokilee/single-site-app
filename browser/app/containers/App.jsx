import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import Navigation from 'app/containers/Navigation';
import Tabs from 'app/containers/Tabs';
import WebView from 'app/components/WebView';
import { setUrl, setLoading, setFavicon } from 'app/actions';
import config from 'app/config';
import whitelist from 'app/whitelist';
import createMenu from 'app/containers/Menu';

import styles from 'styles/base.css';

@CSSModules(styles)
export default class App extends Component {
  render() {
    const { dispatch } = this.props;
    const canNavigate = whitelist(config.whitelist);

    return (
      <div styleName='app'>
        <Navigation webview={this._webView} />
        <Tabs />
        <WebView
          canNavigate={url => canNavigate(url)}
          onChangeUrl={url => dispatch(setUrl(url))}
          ref={c => this._webView = c}
          sessionNamespace={config.sessionNamespace}
          setFavicon={i => dispatch(setFavicon(i))}
          setLoading={l => dispatch(setLoading(l))}
          url={config.url}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

function select(state) {
  return {};
}

createMenu();

export default connect(select)(App);

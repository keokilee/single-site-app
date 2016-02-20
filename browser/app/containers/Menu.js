import process from 'process'
import { remote } from 'electron'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addTab } from 'app/actions'

const { Menu, app } = remote

// This is a fake React component. Actually renders no DOM, but included in the app.
class AppMenu extends Component {
  render () {
    const { dispatch, tabIndex, tabs, config } = this.props

    if (config) {
      const template = buildMenu(dispatch, config, tabIndex, tabs)
      const menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
    }

    return null
  }
}

AppMenu.propTypes = {
  config: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  tabs: PropTypes.array,
  tabIndex: PropTypes.number
}

function select ({ config, tabs }) {
  return {
    config,
    tabs: tabs.tabs,
    tabIndex: tabs.tabIndex
  }
}

export default connect(select)(AppMenu)

// Helper function for building a template.
function buildMenu (dispatch, config, tabIndex, tabs) {
  const currentTab = tabs[tabIndex]

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Tab',
          accelerator: 'CmdOrCtrl+T',
          click: () => dispatch(addTab())
        }, {
          label: 'Close Tab',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }, {
          type: 'separator'
        },
        {
          label: `Quit ${config.name}`,
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload This Page',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            currentTab.webview.handleRefresh()
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.toggleDevTools()
            }
          }
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => require('electron').shell.openExternal('http://electron.atom.io')
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    const name = config.name

    template.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: `Hide ${name}`,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        }
      ]
    })
    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    )
  }

  return template
}

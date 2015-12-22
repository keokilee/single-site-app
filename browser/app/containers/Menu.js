import process from 'process';
import { remote } from 'electron';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addTab, removeTab } from 'app/actions';
import config from 'app/config';

const ElectronMenu = remote.Menu;

// This is a fake React component. Actually renders no DOM, but included in the app.
export class Menu extends Component {
  render() {
    const { dispatch, tabIndex } = this.props;
    const template = buildMenu(dispatch, tabIndex);
    const menu = ElectronMenu.buildFromTemplate(template);
    ElectronMenu.setApplicationMenu(menu);

    return null;
  }
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
  tabs: PropTypes.array
};

function select({ tabs }) {
  return {
    tabIndex: tabs.tabIndex,
    tabs: tabs.tabs
  };
}

export default connect(select)(Menu);

// Helper function for building a template.
function buildMenu(dispatch, currentTab) {
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
          click: () => dispatch(removeTab(currentTab))
        }, {
          type: 'separator'
        },
        {
          label: `Quit ${config.name}`,
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
          click: () => remote.app.quit()
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
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
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
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
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
  ];

  if (process.platform === 'darwin') {
    const name = config.name;

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
    });
    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  return template;
}
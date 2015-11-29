import { Menu } from 'electron';

const template = [{
  label: 'File',
  submenu: [{
    label: 'New Tab',
    accelerator: 'CmdOrCtrl+T',
    role: 'new-tab'
  }]
}];

export function createMenu() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

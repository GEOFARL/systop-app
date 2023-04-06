const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {
  constructor(file, isDev) {
    super({
      title: 'SysTop',
      width: isDev ? 700 : 355,
      height: 500,
      icon: './assets/icons/icon.png',
      resizable: isDev,
      backgroundColor: 'white',
      show: false,
      opacity: 0.9,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    this.loadFile(file);

    if (isDev) {
      this.webContents.openDevTools();
    }
  }
}

module.exports = MainWindow;

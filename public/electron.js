const electron = require('electron');
const { dialog } = require('electron')
const { app, BrowserWindow } = electron;
const URL = require('url');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow = null;

// app.on('ready', createWindow);

app.on('ready', () => {

  // create a new `splash`-Window 
  splash = new BrowserWindow({
    transparent: true,
    frame: false,
    title: "Jitsi Electron Sample",
    icon: __dirname + '/images/production_mark.ico',
  });

  // alwaysOnTop: true,
  splash.maximize();
  splash.loadURL(`file://${__dirname}/splash.html`);

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 1200,
    minHeight: 900,
    title: "Jitsi Electron Sample",
    icon: __dirname + '/images/production_mark.ico',
    show: false
  });
  mainWindow.removeMenu();
  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
  
  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.maximize();
    mainWindow.show();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

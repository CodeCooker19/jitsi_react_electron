const electron = require('electron');
const { dialog } = require('electron')
const { app, BrowserWindow, Menu, Tray } = electron;
const URL = require('url');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow = null;
let tray = null;

app.on('ready', () => {
  // create a new `splash`-Window 
  splash = new BrowserWindow({
    transparent: true,
    frame: false,
    title: "Jitsi Meet Desktop Demo",
    icon: __dirname + '/images/production_mark.ico',
  });

  // alwaysOnTop: true,
  splash.maximize();
  splash.loadURL(`file://${__dirname}/splash.html`);

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 400,
    minHeight: 300,
    title: "Jitsi Meet Desktop Demo",
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

  //Tray icon
  tray = new Tray(path.join(__dirname, '/images/production_mark.ico'));

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click() { app.quit(); }
    }
  ]);

  tray.setToolTip('Jitsi-Meet-Demo');
  tray.setContextMenu(menu);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

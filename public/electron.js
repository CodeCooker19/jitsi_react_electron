const electron = require('electron');
const { dialog } = require('electron')
const { app, BrowserWindow, Menu, Tray } = electron;
const URL = require('url');
const path = require('path');
const isDev = require('electron-is-dev');
const nativeImage = require('electron').nativeImage

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

  mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.minimize();
  });

  mainWindow.on('close', function (event) {

    event.preventDefault();
    mainWindow.hide();
    return false;
  });

  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.maximize();
    mainWindow.show();

    //Tray icon
    const trayIcon = path.join(__dirname, 'images/production_mark.ico');
    const nimage = nativeImage.createFromPath(trayIcon);
    tray = new Tray(nimage);
    const menu = Menu.buildFromTemplate([
      {
        label: 'Quit', click: function () {
          mainWindow.destroy();
          app.quit();
        }
      }
    ]);
    tray.setToolTip('Jitsi-Meet-Demo');
    tray.setContextMenu(menu);
    tray.on('click', (event, bounds, position) => {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
  });
});

app.on('window-all-closed', function (event) {
  console.log(">>>>window-all-Closed");
  if (process.platform !== 'darwin') {
    console.log(">>>>window-all-Closed, darwin");
    app.quit();
  }
});

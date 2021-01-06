const electron = require('electron');
const { dialog } = require('electron')
const { app, BrowserWindow, Menu, Tray } = electron;
const URL = require('url');
const path = require('path');
const isDev = require('electron-is-dev');
const nativeImage = require('electron').nativeImage;
const url = require('url')
const { ipcMain } = require('electron');

let mainWindow = null;
let controller = null;
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

  // create controller dialog
  controller = new BrowserWindow({
    width: 300,
    height: 400,
    maxWidth: 300,
    maxHeight: 400,
    minWidth: 300,
    minHeight: 400,
    title: "Controller",
    icon: __dirname + '/images/production_mark.ico',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  controller.removeMenu();
  // controller.webContents.openDevTools();

  // and load the second window.
  controller.loadURL(url.format({
    pathname: path.join(__dirname, 'controller.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Attach event listener to event that requests to update something in the second window
  // from the first window
  ipcMain.on('request-update-label-in-second-window', (event, arg) => {
    // Request to update the label in the renderer process of the second window
    console.log(arg);
  });

  controller.on('close', function (event) {
    event.preventDefault();
    controller.hide();
    return false;
  });

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 400,
    minHeight: 300,
    title: "Jitsi Meet Desktop Demo",
    icon: __dirname + '/images/production_mark.ico',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
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
    controller.hide();
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
    controller.show();
    setInterval(updateUserInfo, 3000);

    //Tray icon
    const trayIcon = path.join(__dirname, 'images/production_mark.ico');
    const nimage = nativeImage.createFromPath(trayIcon);
    tray = new Tray(nimage);
    const menu = Menu.buildFromTemplate([
      {
        label: 'Quit', click: function () {
          mainWindow.destroy();
          controller.destroy();
          app.quit();
        }
      }
    ]);
    tray.setToolTip('Jitsi-Meet-Demo');
    tray.setContextMenu(menu);
    tray.on('click', (event, bounds, position) => {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
        controller.hide();
      } else {
        mainWindow.show();
        controller.show();
      }
    });
  });

});

app.on('window-all-closed', function (event) {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/* 
  init user information when user logout or exit.
*/
function updateUserInfo() {
  mainWindow.webContents
    .executeJavaScript('sessionStorage.getItem("camera");', true)
    .then(result => {
      console.log("camera value:", result);
    });

  mainWindow.webContents
    .executeJavaScript('sessionStorage.getItem("mic");', true)
    .then(result => {
      console.log("mic value:", result);
    });
}

ipcMain.on('camera-update', (event, arg) => {
  // Request to update the label in the renderer process of the second window
  mainWindow.webContents
    .executeJavaScript(`sessionStorage.setItem("camera", '${arg}');`)
    .then(result => {
    });
});

ipcMain.on('mic-update', (event, arg) => {
  // Request to update the label in the renderer process of the second window
  mainWindow.webContents
    .executeJavaScript(`sessionStorage.setItem("mic", '${arg}');`)
    .then(result => {
    });
});

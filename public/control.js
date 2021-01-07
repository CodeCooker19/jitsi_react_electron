const { ipcRenderer } = require('electron')
let flagCamera = false
let lockCamera = false
const cameraBtn = document.getElementById('camera_btn')
const cameraImg = document.getElementById('camera_img')

let flagMic = false
let lockMic = false
const micBtn = document.getElementById('mic_btn')
const micImg = document.getElementById('mic_img')

const consoleLabel = document.getElementById('inform_lab')
/* camera update*/
cameraBtn.addEventListener('click', (event) => {
    let inform;
    lockCamera = true;
    flagCamera = !flagCamera;

    if (flagCamera == true) {
        cameraImg.src = "./images/camera_off_icon.png";
        inform = "Turn off camera."
    }
    else {
        cameraImg.src = "./images/camera_on_icon.png";
        inform = "Turn on camera."
    }
    consoleLabel.innerHTML = inform;
    
    ipcRenderer.send('camera-update', flagCamera)
})

/* camera updated*/
ipcRenderer.on('updated-camera-status', (event, index) => {
    lockCamera = false;
})

/* camera updated by conference dialog*/
ipcRenderer.on('changed-camera-status', (event, index) => {
    if(lockCamera == true) {
        return;
    }

    let inform;
    flagCamera = index;
    
    if (flagCamera == true) {
        cameraImg.src = "./images/camera_off_icon.png";
        inform = "Turn off camera."
    }
    else {
        cameraImg.src = "./images/camera_on_icon.png";
        inform = "Turn on camera."
    }
    consoleLabel.innerHTML = inform;
})

/* mic update*/
micBtn.addEventListener('click', (event) => {
    let inform;
    
    lockMic = true;
    flagMic = !flagMic;
    if (flagMic == true) {
        micImg.src = "./images/mic_off_icon.png";
        inform = "Turn off mic."
    }
    else {
        micImg.src = "./images/mic_on_icon.png";
        inform = "Turn on mic."
    }
    consoleLabel.innerHTML = inform;

    ipcRenderer.send('mic-update', flagMic)
})

/* mic updated*/
ipcRenderer.on('updated-mic-status', (event, index) => {
    lockMic = false;
})

/* mic updated by conference dialog*/
ipcRenderer.on('changed-mic-status', (event, index) => {
    if(lockMic == true) {
        return;
    }

    let inform;
    
    flagMic = index;
    if (flagMic == true) {
        micImg.src = "./images/mic_off_icon.png";
        inform = "Turn off mic."
    }
    else {
        micImg.src = "./images/mic_on_icon.png";
        inform = "Turn on mic."
    }
    consoleLabel.innerHTML = inform;
})
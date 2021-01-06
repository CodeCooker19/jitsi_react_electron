const { ipcRenderer } = require('electron')
let flagCamera = false
const cameraBtn = document.getElementById('camera_btn')
const cameraImg = document.getElementById('camera_img')

let flagMic = false
const micBtn = document.getElementById('mic_btn')
const micImg = document.getElementById('mic_img')

const consoleLabel = document.getElementById('inform_lab')
/* camera update*/
cameraBtn.addEventListener('click', (event) => {
    let inform;
    
    if (flagCamera == false) {
        cameraImg.src = "./images/camera_off_icon.png";
        inform = "Turn off camera."
    }
    else {
        cameraImg.src = "./images/camera_on_icon.png";
        inform = "Turn on camera."
    }
    consoleLabel.innerHTML = inform;
    
    flagCamera = !flagCamera;
    ipcRenderer.send('camera-update', flagCamera)
})

ipcRenderer.on('updated-camera-status', (event, index) => {
    let inform;
    flagCamera = index;
    
    if (flagCamera == false) {
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
    
    if (flagMic == false) {
        micImg.src = "./images/mic_off_icon.png";
        inform = "Turn off mic."
    }
    else {
        micImg.src = "./images/mic_on_icon.png";
        inform = "Turn on mic."
    }
    consoleLabel.innerHTML = inform;

    flagMic = !flagMic;
    ipcRenderer.send('mic-update', flagMic)
})

ipcRenderer.on('updated-mic-status', (event, index) => {
    let inform;
    
    flagMic = index;
    if (flagMic == false) {
        micImg.src = "./images/mic_off_icon.png";
        inform = "Turn off mic."
    }
    else {
        micImg.src = "./images/mic_on_icon.png";
        inform = "Turn on mic."
    }
    consoleLabel.innerHTML = inform;
})
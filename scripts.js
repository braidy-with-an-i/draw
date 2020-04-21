const video = document.querySelector('.player');
const videoLayer = document.querySelector('.photo');
const paintLayer = document.querySelector('.draw')
const ctx = videoLayer.getContext('2d');
const ctx1 = paintLayer.getContext('2d')
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(localMediaStream => {
    console.log(localMediaStream)
    video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
  })
}


function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  videoLayer.width = width;
  videoLayer.height = height;
  console.log(height, width)


  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
  }, 16)
}

getVideo()

ctx1.strokeStyle='red'
ctx1.lineJoin = 'round'
ctx1.lineCap = 'round'
ctx1.lineWidth = 10


let isDrawing = false
let lastX = 0
let lastY = 0

function draw(e) {
  if(!isDrawing) return
  ctx1.beginPath()
  ctx1.moveTo(lastX, lastY)
  ctx1.lineTo(e.offsetX, e.offsetY)
  ctx1.stroke()
  lastX = e.offsetX
  lastY = e.offsetY
}



paintLayer.addEventListener('mousedown', (e) => {
  isDrawing = true
  [lastX, lastY] = [e.offsetX, e.offsetY]
})

paintLayer.addEventListener('mousemove', draw)
paintLayer.addEventListener('mouseup', () => isDrawing = false)
paintLayer.addEventListener('mouseout', () => isDrawing = false)


video.addEventListener('canplay', paintToCanvas)

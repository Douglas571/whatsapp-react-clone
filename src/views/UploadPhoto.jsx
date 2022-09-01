import './UploadPhoto.css'

import { useState, useEffect, useRef } from 'react'

import Icon from '@/components/Icon.jsx'
import IconButton from '@/components/IconButton.jsx'
import CameraShotButton from '@/components/CameraShotButton.jsx'

let flash = {
  on: 'flash_on',
  off: 'flash_off',
  auto: 'flash_auto',
}

export default function UploadPhoto(props) {

  let [streaming, setStreaming] = useState(false)
  let videoRef = useRef(null)
  let canvasRef = useRef(null)
  
  let photoRef = useRef(null)
  let [photoSrc, setPhotoSrc] = useState('')

  let [width, _] = useState(320)
  let [height, setHeight] = useState(0)

  async function initVideo() {

    try {
      let stream = await navigator
                  .mediaDevices
                  .getUserMedia({ video: true, audio: false })

      videoRef.current.srcObject = stream
      videoRef.current.play()
    } catch (err) {
      console.log(`an error occured! ${err}`)
    }
  }

  useEffect(() => {
    initVideo()
  }, [])

  function defineSize(evt) {
    console.log(evt)

    if (!streaming) {
      const { videoHeight, videoWidth } = videoRef.current

      let h =  videoHeight / videoWidth * width 
      setHeight(h)
    }
  }

  useEffect(() => {
    if (height != 0) {
      console.log({height})

      videoRef.current.width = width
      videoRef.current.height = height
      canvasRef.current.width = width
      canvasRef.current.height = height
      photoRef.current.width = width
      photoRef.current.height = height

      setStreaming(true)
    }
  }, [height])

  function takePhoto() {
    console.log('take photo')
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current
      .getContext('2d')
      .drawImage(videoRef.current, 0, 0, width, height);
    let data = canvasRef.current.toDataURL('image/png');
    setPhotoSrc(data)
  }

  function recordVideo() {
    console.log('start video')
  }

  function finishVideo() {
    console.log('end video')
  }

  return (
    <div className="upload-photo">

      <video 
        style={{

        }}

        id="video" 
        ref={videoRef}
        onCanPlay={defineSize}
      ></video>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <img ref={photoRef} 
        src={photoSrc} 
        id="photo" 
        alt="photo"/>

      
      <div className="panel">
        <div className="photos"></div>
        <div className="controls">
          
          <div className="buttons">
            <IconButton>
              <Icon be={flash.on}/>
            </IconButton>

            <div className="camera-shot-box">
              <CameraShotButton
                onTouch={takePhoto}
                onHold={recordVideo}
                onHoldEnd={finishVideo}
              />
            </div>

            <IconButton>
              <Icon be="flip_camera_ios"/>
            </IconButton>
            
          </div>
          <div className="info">
            <p>Hold for video, touch for photo</p>
          </div>

        </div>

      </div>
    </div>
    )
}
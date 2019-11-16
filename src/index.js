import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {putFileInStorage} from './putFileInStorage'
import PropTypes from 'prop-types'
import { AvatarWrapper, ImageWrapper } from './theme'
import AddPhoto from './icons/AddPhoto'
import Loading from './icons/Loading'

ReactAvatarFirebase.propTypes = {
  pathToStorage: PropTypes.string,
  imageSrc: PropTypes.string,
  handleGetImage: PropTypes.func,
  animationTime: PropTypes.string,
  size: PropTypes.number,
  borderColor: PropTypes.string,
  borderOpacity: PropTypes.number,
  readOnly: PropTypes.bool,
  storage: PropTypes.object
}

ReactAvatarFirebase.defaultProps = {
  pathToStorage: '',
  imageSrc: null,
  handleGetImage: () => {},
  animationTime: '0.3s',
  size: 128,
  borderColor: '#e2e2e2',
  borderOpacity: 1,
  readOnly: false,
  storage: {}
}

function ReactAvatarFirebase(props) {
  const {pathToStorage, imageSrc, handleGetImage, animationTime, size, borderColor, borderOpacity, readOnly, storage} = props
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [RAFIDX, setRAFIDX] = useState(0)

  useEffect(() => {
    setRAFIDX(generateIndex())
  }, []);

  useEffect(() => {
    if (imageSrc) return setImage(imageSrc)
  }, [loading, imageSrc])

  useEffect(() => {
    setImageOnCanvas(image, size, RAFIDX)
  }, [image])

  const handleDropFile = async (acceptedFile) => {
    let file = acceptedFile[0]
    createThumb(file)
    let uploadTask = addFileToStorageAndGetTask(file)
    loadingProgress(RAFIDX, uploadTask)
  }

  const createThumb = file => {
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const onDrop = useCallback(handleDropFile)

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: ['.png', '.jpg', '.jpeg', '.svg']
  })

  const addFileToStorageAndGetTask = async file => {
    setLoading(true)
    try {
      const uploadedImageTask = putFileInStorage(storage, pathToStorage, file)
      handleGetImage(uploadedImageTask)
    } catch (error) {
      console.log({error})
    }
    setLoading(false)
  }

  return (
    <AvatarWrapper
      width={size}
      height={size}
      id={`RAF-canvas-${RAFIDX}`}
      animationTime={animationTime}
      size={size}
      borderColor={borderColor}
      borderOpacity={borderOpacity}
      readOnly={readOnly}
      {...getRootProps()}>
    </AvatarWrapper>
  )
}

export default ReactAvatarFirebase

function setImageOnCanvas(image, size, id) {
  let [canvas, ctx] = getCanvasAndContext(id);
  let img = new Image(size, size);
  img.src = image;
  img.onload = () => {
    console.log("setImageOnCanvas")
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

function loadingProgress(id, task) {
  handleUploadTask(task);
  let [canvas, ctx] = getCanvasAndContext(id);
  var posX = canvas.width / 2,
    posY = canvas.height / 2,
    radius = posX;

  ctx.lineCap = 'round';
  arcMove();
  
  function arcMove(){
    ctx.beginPath();
    ctx.strokeStyle = '#3949AB';
    ctx.lineWidth = '5';
    ctx.arc(posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + task.progress) );
    ctx.stroke();
  }
}

function getCanvasAndContext(id){
  let canvas = document.getElementById(`RAF-canvas-${id}`);
  let ctx = canvas && canvas.getContext('2d');
  return [canvas, ctx];
}

function generateIndex() {
  let index = (Math.random().toPrecision(5)*100000).toString();
  return index;
}
function handleUploadTask(uploadTask) {
  console.log(uploadTask.snapshot)
  debugger
  // uploadTask && uploadTask.on('state_changed', function(snapshot){
  //   // Observe state change events such as progress, pause, and resume
  //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log('Upload is ' + progress + '% done');
  //   switch (snapshot.state) {
  //     case firebase.storage.TaskState.PAUSED: // or 'paused'
  //       console.log('Upload is paused');
  //       break;
  //     case firebase.storage.TaskState.RUNNING: // or 'running'
  //       console.log('Upload is running');
  //       break;
  //   }
  // }, function(error) {
  //   // Handle unsuccessful uploads
  // }, function() {
  //   // Handle successful uploads on complete
  //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //     console.log('File available at', downloadURL);
  //   });
  // });
}

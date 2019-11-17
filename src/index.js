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
  const [RAFIDX, _] = useState(generateIndex())
  const [progressUpload, setProgressUpload] = useState()
  const [file, setFile] = useState(null)
  const [downloadURL, setDownloadURL] = useState(null)
  const FINISH_UPLOAD = 100

  useEffect(() => {
    if (imageSrc) return setImage(imageSrc)
  }, [loading, imageSrc])

  useEffect(() => {
    setImageOnCanvas(image, size, RAFIDX)
  }, [image])

  useEffect(() => {
    handleGetImage(downloadURL)
  }, [downloadURL])

  useEffect(() => {
    loadingProgress(RAFIDX, progressUpload)
    if(progressUpload === FINISH_UPLOAD)
      createThumb(file)
  }, [progressUpload])

  const handleDropFile = async (acceptedFile) => {
    let file = acceptedFile[0]
    setFile(file)
    addFileToStorageAndGetTask(file)
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
      handleUploadTask(uploadedImageTask)
    } catch (error) {
      console.log({error})
    }
    setLoading(false)
  }

  const handleUploadTask = uploadTask => {
    uploadTask && uploadTask.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressUpload(progress)
    }, 
    (error) => console.log(error), 
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        setDownloadURL(downloadURL);
      });
    });
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
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

function loadingProgress(id, progress) {
  let [canvas, ctx] = getCanvasAndContext(id);
  var posX = canvas.width / 2,
    posY = canvas.height / 2,
    progress = progress * 3.6,
    radius = posX;

  ctx.lineCap = 'round';
  arcMove();
  
  function arcMove(){
    ctx.beginPath();
    ctx.strokeStyle = '#3949AB';
    ctx.lineWidth = '10';
    ctx.arc(posX, posY, radius, (Math.PI/180) * 270, (Math.PI/180) * (270 + progress));
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

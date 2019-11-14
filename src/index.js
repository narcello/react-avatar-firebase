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
  let time = new Date().getTime().toString();
  const RAFID = time.substr(time.length - 4);

  useEffect(() => {
    if (imageSrc) return setImage(imageSrc)
  }, [loading, imageSrc])

  useEffect(() => {
    setImageOnCanvas(image, size, RAFID)
  }, [image])

  const handleDropFile = async acceptedFile => {
    let file = acceptedFile[0]
    createThumb(file)
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
      handleGetImage(uploadedImageTask)
    } catch (error) {
      console.log({error})
    }
    setLoading(false)
  }

  const Child = () => {
    return <>
      {!readOnly && <input {...getInputProps()} />}
      {isDragActive && !readOnly ? (
        <div>Solte aqui...</div>
      ) : !image ? (
        loading ? <Loading /> : <AddPhoto />
      ) : (
            <ImageWrapper style={{backgroundImage: `url(${image})`}} />
          )}
    </>
  }

  return (
      <AvatarWrapper
        id={`RAF-canvas-${RAFID}`}
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

const setImageOnCanvas = (image, size, id) => {
  let canvas = document.getElementById(`RAF-canvas-${id}`);
  let ctx = canvas && canvas.getContext('2d');
  let img = new Image(size, size);
  img.src = image;
  img.onload = () => {
    console.log("setImageOnCanvas")
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  var posX = canvas.width / 2,
  posY = canvas.height / 2,
  fps = 1000 / 200,
  oneProcent = 360 / 100,
  result = oneProcent * 64;

  ctx.lineCap = 'round';
  arcMove();
  
  function arcMove(){
    var deegres = 0;
    var acrInterval = setInterval (function() {
      deegres += 1;

      ctx.beginPath();
      console.log({posX, posY})
      ctx.arc(posX, posY, 100, 0, 2*Math.PI);
      ctx.strokeStyle = '#b1b1b1';
      ctx.lineWidth = '3';
      ctx.stroke();

      // ctx.beginPath();
      // ctx.strokeStyle = '#3949AB';
      // ctx.lineWidth = '10';
      // ctx.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
      // ctx.stroke();
      if( deegres >= result ) clearInterval(acrInterval);
    }, fps);
    
  }
}

/**
 * Before update on storage
 * onDrop -> Crop image
 * Upload croped image
 */
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
  size: PropTypes.string,
  borderColor: PropTypes.string

}

ReactAvatarFirebase.defaultValues = {
  pathToStorage: '',
  imageSrc: null,
  handleGetImage: '',
  animationTime: '0.3s',
  size: '128px',
  borderColor: '#e2e2e2'
}

function ReactAvatarFirebase(props) {
  const {pathToStorage, imageSrc, handleGetImage, animationTime, size, borderColor} = props
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)

  useEffect(() => {
    if (imageSrc) return setImage(imageSrc)
  }, [loading, imageSrc])

  const handleDropFiles = acceptedFiles => {
    acceptedFiles.forEach(file => {
      addFileToStorageAndGetTask(file)
    })
  }

  const onDrop = useCallback(handleDropFiles)

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: ['.png', '.jpg', '.jpeg', '.svg']
  })

  const addFileToStorageAndGetTask = async file => {
    setLoading(true)
    try {
      const uploadedImage = await putFileInStorage(pathToStorage, file)
      handleGetImage(uploadedImage)
    } catch (error) {
      console.log({error})
    }
    setLoading(false)
  }

  return (
    <AvatarWrapper
      animationTime={animationTime}
      size={size}
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>Solte aqui...</div>
      ) : !image ? (
        loading ? <Loading /> : <AddPhoto />
      ) : (
        <ImageWrapper style={{backgroundImage: `url(${image})`}} />
      )}
    </AvatarWrapper>
  )
}

export default ReactAvatarFirebase

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
  handleGetImage: PropTypes.func
}

ReactAvatarFirebase.defaultValues = {
  pathToStorage: '',
  imageSrc: null,
  handleGetImage: ''
}

function ReactAvatarFirebase(props) {
  const {pathToStorage, imageSrc, handleGetImage} = props
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
    <AvatarWrapper {...getRootProps()}>
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

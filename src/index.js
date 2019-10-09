import React, {useCallback, useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import addPhoto from './icons/add_photo.svg'
import loadingSvg from './icons/loading.svg'
import {putFileInStorage} from './putFileInStorage'
import PropTypes from 'prop-types'
import { AvatarWrapper, ImageWrapper } from './theme'

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
  const [svg, setSvg] = useState({})

  useEffect(() => {
    if (imageSrc) return setImage(imageSrc)
  }, [loading, imageSrc])

  useEffect(() => {
    let svgActive = loading ? loadingSvg : addPhoto
    setSvg(svgActive)
  }, [loading])

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
      ) : loading || !image ? (
        <img src={svg} />
      ) : (
        <ImageWrapper style={{backgroundImage: `url(${image})`}} />
      )}
    </AvatarWrapper>
  )
}

export default ReactAvatarFirebase

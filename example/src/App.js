import React from 'react'
import ReactAvatarFirebase from 'react-avatar-firebase'
import { storage } from './db/config'

const App = () => {
  const handleGetImage = url => {
    console.log(url)
  }
  return (
    <div>
      <ReactAvatarFirebase storage={storage} handleGetImage={handleGetImage} />

      <ReactAvatarFirebase readOnly imageSrc='https://cdn.pixabay.com/photo/2017/10/27/15/52/jaguar-2894706__340.jpg' />

      <ReactAvatarFirebase
        animationTime='0.1s'
        imageSrc='https://cdn.pixabay.com/photo/2017/10/27/15/52/jaguar-2894706__340.jpg' />

      <ReactAvatarFirebase
        size={64}
        imageSrc='https://cdn.pixabay.com/photo/2017/10/27/15/52/jaguar-2894706__340.jpg' />

      <ReactAvatarFirebase
        storage={storage}
        borderColor='#c01247'
        size={256}
        animationTime='0.1s' />
    </div>
  )
}
export default App

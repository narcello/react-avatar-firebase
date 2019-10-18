import React from 'react'
import ReactAvatarFirebase from 'react-avatar-firebase'

const App = () => {
  return (
    <div>
      <ReactAvatarFirebase />

      <ReactAvatarFirebase readOnly imageSrc='https://cdn.pixabay.com/photo/2017/10/27/15/52/jaguar-2894706__340.jpg' />

      <ReactAvatarFirebase
        animationTime='0.1s'
        imageSrc='https://cdn.pixabay.com/photo/2017/10/27/15/52/jaguar-2894706__340.jpg' />

      <ReactAvatarFirebase
        size='64px'
        imageSrc='https://cdn.pixabay.com/photo/2017/10/27/15/52/jaguar-2894706__340.jpg' />

      <ReactAvatarFirebase
        borderColor='#c01247'
        size='256px'
        animationTime='0.1s' />
    </div>
  )
}
export default App

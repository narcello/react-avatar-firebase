# react-avatar-firebase

> Easily Avatar on Firebase Storage


[![](https://img.shields.io/npm/v/react-avatar-firebase.svg)](https://www.npmjs.com/package/react-avatar-firebase) [![](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![](https://img.shields.io/david/peer/MarcelloVSilva/react-avatar-firebase)
![](https://img.shields.io/bundlephobia/min/react-avatar-firebase)
![](https://img.shields.io/david/dev/MarcelloVSilva/react-avatar-firebase)
## Install

```bash
npm install --save react-avatar-firebase
```

## Documentation
Use react-avatar-firebase for upload avatar on Firebase Storage.

| Props  |  Definition |
| ------------ | ------------ |
| pathToStorage  |  Name of folder/path where you will save your avatar on storage |
|  imageSrc |  Pass a image url to render |
| handleGetImage | Callback that gives you a return of upload of image on storage |
| animationTime | defines hover avatar wrapper animation time |
| size | defines avatar wrapper size |
| borderColor | defines border color |
| borderOpacity | defines border opacity |

## Usage

```jsx
import React from 'react'
import RAF from 'react-avatar-firebase'

const App = () => {
  return (
    <div>
      <RAF
        pathToStorage="avatars"
        imageSrc={imageSrc}
        handleGetImage={handleGetImage}
        animationTime='0.3s'
        size='128px'
        borderColor='#e2e2e2'
        borderOpacity={0.9}
       />
    </div>
  )
}
export default App
```

## Local test

Run `yarn start` at root folder and at example folder

## License

MIT © [MarcelloVSilva](https://github.com/MarcelloVSilva)
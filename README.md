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

## Usage

```jsx
import React from 'react'
import RAF from 'react-avatar-firebase'

const App = () => {
  return (
    <div>
      <RAF pathToStorage="avatars" imageSrc={imageSrc} handleGetImage={handleGetImage}/>
    </div>
  )
}
export default App
```

## Local test

Run `yarn start` at root folder and at example folder

## License

MIT © [MarcelloVSilva](https://github.com/MarcelloVSilva)
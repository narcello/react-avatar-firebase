import firebase from 'firebase'
import 'firebase/storage'

export function putFileInStorage(path, file) {
  let folder = handlePathStorage(path)
  let storage = firebase.storage()
  return new Promise((resolve, reject) => {
    let refToFile
    try {
      refToFile = storage.ref().child(`${folder}/${file.name}`)
      refToFile
        .put(file)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

const handlePathStorage = path => {
  let ret = ''
  const rootCases = ['', '.', '/']
  const isRootCase = rootCases.includes(path)
  if (!isRootCase) ret = path
  return ret
}

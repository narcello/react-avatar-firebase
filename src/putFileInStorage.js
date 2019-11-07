export function putFileInStorage(storage, path, file) {
  return new Promise((resolve, reject) => {
    let refToFile
    try {
      refToFile = storage.ref().child(`${path}/${file.name}`)
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

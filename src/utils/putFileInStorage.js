export default function putFileInStorage(storage, path, file) {
  let folder = handlePathStorage(path)
  try {
    return storage.ref().child(`${folder}/${file.name}`).put(file);
  } catch (error) {
    console.log(error)
  }
}

const handlePathStorage = path => {
  let ret = ''
  const rootCases = ['', '.', '/']
  const isRootCase = rootCases.includes(path)
  if (!isRootCase) ret = path
  return ret
}

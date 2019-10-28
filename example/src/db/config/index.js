import * as firebase from 'firebase/app'
import 'firebase/storage'
const config = require('./firebase.json')

export const initializeFirebaseApp = () => {
  firebase.initializeApp(config)
  firebase.storage()
}

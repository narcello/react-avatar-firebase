import * as firebase from 'firebase/app'
import 'firebase/storage'
const config = require('./firebase.json')

export let storage = null

export const initializeFirebaseApp = () => {
  firebase.initializeApp(config)
  storage = firebase.storage()
}

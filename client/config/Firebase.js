import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBrEWQwoY7pK3Zvow0oreGY3uFpuCO1GSM",
  authDomain: "funx-1df62.firebaseapp.com",
  databaseURL: "https://funx-1df62.firebaseio.com",
  projectId: "funx-1df62",
  storageBucket: "funx-1df62.appspot.com",
  messagingSenderId: "1042201846625",
  appId: "1:1042201846625:web:dc91e7f94b29eeb87d5b20"
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase

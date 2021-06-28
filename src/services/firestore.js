import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = require("./fb-config")

firebase.initializeApp(config)

export default firebase

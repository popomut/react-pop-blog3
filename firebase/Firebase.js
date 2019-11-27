import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};


const config = {
  apiKey: "AIzaSyDAJBCrwJLe7iEWnycsfa_daDR0CfRXHYY",
  authDomain: "ng-blog-3d3e9.firebaseapp.com",
  databaseURL: "https://ng-blog-3d3e9.firebaseio.com",
  projectId: "ng-blog-3d3e9",
  storageBucket: "ng-blog-3d3e9.appspot.com",
  messagingSenderId: "955602764943"
};

if (!firebase.apps.length) {
   firebase.initializeApp(config);
}
//firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
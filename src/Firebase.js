import * as firebase from 'firebase';

// const settings = { timestampsInSnapshots: true };

// const firebaseConfig = {
//     apiKey: "AIzaSyD1suCaOOIHicXq-JlnztNShvo5AxUYUeY",
//     authDomain: "crud-9cc0c.firebaseapp.com",
//     databaseURL: "https://crud-9cc0c.firebaseio.com",
//     projectId: "crud-9cc0c",
//     storageBucket: "crud-9cc0c.appspot.com",
//     messagingSenderId: "1026146224546",
//     appId: "1:1026146224546:web:7bd7f6c5270e334c"
// };
// firebase.initializeApp(firebaseConfig);

// firebase.firestore().settings(settings);

// export default firebase;

const firebaseConfig = {
    apiKey: "AIzaSyD1suCaOOIHicXq-JlnztNShvo5AxUYUeY",
    authDomain: "crud-9cc0c.firebaseapp.com",
    databaseURL: "https://crud-9cc0c.firebaseio.com",
    projectId: "crud-9cc0c",
    storageBucket: "crud-9cc0c.appspot.com",
    messagingSenderId: "1026146224546",
    appId: "1:1026146224546:web:7bd7f6c5270e334c"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
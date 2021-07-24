// import { firebase_db } from '../../firebaseConfig';
// const firebase_db = require('./firebaseConfig.js');

const firebase = require('firebase/app');
require('firebase/database');
require('firebase/storage');

console.log('hello, world.');
// console.log({firebase});

// var firebaseConfig = {
//     apiKey: "AIzaSyCFUcLFu6UnJgbX1QHYyAuqzn03dR9oLXM",
//     authDomain: "webrokeup.firebaseapp.com",
//     databaseURL: "https://webrokeup-default-rtdb.asia-southeast1.firebasedatabase.app/",
//     projectId: "webrokeup",
//     storageBucket: "webrokeup.appspot.com",
//     messagingSenderId: "514543696025",
//     appId: "1:514543696025:web:c3e3f5360191728c49a008",
//     measurementId: "G-6ECY7LWR9G"
// };
var firebaseConfig = {
    apiKey: "AIzaSyAztNyV9LSQRPGlnDUjEFQrlz9amLio2vg",
    authDomain: "breakupdiary-9cdc8.firebaseapp.com",
    databaseURL: "https://breakupdiary-9cdc8-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "breakupdiary-9cdc8",
    storageBucket: "breakupdiary-9cdc8.appspot.com",
    messagingSenderId: "893078063657",
    appId: "1:893078063657:web:724711b9883bdd35f86a38",
    measurementId: "G-NLWTG75S1H"
};

if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
}

const firebase_db =firebase.database();

const bookKey = '01282456526862863';
// const bookKey = '007219320442691124';

firebase_db
    .ref(`/book/${bookKey}`)
    .once('value',(snapshot) =>{
        const myitem = {};

        snapshot.forEach((child) => {
            const key = child.key;
            const value = child.val();
            myitem[key] = value; // 우리가 잘 아는 javascript object가 된다!
        });
    });
// import { firebase_db } from '../../firebaseConfig';
// const firebase_db = require('./firebaseConfig.js');

const firebase = require('firebase/app');
require('firebase/database');
require('firebase/storage');

console.log('hello, world.');
// console.log({firebase});

var firebaseConfig = {
    apiKey: "AIzaSyCFUcLFu6UnJgbX1QHYyAuqzn03dR9oLXM",
    authDomain: "webrokeup.firebaseapp.com",
    databaseURL: "https://webrokeup-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "webrokeup",
    storageBucket: "webrokeup.appspot.com",
    messagingSenderId: "514543696025",
    appId: "1:514543696025:web:c3e3f5360191728c49a008",
    measurementId: "G-6ECY7LWR9G"
};

if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
}

const firebase_db =firebase.database();
// console.log({firebase_db});

// 우리가 진짜로 하고 싶은 것: 모든 book에서 (=bookKey 관계 없이) 모든 chapters를 (=capterKey 관계없이) 조회해오고 싶다!
firebase_db
    // .ref(`book/007636285150347155/chapters`)
    // .ref(`book/*/chapters`)
    .ref(`book`)
    // .orderByChild('chapters')
    .on('value',(snapshot) =>{
        let list = [];

        console.log({snapshot});
        console.log({'typeof snapshot': typeof snapshot});
        console.log({'snapshot.length': snapshot.length});

        snapshot.forEach((child) => {
            // ch_temp.push(child.val());   
            // console.log({child});
            const book = child.val();
            // console.log({book});
            const {chapters} = book;
            // console.log({chapters});
            // const list = Object.values(chapters);
            // console.log({list});
            list = [...list, ...Object.values(chapters)];
        });

        list.sort(function(a, b) {
            // console.log({'a.regdate': a.regdate});
            // console.log({'b.regdate': b.regdate});

            // const aRegDate = new Date(a.regdate);
            // const bRegDate = new Date(b.regdate);

            
            // const sub = bRegDate - aRegDate;
            
            // console.log({aRegDate, bRegDate, sub, });

            // return sub;
            
            return new Date(b.regdate) - new Date(a.regdate);
        });

        console.log({list});


        // // 전체 snapshot 중에서, 앞에거 두 개만 갖고 오고 싶을 경우!
        // if (snapshot.length >= 1) {
        //     ch_temp_push(snapshot[0].val());
        // }
        // if (snapshot.length >= 2) {
        //     ch_temp_push(snapshot[1].val());
        // }


        // setChapter(ch_temp)
    });
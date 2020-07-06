import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCvVzlN0q8PaUV6b5FsWUJdrv1DV9VYANc",
    authDomain: "truckpadcase.firebaseapp.com",
    databaseURL: "https://truckpadcase.firebaseio.com",
    projectId: "truckpadcase",
    storageBucket: "truckpadcase.appspot.com",
    messagingSenderId: "843694653346",
    appId: "1:843694653346:web:fa155f8530ff15881c3cfb"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
// Firebase v12+

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyAt-fHfHeZsLm_FNz_x9HS4LfHtGKza2ME",
    authDomain: "conceptrater.firebaseapp.com",
    projectId: "conceptrater",
    storageBucket: "conceptrater.firebasestorage.app",
    messagingSenderId: "457190894975",
    appId: "1:457190894975:web:9d2e7aaae982aee521be4a"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function saveVote(vote){

    return await addDoc(
        collection(db,"votes"),
        vote
    );

}

export async function getVotes(){

    const snapshot =
        await getDocs(
            collection(db,"votes")
        );

    return snapshot.docs.map(doc=>({

        id:doc.id,

        ...doc.data()

    }));

}

export async function clearVotes(){

    const snapshot =
        await getDocs(
            collection(db,"votes")
        );

    const promises=[];

    snapshot.forEach(item=>{

        promises.push(

            deleteDoc(
                doc(db,"votes",item.id)
            )

        );

    });

    await Promise.all(promises);

}
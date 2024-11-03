import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBy2XKH-qj3GMuy_-Os5veLFWUnmxZ_6EA",
  authDomain: "frontend8-2d.firebaseapp.com",
  projectId: "frontend8-2d",
  storageBucket: "frontend8-2d.firebasestorage.app",
  messagingSenderId: "474343746333",
  appId: "1:474343746333:web:95a3105f27013cfaa0cff4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const savePost= async (postType, postData, image) => {
  try {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      postData.imageUrl = imageUrl;
    }

    const docRef = await addDoc(collection(db, postType === 'question' ? 'questions' : 'articles'), {
      ...postData,
      date: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }


}

export const fetchQuestions= async (callback) => {
  const q = query(collection(db, 'questions'));
  const querySnapshot = await getDocs(q);
  const questionsArray = [];
  querySnapshot.forEach((doc) => {
    questionsArray.push({ ...doc.data(), id: doc.id });
  });
  callback(questionsArray);
}


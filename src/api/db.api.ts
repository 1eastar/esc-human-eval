import { db } from './db'
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { ScoreData } from '@/utils/dialogue.utils';


export async function getScores() {
  const scoreCollection = collection(db, 'score');
  const scoreSnapshot = await getDocs(scoreCollection);
  scoreSnapshot.forEach((doc) => {
    // 가져온 모든 문서들을 확인
    console.log(doc.id, " => ", doc.data());
  });
  console.log(scoreSnapshot)
  return scoreSnapshot
}

export async function setScoreDocument(scoreData: ScoreData) {
  await setDoc(doc(db, "score", `${scoreData.conv_id}_${scoreData.turn_id}`), scoreData);
}

export async function editScoreDocument() {
  
}

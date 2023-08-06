import { db } from './db'
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { RationaleScore } from '@/constants/tabs'


export async function getScores(name: string) {
  const scoreCollection = collection(db, 'score')
  const scoreSnapshot = await getDocs(scoreCollection)

  const scoreList: RationaleScore[] = []
  scoreSnapshot.forEach((doc) => {
    // 가져온 모든 문서들을 확인
    if (doc.id.includes(name)) {
      console.log(doc.id, " => ", doc.data())
      scoreList.push(doc.data() as RationaleScore)
    }
  })
  console.log(scoreList)
  return scoreList
}

export async function setScoreDocument(scoreData: RationaleScore, name: string) {
  await setDoc(doc(db, "score", `${name}-${scoreData.id}`), scoreData)
  return await getScores(name)
}

export async function editScoreDocument() {
  
}

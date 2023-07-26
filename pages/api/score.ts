import fsPromises from 'fs/promises'

import { paths } from '@/constants/paths'
import { makeScoreScheme, ScoreData } from '../../src/utils/dialogue.utils'
import { Tab } from '@/constants/tabs'

interface ResponseBody {
  convId: number
  turnId: number
  qKey: string
  tab: Tab
  score: number
}

export default async function handler(req, res) {

  // if (req.method === 'GET') {
  //   // Read the existing data from the JSON file
  //   const scoreBuffer = await fsPromises.readFile(paths.SCORES)
  //   const scoreData = JSON.parse(scoreBuffer.toString())

  //   res.status(200).json(scoreData)

  // } else if (req.method === 'POST') {
  //   const scoreBuffer = await fsPromises.readFile(paths.SCORES)
  //   const scoreData: ScoreData[] = JSON.parse(scoreBuffer.toString())
  
  //   const { convId, turnId, qKey, tab, score }: ResponseBody = req.body

  //   const currentScoreData = scoreData.find(s => s.conv_id === convId && s.turn_id === turnId)
  
  //   if (currentScoreData) {
  //     const newScores = scoreData.map((_score: ScoreData) => {
  //       if (_score.conv_id === convId && _score.turn_id === turnId) {
  //         const questionScores = _score?.scores[qKey]
  //         const newQuestionScores = makeScoreScheme(score, tab, questionScores)
  //         _score.scores[qKey] = newQuestionScores
  //       }

  //       return _score
  //     })

  //     const updatedScores = JSON.stringify(newScores)
  //     await fsPromises.writeFile(paths.SCORES, updatedScores)
  //     res.status(200).json(newScores)

  //   } else {
  //     const newScoreData: ScoreData = {
  //       conv_id: convId,
  //       turn_id: turnId,
  //       scores: {
  //         [qKey]: {
  //           [Tab.USR]: -1,
  //           [Tab.BOTH]: -1,
  //           [Tab.GOLD]: -1,
  //           [Tab.FIVESHOT]: -1,
  //           [tab]: score
  //         }
  //       }
  //     }
  //     scoreData.push(newScoreData)
  //     const updatedScores = JSON.stringify(scoreData)
  //     await fsPromises.writeFile(paths.SCORES, updatedScores)
  //     res.status(200).json(scoreData)
  //   }
  // }
}

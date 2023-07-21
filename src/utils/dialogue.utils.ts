import { Tab } from "@/constants/tabs"

export interface Scores {
  [Tab.USR]: number
  [Tab.BOTH]: number
  [Tab.GOLD]: number
  [Tab.FIVESHOT]: number
  // baseline: number
}

export interface ScoreData {
  conv_id: number
  turn_id: number
  scores: {
    [questionKey: string]: {
      [Tab.USR]: number
      [Tab.BOTH]: number
      [Tab.GOLD]: number
      [Tab.FIVESHOT]: number
    }
  }
}

/**
 * scores.json 구조
 * 
 * conv_id
 * turn_id
 * scores: {
 *    question_key: {
 *        usr
 *        sys
 *        both
 *        gold
 *    }
 * }
 */
export function makeScoreScheme(score: number, tab: Tab, baseScores?: Scores) {
  return {
    [Tab.USR]: -1,
    [Tab.BOTH]: -1,
    [Tab.GOLD]: -1,
    [Tab.FIVESHOT]: -1,

    ...baseScores,
    [tab]: score,
  }
}

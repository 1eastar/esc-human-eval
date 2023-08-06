
export enum Tab {
  GPT4_GOLD = 'GPT4_GOLD',
  GPT4_COT = 'GPT4_COT',
  LM_COT = 'LM_COT',
  VL_COT = 'VL_COT',
}

export interface QuestionScore {
  key: string
  score: string
}

export interface TabScore {
  [Tab.GPT4_GOLD]: QuestionScore[]
  [Tab.GPT4_COT]: QuestionScore[]
  [Tab.LM_COT]: QuestionScore[]
  [Tab.VL_COT]: QuestionScore[]
}

export interface RationaleScore {
  id: number
  scores: TabScore
}

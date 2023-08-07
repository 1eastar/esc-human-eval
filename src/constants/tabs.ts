
export enum Tab {
  GPT4_GOLD = 'GPT4_GOLD',
  GPT4_COT = 'GPT4_COT',
  OPT_1B = 'OPT_1B',
  OPT_6B = 'OPT_6B',
  LLAMA2_7B = 'LLAMA2_7B',
  RESNET_LLAMA2 = 'RESNET_LLAMA2',
}

export interface QuestionScore {
  key: string
  score: string
}

export interface TabScore {
  [Tab.GPT4_GOLD]: QuestionScore[]
  [Tab.GPT4_COT]: QuestionScore[]
  [Tab.OPT_1B]: QuestionScore[]
  [Tab.OPT_6B]: QuestionScore[]
  [Tab.LLAMA2_7B]: QuestionScore[]
  [Tab.RESNET_LLAMA2]: QuestionScore[]
}

export interface RationaleScore {
  id: number
  scores: TabScore
}

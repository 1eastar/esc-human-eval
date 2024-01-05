
export enum Tab {
  GOLD = '1번 (Gold)',
  GPT_INITIAL = '2번 (GPT_initial)',
  GPT_DIRECT = '3번 (GPT_direct)',
  // GPT_REFEEL = '4번 (GPT_refeel)',
  // GPT_REFEELP = '5번 (GPT_refeel+)',
  LLAMA2_INITIAL = '6번 (LLaMA2_initial)',
  LLAMA2_DIRECT = '7번 (LLaMA2_direct)',
  // LLAMA2_REFEEL = '8번 (LLaMA2_refeel)',
  // LLAMA2_REFFELP = '9번 (LLaMA2_refeel+)',
}

export interface QuestionScore {
  key: string
  score: string
}

export interface TabScore {
  [Tab.GOLD]: QuestionScore[]
  [Tab.GPT_INITIAL]: QuestionScore[]
  [Tab.GPT_DIRECT]: QuestionScore[]
  // [Tab.GPT_REFEEL]: QuestionScore[]
  // [Tab.GPT_REFEELP]: QuestionScore[]
  [Tab.LLAMA2_INITIAL]: QuestionScore[]
  [Tab.LLAMA2_DIRECT]: QuestionScore[]
  // [Tab.LLAMA2_REFEEL]: QuestionScore[]
  // [Tab.LLAMA2_REFFELP]: QuestionScore[]
}

export interface SampleScore {
  id: number
  scores: TabScore
}

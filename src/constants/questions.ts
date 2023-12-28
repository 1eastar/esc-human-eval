
export interface Question {
  key: string
  content: string
}

export const Questions: Question[] = [
  {
    key: "0",
    content: "Understanding (strategy) : 해당 답변이 제시된 stage에 맞는 strategy를 선택했는가?",
  },
  {
    key: "1",
    content: "Understanding (utterance) : 해당 답변의 utterance가 제시된 stage의 목적에 부합하는가?",
  },
  {
    key: "2",
    content: "Alignment : 해당 답변의 utterance가 strategy에 알맞은 말을 하는가?",
  },
  {
    key: "3",
    content: "Acceptance : 해당 답변의 utterance를 seeker가 불편함(저항) 없이 받아들일 수 있는가?",
  },
  {
    key: "4",
    content: "Effectiveness: 해당 답변에서 utterance가 seeker의 부정적인 감정 상태나 태도를 경감시키거나 긍정적인 방향으로 바꾸는 데 효과가 있을 것으로 예상되는가?",
  },
  {
    key: "5",
    content: "Sensitivity : Seeker의 mood, needs, resource, culture, ethnicity, attitude 등을 고려한 utterance인가?",
  },
  {
    key: "6",
    content: "Consistency : 해당 답변의 utterance가 supporter의 관점에서 맥락에 맞는 일관된 태도(stance)를 갖는 발화인가?",
  },
]

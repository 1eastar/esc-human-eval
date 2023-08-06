
export interface Question {
  key: string
  content: string
}

export const Questions: Question[] = [
  {
    key: "0",
    content: "Consistency : Input 이랑 서로 연결이 되는지",
  },
  {
    key: "1",
    content: "Specificity : Does the rationale provide precise details about why the diagnosis were made?",
  },
  {
    key: "2",
    content: "Helpfulness : rationale 이 정답을 도출하는 데에 얼마나 도움이 되는지",
  },
  {
    key: "3",
    content: "임상적용 가능성: rationale의 임상 적용 가능성이 어느정도 되는지",
  },
]

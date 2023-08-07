
export interface Question {
  key: string
  content: string
}

export const Questions: Question[] = [
  {
    key: "0",
    content: "Consistency : 모델이 생성한 Rationale이 진단 결과까지 사고의 흐름이 얼마나 자연스러운지",
  },
  {
    key: "1",
    content: "Correctness : 모델이 생성한 Rationale의 각 과정이 얼마나 의학적으로 정확한지",
  },
  {
    key: "2",
    content: "Specificity : 모델이 생성한 Rationale이 얼마나 구체적인 정보를 제공하는지",
  },
  {
    key: "3",
    content: "Helpfulness : 모델이 생성한 Rationale이 실제 진단 결과를 얼마나 뒷받침하는지",
  },
  {
    key: "4",
    content: "Human-likeness: 모델이 생성한 Rationale이 얼마나 의사들과 유사한지",
  },
]

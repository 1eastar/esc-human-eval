
export interface Question {
  key: string
  content: string
}

export const Questions: Question[] = [
  {
    key: "0",
    content: "Do you think the ground-truth response requires theory of mind?",
  },
  {
    key: "1",
    content: "Does the inferred user ToM seem correct?",
  },
  {
    key: "2",
    content: "Does the inferred system ToM seem effective?",
  },
  {
    key: "3",
    content: "Is the response grounded to inferred ToM?",
  },
]

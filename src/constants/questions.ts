
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
  {
    key: "4",
    content: "Fluency: Which model’s response is more fluent?",
  },
  {
    key: "5",
    content: "Consistency: Which model’s response is more consistent with its role? Which model’s response is less self-contradictory?",
  },
  {
    key: "6",
    content: "Coherence: Which model’s response is more on-topic and in-depth? Which model’s response is more natural in topic transition?",
  },
  {
    key: "7",
    content: "Identification: Which model’s response is more skillful in identifying the user’s problem?",
  },
  {
    key: "8",
    content: "Comforting: Which model’s response is better at comforting the user?",
  },
  {
    key: "9",
    content: "Suggestion: Which model can give more helpful and informative suggestions?",
  },
  {
    key: "10",
    content: "Overall: Which model’s response is generally better?",
  },
]

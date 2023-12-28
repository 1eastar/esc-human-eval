import { Question } from "@/constants/questions"
import { styled } from "styled-components"


interface QuestionBoxProps {
  question: Question
  stage: string
  info: string
}

function QuestionBox({
  question,
  stage,
  info,
}: QuestionBoxProps) {

  return (
    <Container>
      { question.content.replace('제시된 stage', `${stage} stage`) }
      { info &&
        <Info>
          <Bold>Seeker&#39;s state</Bold>
          {info}
        </Info>
      }
    </Container>
  )
}

export default QuestionBox

const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
  min-width: 400px;
  max-width: 950px;
  padding: 20px 25px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgba(242, 242, 242, .5);
  border-radius: 12px;
  border: 0.2px solid rgba(242, 242, 242, .5);
  align-self: start;
  margin-left: 20px;
`

const Bold = styled.div`
  font-weight: bold;
`

const Info = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
  white-space: pre-wrap;
`

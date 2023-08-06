import { Question } from "@/constants/questions"
import { styled } from "styled-components"


interface QuestionBoxProps {
  question: Question
}

function QuestionBox({
  question,
}: QuestionBoxProps) {

  return (
    <Container>
      <Qmark>Q. &nbsp;</Qmark>
      { question.content }
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

const Qmark = styled.span`
  font-size: 18px;
  font-weight: bold;
`

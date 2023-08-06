import { Label } from "@/constants/lables"
import styled from "styled-components"
import DialogBox from "./DialogBox"

interface BaseInfoProps {
  patientData?: string
  label?: Label
}

function BaseInfo({
  patientData,
  label,
}: BaseInfoProps) {

  return (
    <Container>
      <DialogueHeader>
        <DialogueHeaderText>Patient Info</DialogueHeaderText>
        <DialogueHeaderText>Answer</DialogueHeaderText>
      </DialogueHeader>
        <DialogBox
          position='right'
          text={patientData ?? "-"}
        />
        <DialogBox
          position='left'
          text={label ?? "-"}
        />
    </Container>
  )
}

export default BaseInfo

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  width: 1000px;
  padding-top: 70px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const DialogueHeader = styled.div`
  width: 1000px;
  box-sizing: border-box;
  padding: 20px 40px;
  border-bottom: 1.5px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DialogueHeaderText = styled.div`
  font-size: 18px;
  font-weight: bold;
`

import { Label } from "@/constants/lables"
import { splitContext } from "@/utils/dialogue.utils"
import { makePatientDataSimple } from "@/utils/rationale.utils"
import { useMemo } from "react"
import styled from "styled-components"
import DialogBox from "./DialogBox"

interface BaseInfoProps {
  context?: string
}

function BaseInfo({
  context,
}: BaseInfoProps) {

  const splittedContext = useMemo(() => 
    splitContext(context ?? '-')
  , [context])

  return (
    <Container>
      <DialogueHeader>
        <DialogueHeaderText>Seeker</DialogueHeaderText>
        <DialogueHeaderText>Supporter</DialogueHeaderText>
      </DialogueHeader>
      {
        splittedContext.map(ctxEl => (
          <DialogBox
            key={ctxEl.response}
            position={ctxEl.speaker == 'seeker' ? 'left' : 'right'}
            text={ctxEl.response ?? "-"}
          />
        ))
      }
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

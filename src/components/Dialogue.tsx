import { useCallback, useMemo } from "react"
import styled from "styled-components"
import DialogBox from "./DialogBox"

export enum UttrType {
  SUPPORTER,
  SEEKER,
  NONE,
}

export interface Dialogue {
  conv_id: number
  turn_id: number
  context: string
  tom_usr?: string
  tom_sys?: string
  prediction?: string
  response?: string
  clean_prediction: string
  clean_response: string
  raw_prediction?: string
  metrics?: {
    Bleu_1: number
    Bleu_2: number
    Bleu_3: number
    Bleu_4: number
    METEOR: number
    ROUGE_L: number
    CIDEr: number
    SkipThoughtCS: number
    EmbeddingAverageCosineSimilarity: number
    EmbeddingAverageCosineSimilairty: number
    VectorExtremaCosineSimilarity: number
    GreedyMatchingScore: number
  }
  ft_prediction?: string
}

interface DialogueProps {
  dialogue?: Dialogue
}

function Dialogue({
  dialogue
}: DialogueProps) {

  const utterances = useMemo(() => (
    dialogue ? dialogue.context.split('\n').map(d => d.replace('[utterance]', "")) : []
  ), [dialogue])

  const utteranceType = useCallback((uttr: string): UttrType => {
    if (uttr.includes('supporter: ')) {
      return UttrType.SUPPORTER
    } else if (uttr.includes('seeker: ')) {
      return UttrType.SEEKER
    } else {
      return UttrType.NONE
    }
  }, [])

  return (
    <Container>
      <DialogueHeader>
        <DialogueHeaderText>User</DialogueHeaderText>
        <DialogueHeaderText>System</DialogueHeaderText>
      </DialogueHeader>
      { utterances.map(uttr => (
        <DialogBox
          key={uttr}
          type={utteranceType(uttr)}
          text={uttr}
        />
      ))}
    </Container>
  )
}

export default Dialogue

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  width: 1000px;
  padding-top: 100px;

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

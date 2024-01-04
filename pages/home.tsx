import fsPromises from 'fs/promises'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import Tabs from '@/components/Tabs'
import Indicator from '@/components/Indicator'
import { SampleScore, Tab, TabScore } from '@/constants/tabs'

import { paths } from '@/constants/paths'
import { getScores, setScoreDocument } from '@/api/db.api'
import { Label } from '@/constants/lables'
import { Questions } from '@/constants/questions'
import BaseInfo from '@/components/BaseInfo'

export interface ModelResponse {
  strg_pred: string
  res_pred: string
  feedback: string
}

export interface Sample {
  id: number
  start_turn: number
  end_turn: number
  total_len: number
  context: string
  stage: string
  state: string
  emotion_type: string
  problem_type: string
  situation: string
  Gold: ModelResponse
  GPT_initial: ModelResponse
  GPT_direct: ModelResponse
  GPT_refeel: ModelResponse
  GPT_refeelP: ModelResponse
  LLaMA2_initial: ModelResponse
  LLaMA2_direct: ModelResponse
  LLaMA2_refeel: ModelResponse
  LLaMA2_refeelP: ModelResponse
} 

interface HomeProps {
  samples: Sample[]
}

export default function Home({
  samples: _samples,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const [samples, setSamples] = useState<Sample[]>(_samples)
  const [scoreResult, setScoreResult] = useState<SampleScore[]>([])

  const [currentId, setCurrentId] = useState<string>("1")

  const name = router.query.name as string || "" 

  useEffect(() => {
    getScores(name)
      .then(list => {
        setScoreResult(list)
      })
  }, [name])

  const currentSample = useMemo(() => (
    samples.find(r => r.id === +currentId)
  ), [currentId, samples])

  const backgroundText = useMemo(() => (
    `The following is a conversation between a supporter and a seeker about ${currentSample?.emotion_type} regarding a/an ${currentSample?.problem_type}. The seeker says \"${currentSample?.situation}\"`
  ), [currentSample?.emotion_type, currentSample?.problem_type, currentSample?.situation])

  const currentScores: SampleScore = useMemo(() => (
    scoreResult.find(s => s.id === +currentId) || {
      "id": +currentId,
      "scores": {
        [Tab.GOLD]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.GPT_INITIAL]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.GPT_DIRECT]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.GPT_REFEEL]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.GPT_REFEELP]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.LLAMA2_INITIAL]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.LLAMA2_DIRECT]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.LLAMA2_REFEEL]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
        [Tab.LLAMA2_REFFELP]: Questions.map(q => ({
          key: q.key,
          score: "0",
        })),
      }
    } as SampleScore
  ), [currentId, scoreResult])

  const handleSearchId = useCallback((id: string) => {
    setCurrentId(id)
  }, [])

  const handleSubmit = useCallback(async (score: SampleScore) => {
    setScoreDocument(score, name)
      .then(scoreList => {
        setScoreResult(scoreList)
        alert('저장되었습니다.')
      })
      .catch(e => {
        console.log(e)
        alert('알 수 없는 오류가 발생했습니다. 문의 바랍니다.')
      })
  }, [name])

  return (
    <Container>
      <Indicator
        maxId={samples.length + ''}
        onSearch={handleSearchId}
      />
      <DialogueSlider>
        <BaseInfo
          background={backgroundText}
          context={currentSample?.context}
          // label={currentRationale?.org_label}
        />
      </DialogueSlider>
      <Tabs
        sample={currentSample}
        score={currentScores}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}


const Container = styled.div`
  width: 80vw;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`

const DialogueSlider = styled.div`
  display: flex;
  flex-direction: column;
`

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const buffer = await fsPromises.readFile(paths.DATA)

  const data = JSON.parse(buffer.toString())

  const results = {
    samples: data,
  }

  return { props: results  }
}

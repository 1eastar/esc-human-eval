import fsPromises from 'fs/promises'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Tabs from '@/components/Tabs'
import Indicator from '@/components/Indicator'
import { RationaleScore, Tab, TabScore } from '@/constants/tabs'

import { paths } from '@/constants/paths'
import { getScores, setScoreDocument } from '@/api/db.api'
import { Label } from '@/constants/lables'
import { Questions } from '@/constants/questions'
import BaseInfo from '@/components/BaseInfo'
import { useRouter } from 'next/router'

export interface Rationale {
  id: number
  patient_data: string
  label: Label
  gpt4_gold: string
  gpt4_CoT: string
  lm_CoT: string
  vl_CoT: string
} 

interface HomeProps {
  rationales: Rationale[]
}

export default function Home({
  rationales: _rationales,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const [rationales, setRationales] = useState<Rationale[]>(_rationales)
  const [scoreResult, setScoreResult] = useState<RationaleScore[]>([])

  const [currentId, setCurrentId] = useState<string>("1")

  const name = router.query.name as string || "" 

  useEffect(() => {
    getScores(name)
      .then(list => {
        setScoreResult(list)
      })
  }, [name])

  const currentRationale = useMemo(() => (
    rationales.find(r => r.id === +currentId)
  ), [currentId, rationales])

  const currentScores: RationaleScore = useMemo(() => (
    scoreResult.find(s => s.id === +currentId) || {
      "id": +currentId,
      "scores": {
        [Tab.GPT4_GOLD]: Questions.map(q => ({
          key: q.key,
          score: "-1",
        })),
        [Tab.GPT4_COT]: Questions.map(q => ({
          key: q.key,
          score: "-1",
        })),
        [Tab.LM_COT]: Questions.map(q => ({
          key: q.key,
          score: "-1",
        })),
        [Tab.VL_COT]: Questions.map(q => ({
          key: q.key,
          score: "-1",
        }))
      }
    } as RationaleScore
  ), [currentId, scoreResult])

  const handleSearchId = useCallback((id: string) => {
    setCurrentId(id)
  }, [])

  const handleSubmit = useCallback(async (score: RationaleScore) => {
    setScoreDocument(score, name)
      .then(scoreList => {
        setScoreResult(scoreList)
      })
  }, [])

  return (
    <Container>
      <Indicator
        maxId={rationales.length + ''}
        onSearch={handleSearchId}
      />
      <DialogueSlider>
        <BaseInfo
          patientData={currentRationale?.patient_data}
          label={currentRationale?.label}
        />
      </DialogueSlider>
      <Tabs
        rationale={currentRationale}
        score={currentScores}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}


const Container = styled.div`
  width: 80vw;
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
  const buffer = await fsPromises.readFile(paths.RATIOANLES)

  const data = JSON.parse(buffer.toString())

  const results = {
    rationales: data,
  }

  return { props: results  }
}

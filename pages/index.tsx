import fsPromises from 'fs/promises'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Dialogue, { Dialogue as DialogueInfo } from '@/components/Dialogue'
import { ScoreData } from '@/utils/dialogue.utils'
import Tabs, { TabContent } from '@/components/Tabs'
import Indicator from '@/components/Indicator'
import { Tab } from '@/constants/tabs'

import { paths } from '@/constants/paths'
import { getScores, setScoreDocument } from '@/api/db.api'

interface HomeProps {
  fiveShot: DialogueInfo[]
  usr: DialogueInfo[]
  both: DialogueInfo[]
}

export default function Home({
  fiveShot,
  usr,
  both,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [fiveShotResult, setFiveShotResult] = useState<DialogueInfo[]>(fiveShot)
  const [usrResult, setUsrResult] = useState<DialogueInfo[]>(usr)
  const [bothResult, setBothResult] = useState<DialogueInfo[]>(both)
  const [scoreResult, setScoreResult] = useState<ScoreData[]>([])

  const [currentConvId, setCurrentConvId] = useState<string>("31")
  const [currentTurnId, setCurrentTurnId] = useState<string>("6")

  useEffect(() => {
    getScores()
      .then(list => {
        setScoreResult(list)
      })
  }, [])

  const idList = useMemo(() => {
    const _idList: { [convId: string]: string[] } = {}
    usrResult.forEach(res => {
      if (!Object.hasOwn(_idList, res.conv_id.toString())) {
        _idList[res.conv_id.toString()] = []
      }
      _idList[res.conv_id.toString()].push(res.turn_id.toString())
    })
    return _idList
  }, [usrResult])

  const currentDialogue = useMemo(() => (
    usrResult.find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)
  ), [currentConvId, currentTurnId, usrResult])

  const currentUsrToM = useMemo(() => (
    usrResult.find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.tom_usr
  ), [currentConvId, currentTurnId, usrResult])

  const currentBothToM: [string | undefined, string | undefined] = useMemo(() => ([
    bothResult.find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.tom_usr,
    bothResult.find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.tom_sys,
  ]), [currentConvId, currentTurnId, bothResult])

  const currentUsrResponse = useMemo(() => (
    usrResult
      .find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.clean_prediction
  ), [currentConvId, currentTurnId, usrResult])

  const currentFiveShotResponse = useMemo(() => (
    fiveShotResult
      .find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.clean_prediction
  ), [currentConvId, currentTurnId, fiveShotResult])

  const currentBothResponse = useMemo(() => (
    bothResult
      .find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.clean_prediction
  ), [currentConvId, currentTurnId, bothResult])

  const currentGoldResponse = useMemo(() => (
    usrResult
      .find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.clean_response
  ), [currentConvId, currentTurnId, usrResult])

  // const currentBaselineResponse = useMemo(() => (
  //   usrResult
  //     .find(res => res.conv_id === currentConvId && res.turn_id === currentTurnId)?.prediction
  // ), [currentConvId, currentTurnId, usrResult])

  const currentScores = useMemo(() => (
    scoreResult.find(s => s.conv_id.toString() === currentConvId && s.turn_id.toString() === currentTurnId)
  ), [currentConvId, currentTurnId, scoreResult])

  const handleMatchTab = useCallback((tab: Tab): TabContent => {
    if (tab === Tab.USR) {
      return {
        usrToM: currentUsrToM,
        sysToM: "-",
        response: currentUsrResponse,
      }
    } else if (tab === Tab.FIVESHOT) {
      return {
        usrToM: "-",
        sysToM: "-",
        response: currentFiveShotResponse,
      }
    } else if (tab === Tab.BOTH) {
      return {
        usrToM: currentBothToM?.[0] ?? "-",
        sysToM: currentBothToM?.[1] ?? "-",
        response: currentBothResponse,
      }
    } else if (tab === Tab.GOLD) {
      return {
        usrToM: "-",
        sysToM: "-",
        response: currentGoldResponse,
      }
    } else {
      return {}
    }
  }, [
    currentUsrToM,
    currentUsrResponse,
    currentFiveShotResponse,
    currentBothToM,
    currentBothResponse,
    currentGoldResponse,
  ])

  const handleSearchId = useCallback((convId: string, turnId: string) => {
    const convIds = usrResult.map(d => d.conv_id + '')

    if (convIds.includes(convId)) {
      const turnIds = usrResult.filter(d => d.conv_id.toString() === convId).map(d => d.turn_id + '')

      if (turnIds.includes(turnId)) {
        setCurrentConvId(convId)
        setCurrentTurnId(turnId)
      }
    }
  }, [usrResult])

  const handleSubmit = useCallback(async (tab: Tab, qKey: string, score: number) => {
    if (!Object.keys(idList).includes(currentConvId) || !idList[currentConvId].includes(currentTurnId)) {
      alert('conv_id 또는 turn_id가 잘못되었습니다.')

    } else {
      const newScoreData: ScoreData = currentScores
        ? JSON.parse(JSON.stringify(currentScores))
        : {
            "conv_id": +currentConvId,
            "turn_id": +currentTurnId,
            "scores": {
              [qKey]: {
                [Tab.USR]: -1,
                [Tab.BOTH]: -1,
                [Tab.GOLD]: -1,
                [Tab.FIVESHOT]: -1,
              }
            }
          }
      console.log(newScoreData)
      newScoreData.scores[qKey][tab] = score
      console.log(newScoreData)
      setScoreDocument(newScoreData)
      // await fetch(basePath +'/api/score', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // })
      // .then(res => {
      //   if (res.status !== 200) {
      //     throw new Error('status is not 200')
      //   }
      //   return res
      // })
      // .then(res => res.json())
      // .then(res => {
      //   setScoreResult(res)
      // })
    }

  }, [currentConvId, currentScores, currentTurnId, idList])

  return (
    <Container>
      <DialogueSlider>
        <Dialogue
          dialogue={currentDialogue}
        />
        <Indicator
          idList={idList}
          onSearch={handleSearchId}
        />
      </DialogueSlider>
      <Tabs
        onMatchTab={handleMatchTab}
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
  align-items: start;
  gap: 150px;
  height: 50vh;
`

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const FiveShotBuffer = await fsPromises.readFile(paths.FiveShot)
  const UsrBuffer = await fsPromises.readFile(paths.USR)
  const BothBuffer = await fsPromises.readFile(paths.BOTH)

  const FiveShotData = JSON.parse(FiveShotBuffer.toString())
  const UsrData = JSON.parse(UsrBuffer.toString())
  const BothData = JSON.parse(BothBuffer.toString())

  const results = {
    fiveShot: FiveShotData,
    usr: UsrData,
    both: BothData
  }

  return { props: results  }
}

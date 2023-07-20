import fsPromises from 'fs/promises'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Dialogue, { Dialogue as DialogueInfo } from '@/components/Dialogue'
import { ScoreData } from '@/utils/dialogue.utils'
import Tabs from '@/components/Tabs'
import Indicator from '@/components/Indicator'
import { Tab } from '@/constants/tabs'

import { paths } from '@/constants/paths'

const path = process.env.NODE_ENV == 'production' ? 'https://es-human-eval.vercel.app' : 'http://0.0.0.0:3000'

interface HomeProps {
  usr: DialogueInfo[]
  sys: DialogueInfo[]
  both: DialogueInfo[]
}

export default function Home({
  usr,
  sys,
  both,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [usrResult, setUsrResult] = useState<DialogueInfo[]>(usr)
  const [sysResult, setSysResult] = useState<DialogueInfo[]>(sys)
  const [bothResult, setBothResult] = useState<DialogueInfo[]>(both)
  const [scoreResult, setScoreResult] = useState<ScoreData[]>([])

  const [currentConvId, setCurrentConvId] = useState<string>("10")
  const [currentTurnId, setCurrentTurnId] = useState<string>("6")

  useEffect(() => {
    fetch(`${path}/api/score`)
      .then(res => res.json())
      .then(res => setScoreResult(res))
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

  const currentSysToM = useMemo(() => (
    sysResult.find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.tom_sys
  ), [currentConvId, currentTurnId, sysResult])

  const currentBothToM: [string | undefined, string | undefined] = useMemo(() => ([
    bothResult.find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.tom_usr,
    bothResult.find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.tom_sys,
  ]), [currentConvId, currentTurnId, bothResult])

  const currentUsrResponse = useMemo(() => (
    usrResult
      .find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.clean_prediction
  ), [currentConvId, currentTurnId, usrResult])

  const currentSysResponse = useMemo(() => (
    sysResult
      .find(res => res.conv_id.toString() === currentConvId && res.turn_id.toString() === currentTurnId)?.clean_prediction
  ), [currentConvId, currentTurnId, sysResult])

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
      const data = {
        convId: +currentConvId,
        turnId: +currentTurnId,
        qKey,
        tab,
        score,
      }
      
      await fetch(path +'/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('status is not 200')
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        setScoreResult(res)
      })
    }

  }, [currentConvId, currentTurnId, idList])

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
        usrToM={currentUsrToM}
        sysToM={currentSysToM}
        bothToM={currentBothToM}
        usrToMResponse={currentUsrResponse}
        sysToMResponse={currentSysResponse}
        bothToMResponse={currentBothResponse}
        goldResponse={currentGoldResponse}
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
  // Read the existing data from the JSON file
  const UsrBuffer = await fsPromises.readFile(paths.USR)
  const SysBuffer = await fsPromises.readFile(paths.SYS)
  const BothBuffer = await fsPromises.readFile(paths.BOTH)

  const UsrData = JSON.parse(UsrBuffer.toString())
  const SysData = JSON.parse(SysBuffer.toString())
  const BothData = JSON.parse(BothBuffer.toString())

  const results = {
    usr: UsrData,
    sys: SysData,
    both: BothData
  }

  return { props: results  }
}

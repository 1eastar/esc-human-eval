import { Question, Questions } from "@/constants/questions"
import { RationaleScore, Tab } from "@/constants/tabs"
import Overlay, { OverlayPosition } from "@/elements/Overlay"
import Image from "next/image"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { css, keyframes, styled } from "styled-components"
import { Rationale } from "../../pages"
import AnswerBox from "./AnswerBox"
import OverlayListItem from "./OverlayListItem"
import QuestionBox from "./QuestionBox"

interface TabsProps {
  rationale?: Rationale
  score: RationaleScore
  onSubmit: (score: RationaleScore) => void
}

const tabFieldMatch = {
  [Tab.GPT4_GOLD]: 'gpt4_gold',
  [Tab.GPT4_COT]: 'gpt4_CoT',
  [Tab.LM_COT]: 'lm_CoT',
  [Tab.VL_COT]: 'vl_CoT',
}

function Tabs({
  rationale,
  score,
  onSubmit,
}: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overleyRef = useRef<HTMLDivElement>(null)

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.GPT4_GOLD)
  const [showTabSelectOverlay, setShowTabSelectOverlay] = useState(false)

  const [tmpScore, setTmpScore] = useState<RationaleScore>(score)

  useEffect(() => {
    setTmpScore(score)
  }, [rationale, score])

  const handleClickDropDown = useCallback(() => {
    setShowTabSelectOverlay(prev => !prev)
  }, [])

  const renderTabHeader = useCallback((text: string) => (
    <TabHeader
      key={text}
      ref={overleyRef}
    >
      { text }
      <DropDownIcon
        src="/dropdown.png"
        alt="dropdown"
        width={15}
        height={15}
        onClick={handleClickDropDown}
        $isOpen={showTabSelectOverlay}
      />
    </TabHeader>
  ), [handleClickDropDown, showTabSelectOverlay])

  const renderTabRationale = useCallback(() => (
    <TabContentBox>
      { rationale?.[tabFieldMatch[currentTab]] }
    </TabContentBox>
  ), [currentTab, rationale])

  const getQuestionScores = useCallback((qKey: string) => (
    score.scores[currentTab].find(s => s.key === qKey)?.score || "-1"
  ), [currentTab, score?.scores])

  const handleClickOverlayElement = useCallback((tab: Tab) => () => {
    setShowTabSelectOverlay(false)
    setCurrentTab(tab)
  }, [])

  const handleChangeInput = useCallback((qKey: string, score: string) => {
    const newScore = JSON.parse(JSON.stringify(tmpScore))   // deep copy
    newScore.scores[currentTab][+qKey].score = score
    setTmpScore(newScore)
  }, [currentTab, tmpScore])

  const handleSubmit = useCallback(() => {
    onSubmit(tmpScore)
  }, [onSubmit, tmpScore])
  
  return (
    <>
      { showTabSelectOverlay && <OverlayBG onClick={() => setShowTabSelectOverlay(false)}/>}
      <HeaderWrapper ref={containerRef}>
        { renderTabHeader(currentTab) }
      </HeaderWrapper>
      <ContentWrapper>
        <ContentRow>
          { renderTabRationale() }
        </ContentRow>
      </ContentWrapper>
      <QAContainer>
        { Questions.map(q => (
          <QA key={`${rationale?.id}-${currentTab}-${q.key}=${getQuestionScores(q.key)}`}>
            <QuestionBox question={q} />
            <AnswerBox
              questionKey={q.key}
              onChangeInput={handleChangeInput}
              score={getQuestionScores(q.key)}
            />
          </QA>
        ))}
        <SubmitButton
          onClick={handleSubmit}
        >
          저장
        </SubmitButton>
      </QAContainer>


      <Overlay
        show={showTabSelectOverlay}
        target={overleyRef.current}
        container={containerRef.current}
        placement={OverlayPosition.BOTTOM}
        rootClose
      >
        <OverlayContainer>
          { Object.values(Tab).map(t => (
            <OverlayListItem
              key={t}
              text={t}
              onClick={handleClickOverlayElement(t)}
            />
          ))}
        </OverlayContainer>
      </Overlay>
    </>
  )
}

export default Tabs

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  border-bottom: 1px solid rgb(229 231 235);
  width: 100%;
`

const ContentWrapper = styled.pre`
  margin-top: 10px;
  align-self: start;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
  font-size: 17px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`

const ContentRow = styled.div`
  display: flex;
  align-items: start;
  gap: 50px;
`

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in-out;
  font-weight: bold;
  cursor: default;

  &:hover {
    background-color: rgba(242, 242, 242, .5);
    border-bottom: 2px solid rgb(183, 206, 241);
  }
`

const TabContentBox = styled.div`
  border-radius: 8px;
  /* border: 3px solid rgba(217, 227, 242, 1); */
  border: 3px solid rgba(242, 242, 242, 1);
  background-color: rgba(242, 242, 242, .5);
  padding: 20px 25px;
  display: flex;
  align-items: center;
  width: 100%;
  word-break: break-word;
  font-size: 18px;
`

const QAContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const QA = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const DropDownIcon = styled(Image)<{ $isOpen?: boolean }>`
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-left: 10px;
  padding: 1px;

  &:hover {
    background-color: rgba(212, 212, 212, 1);

  }

  ${props =>
    props.$isOpen
    ? css`
      transform: rotate(180deg);
    `
    : css`
      transform: rotate(0deg);
    `
  }
`

const show = keyframes`
	0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const OverlayContainer = styled.div`
  width: 300px;
  min-height: 120px;
  max-height: 400px;
  overflow-y: scroll;
  background-color: white;
  border-radius: 12px;
  border: 2px solid rgba(242, 242, 242, 1);
  animation: ${show} .3s;
  z-index: 1100;

  &::-webkit-scrollbar {
    display: none;
  }
`

const OverlayBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: rgba(0, 0, 0, .05); */
`

const SubmitButton = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 12px;
  border: 2px solid rgba(242, 242, 242, 1);
  align-self: flex-end;
  transition: all .3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(242, 242, 242, .5);
    border: 2px solid rgb(183, 206, 241);
  }
`

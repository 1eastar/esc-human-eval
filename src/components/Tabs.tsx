import { Question, Questions } from "@/constants/questions"
import { Tab } from "@/constants/tabs"
import Overlay, { OverlayPosition } from "@/elements/Overlay"
import { ScoreData } from "@/utils/dialogue.utils"
import Image from "next/image"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { css, keyframes, styled } from "styled-components"
import AnswerBox from "./AnswerBox"
import OverlayListItem from "./OverlayListItem"
import QuestionBox from "./QuestionBox"

export interface TabContent {
  usrToM?: string
  sysToM?: string
  response?: string
}

interface TabsProps {
  score?: ScoreData
  onSubmit: (tab: Tab, qKey: string, score: number) => void
  onMatchTab: (tab: Tab) => TabContent
}

function Tabs({
  score,
  onSubmit,
  onMatchTab,
}: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overleyRef = useRef<(HTMLDivElement | null)[]>([])

  const [leftTab, setLeftTab] = useState<Tab>(Tab.USR)
  const [rightTab, setRightTab] = useState<Tab>(Tab.GOLD)

  const [showTabSelectOverlay, setShowTabSelectOverlay] = useState(false)
  const [focusedTab, setFocusedTabIndex] = useState<number>(-1)   // 0: left tab, 1: right tab

  const handleClickDropDown = useCallback((idx: number) => () => {
    setShowTabSelectOverlay(prev => !prev)
    setFocusedTabIndex(idx)
  }, [])

  const renderTabHeader = useCallback((positionIdx: number, text: string) => (
    <TabHeader
      key={positionIdx}
      ref={ref => overleyRef.current[positionIdx] = ref}
    >
      { text }
      <DropDownIcon
        src="/dropdown.png"
        alt="dropdown"
        width={15}
        height={15}
        onClick={handleClickDropDown(positionIdx)}
        $isOpen={showTabSelectOverlay && focusedTab === positionIdx}
      />
    </TabHeader>
  ), [focusedTab, handleClickDropDown, showTabSelectOverlay])

  const getQuestionScores = useCallback((q: Question) => [
    score?.scores?.[q.key]?.[leftTab].toString() || "-1",
    score?.scores?.[q.key]?.[rightTab].toString() || "-1",
  ], [leftTab, rightTab, score?.scores])

  const TabHeaders = useMemo(() => [
    renderTabHeader(0, leftTab), renderTabHeader(1, rightTab)
  ], [leftTab, renderTabHeader, rightTab])

  const TabContents: TabContent[] = useMemo(() => [
    onMatchTab(leftTab), onMatchTab(rightTab)
  ], [onMatchTab, leftTab, rightTab])

  const handleClickOverlayElement = useCallback((tab: string) => {
    if (focusedTab === 0) setLeftTab(tab as Tab)
    else setRightTab(tab as Tab)

    setShowTabSelectOverlay(false)
  }, [focusedTab])

  const handleSubmit = useCallback((qKey: string, idx: number) => (score: string) => {
    if (idx === 0) {
      onSubmit(leftTab, qKey, +score)
    } else {
      onSubmit(rightTab, qKey, +score)
    }
  }, [leftTab, onSubmit, rightTab])
  
  return (
    <>
      { showTabSelectOverlay && <OverlayBG onClick={() => setShowTabSelectOverlay(false)}/>}
      <HeaderWrapper ref={containerRef}>
        { TabHeaders }
      </HeaderWrapper>
      <ContentWrapper>
        <ContentRow>
          { TabContents.map((tab, i) => (
            <TabUsrContentBox key={`${i}-${tab.response}`}>{ tab.usrToM }</TabUsrContentBox>
          ))}
        </ContentRow>
        <ContentRow>
          { TabContents.map((tab, i) => (
            <TabSysContentBox key={`${i}-${tab.response}`}>{ tab.sysToM }</TabSysContentBox>
          ))}
        </ContentRow>
        <ContentRow>
          { TabContents.map((tab, i) => (
            <TabResponseContentBox key={`${i}-${tab.response}`}>
              { tab.response }
            </TabResponseContentBox>
          ))}
        </ContentRow>
      </ContentWrapper>
      <QAContainer>
        { Questions.map(q => (
          <QA key={q.key}>
            <QuestionBox question={q} />
            <Awrapper>
              <AnswerBox
                score={getQuestionScores(q)[0]}
                onSubmit={handleSubmit(q.key, 0)}
              />
              <AnswerBox
                score={getQuestionScores(q)[1]}
                onSubmit={handleSubmit(q.key, 1)}
              />
            </Awrapper>
          </QA>
        ))}
      </QAContainer>


      <Overlay
        show={showTabSelectOverlay}
        target={overleyRef.current[focusedTab]}
        container={containerRef.current}
        placement={OverlayPosition.BOTTOM}
        rootClose
      >
        <OverlayContainer>
          { Object.values(Tab).map(t => (
            <OverlayListItem
              key={t}
              text={t}
              onClick={handleClickOverlayElement}
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
  width: 50%;
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

const TabUsrContentBox = styled.div`
  border-radius: 8px;
  border: 3px solid rgba(225, 240, 217, 1);
  background-color: rgba(242, 242, 242, .5);
  padding: 20px 25px;
  display: flex;
  align-items: center;
  width: 50%;
  word-break: break-word;
`

const TabSysContentBox = styled.div`
  border-radius: 8px;
  border: 3px solid rgba(217, 227, 242, 1);
  background-color: rgba(242, 242, 242, .5);
  padding: 20px 25px;
  display: flex;
  align-items: center;
  width: 50%;
  word-break: break-word;
`

const TabResponseContentBox = styled.div`
  border-radius: 8px;
  border: 3px solid rgba(242, 242, 242, 1);
  background-color: rgba(242, 242, 242, .5);
  padding: 20px 25px;
  display: flex;
  align-items: center;
  width: 50%;
  word-break: break-word;
`

const QAContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const QA = styled.div<{ $isAll?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  ${props =>
    props.$isAll
      ? css`
        flex-direction: column;
      `
      : css``
  }
`

const Awrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
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
      transform: rotate(0deg);
    `
    : css`
      transform: rotate(180deg);
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

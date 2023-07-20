import { useCallback, useMemo, useState } from "react"
import { styled } from "styled-components"
import SelectOverlayInput from "./SelectOverlayInput"


interface IndicatorProps {
  idList: {
    [convId: string]: string[]
  }
  onSearch: (convId: string, turnId: string) => void
}

function Indicator({
  idList,
  onSearch,
}: IndicatorProps) {
  const [convId, setConvId] = useState("10")
  const [turnId, setTurnId] = useState("6")

  const convIdList = useMemo(() => (
    Object.keys(idList)
  ), [idList])

  const handleSelectConvId = useCallback((id: string) => {
    setConvId(id)
    // convId를 선택하면 turnId를 새로 지정해줘야 함.
    setTurnId("")
  }, [])
  
  const turnIdList = useMemo(() => (
    idList[convId]
  ), [convId, idList])

  const handleSelectTurnId = useCallback((id: string) => {
    setTurnId(id)

    onSearch(convId, id)
  }, [convId, onSearch])

  const handleClickPrev = useCallback(() => {
    const turnIdList = idList[convId]
    let convIdIndex = Object.keys(idList).findIndex(id => id === convId)
    let turnIdIndex = turnIdList.findIndex(id => id === turnId)

    if (turnIdIndex === 0) {
      if (convIdIndex === 0) {
        alert('처음입니다.')
      } else {
        convIdIndex -= 1
        const newConvId = Object.keys(idList)[convIdIndex]
        const newTurnId = idList[newConvId][idList[newConvId].length - 1]
        setConvId(newConvId)
        setTurnId(newTurnId)

        onSearch(newConvId, newTurnId)
      }
    } else {
      turnIdIndex -= 1
      setTurnId(turnIdList[turnIdIndex])

      onSearch(convId, turnIdList[turnIdIndex])
    }
  }, [convId, idList, onSearch, turnId])

  const handleClickNext = useCallback(() => {
    const turnIdList = idList[convId]
    let convIdIndex = Object.keys(idList).findIndex(id => id === convId)
    let turnIdIndex = turnIdList.findIndex(id => id === turnId)

    if (turnIdIndex + 1 === turnIdList.length) {
      if (convIdIndex + 1 === Object.keys(idList).length) {
        alert('마지막입니다.')
      } else {
        turnIdIndex = 0
        convIdIndex += 1
        const newConvId = Object.keys(idList)[convIdIndex]
        const newTurnId = idList[newConvId][0]
        setConvId(newConvId)
        setTurnId(newTurnId)

        onSearch(newConvId, newTurnId)
      }
    } else {
      turnIdIndex += 1
      setTurnId(turnIdList[turnIdIndex])

      onSearch(convId, turnIdList[turnIdIndex])
    }
    
  }, [convId, idList, onSearch, turnId])

  return (
    <Container>
      <ArrowIndicatorWrapper>
        <ArrowIndicator
          onClick={handleClickPrev}
        >
          &lt;&nbsp;이전
        </ArrowIndicator>
        <ArrowIndicator
          onClick={handleClickNext}
        >
          다음&nbsp;&gt;
        </ArrowIndicator>
      </ArrowIndicatorWrapper>
      <SearchWrapper>
        <SelectOverlayInput
          defaultValue={convId}
          idList={convIdList}
          onClickItem={handleSelectConvId}
        />
        <SelectOverlayInput
          defaultValue={turnId}
          idList={turnIdList}
          onClickItem={handleSelectTurnId}
        />
      </SearchWrapper>
    </Container>
  )
}

export default Indicator

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 60px;
  gap: 30px;
`

const ArrowIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: end;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
`

const ArrowIndicator = styled.div`
  width: 80px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: rgba(212, 212, 212, .3);
  cursor: pointer;
  user-select: none;
`


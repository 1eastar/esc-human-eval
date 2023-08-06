import { useCallback, useMemo, useState } from "react"
import { styled } from "styled-components"
import SelectOverlayInput from "./SelectOverlayInput"


interface IndicatorProps {
  maxId: string
  onSearch: (id: string) => void
}

function Indicator({
  maxId,
  onSearch,
}: IndicatorProps) {
  const [id, setId] = useState("1")

  const handleClickPrev = useCallback(() => {
    if (id === "1") {
        alert('처음입니다.')
    } else {
      const nextId = (+id - 1) + ''
      setId(nextId)

      onSearch(nextId)
    }
  }, [id, onSearch])

  const handleClickNext = useCallback(() => {
    if (+id >= +maxId) {
      console.log(id, maxId)
      alert('마지막입니다.')
    } else {
      const prevId = (+id + 1) + ''
      setId(prevId)
      console.log(prevId, maxId)
      onSearch(prevId)
    }
  }, [id, maxId, onSearch])

  return (
    <Container>
      <ArrowIndicator
        onClick={handleClickPrev}
      >
        &lt;&nbsp;이전
      </ArrowIndicator>
      <SelectOverlayInput
        defaultValue={id}
        maxId={maxId}
      />
      <ArrowIndicator
        onClick={handleClickNext}
      >
        다음&nbsp;&gt;
      </ArrowIndicator>
    </Container>
  )
}

export default Indicator

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  gap: 30px;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255);
  box-shadow: 0px -35px 30px 18px rgba(0, 0, 0, .4);
  z-index: 100000;
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


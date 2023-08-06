import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback, useMemo, useState } from "react"
import { css, styled } from "styled-components"
import SelectOverlayInput from "./SelectOverlayInput"


interface IndicatorProps {
  maxId: string
  onSearch: (id: string) => void
}

function Indicator({
  maxId,
  onSearch,
}: IndicatorProps) {
  const router = useRouter()

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

  const handleClickBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Container>
      <BackButton
        src='/leftarrow2.png'
        alt='leftarrow'
        width={30}
        height={30}
        onClick={handleClickBack}
      />
      <IndicatorWrapper>
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
      </IndicatorWrapper>
      <Wrapper>
        <Input disabled value={router.query.name || ""}/>
      </Wrapper>
    </Container>
  )
}

export default Indicator

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255);
  box-shadow: 0px -35px 30px 18px rgba(0, 0, 0, .4);
  z-index: 100000;
`

const IndicatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;

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

const BackButton = styled(Image)`
  margin-left: 30px;
  cursor: pointer;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 50px;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 10px 20px;
`

const Input = styled.input`
  outline: none;
  text-decoration: none;
  border: none;
  margin: 0 15px;
  width: 100px;
  text-align: center;
`

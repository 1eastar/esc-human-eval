import Overlay, { OverlayPosition } from "@/elements/Overlay"
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled, { keyframes } from "styled-components"
import { css } from "styled-components"
import OverlayListItem from "./OverlayListItem"


interface SelectOverlayInputProps {
  defaultValue: string
  idList: string[]
  onClickItem: (id: string) => void
}

function SelectOverlayInput({
  defaultValue,
  idList,
  onClickItem,
}: SelectOverlayInputProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLInputElement>(null)

  const [search, setSearch] = useState(defaultValue)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  useEffect(() => {
    setSearch(defaultValue)
  }, [defaultValue])

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleClickItem = useCallback((id: string) => () => {
    onClickItem(id)
    setShowOverlay(false)
  }, [onClickItem])

  const onFocusInput = useCallback(() => {
    setShowOverlay(true)
    setIsInputFocused(true)
  }, [])

  const onBlurInput = useCallback(() => {
    setIsInputFocused(false)
  }, [])

  const searchedIdList = useMemo(() => (
    idList.map(id => id + '').filter(id => id.includes(search + '')).map(id => +id)
  ), [idList, search])

  return (
    <>
      { showOverlay && <OverlayBG onClick={() => setShowOverlay(false)}/>}
      <Wrapper ref={targetRef} $isFocused={isInputFocused}>
        <Input
          value={search}
          onChange={handleChangeInput}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
      </Wrapper>

      <Overlay
        show={showOverlay}
        // container={containerRef.current}
        target={targetRef.current}
        placement={OverlayPosition.BOTTOM}
      >
        <OverlayContainer>
          { searchedIdList.map(id => (
            <OverlayListItem
              key={id}
              text={id + ''}
              onClick={handleClickItem(id + '')}
            />
          ))}
        </OverlayContainer>
      </Overlay>
    </>
  )
}

export default SelectOverlayInput

const Wrapper = styled.div<{ $isFocused?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 50px;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 10px 20px;

  ${props => props.$isFocused
    ? css`
      border: 2.5px solid rgb(183, 206, 241);
    `
    : css`
      border: 2.5px solid rgba(212, 212, 212, 1);
    `
  }
`

const Input = styled.input`
  outline: none;
  text-decoration: none;
  border: none;
  margin: 0 15px;
  width: 100px;
  text-align: center;
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
  width: 150px;
  min-height: 120px;
  max-height: 400px;
  overflow-y: scroll;
  background-color: white;
  border-radius: 12px;
  border: 2px solid rgba(242, 242, 242, 1);
  animation: ${show} .3s;
  z-index: 1100;
  margin-top: 3px;

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

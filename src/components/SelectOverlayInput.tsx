import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { css } from "styled-components"


interface SelectOverlayInputProps {
  defaultValue: string
  maxId: string
  onSearch: (id: string) => void
}

function SelectOverlayInput({
  defaultValue,
  maxId,
  onSearch,
}: SelectOverlayInputProps) {

  const [search, setSearch] = useState(defaultValue)
  const [isInputFocused, setIsInputFocused] = useState(false)

  useEffect(() => {
    setSearch(defaultValue)
  }, [defaultValue])

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // if (+e.target.value > +maxId) {
    //   alert(`${maxId}까지 입력 가능합니다.`)
    // } else {
      setSearch(e.target.value)
    // }
  }, [])
  
  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      if (+search > +maxId) {
        alert(`${maxId}까지 입력 가능합니다.`)
      } else {
        onSearch(search)
      }
    }
  }, [maxId, onSearch, search])

  const onFocusInput = useCallback(() => {
    setIsInputFocused(true)
  }, [])

  const onBlurInput = useCallback(() => {
    setIsInputFocused(false)
  }, [])

  return (
    <Wrapper $isFocused={isInputFocused}>
      <Input
        value={search}
        onChange={handleChangeInput}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onKeyPress={handleKeyPress}
      />
    </Wrapper>
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


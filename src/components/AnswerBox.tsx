import Image from "next/image"
import React, { KeyboardEvent, ChangeEvent, useCallback, useMemo, useState, useRef } from "react"
import { css, styled } from "styled-components"

interface AnswerBoxProps {
  score: string
  onSubmit: (score: string) => void
}

function AnswerBox({
  score,
  onSubmit,
}: AnswerBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [focused, setFocused] = useState<boolean>(false)
  const [value, setValue] = useState(+score)

  const handleInputKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setFocused(false)
      onSubmit(value.toString())
    }
  }, [onSubmit, value])

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value)
  }, [])

  const handleClickBox = useCallback(() => {
    setFocused(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const InputBox = useMemo(() => {
    if (focused) {
      return (
        <InputContainer>
          <Input
            ref={inputRef}
            type="number"
            min={-1}
            max={5}
            step={1}
            defaultValue={value}
            onKeyPress={handleInputKeyPress}
            onChange={handleChangeInput}
            onBlur={handleBlur}
          />
        </InputContainer>
      )
    } else {
      return (
        <InputContainer>
          &nbsp;&nbsp;{ score }
          {/* <Image
            src="/edit.png"
            alt="edit"
            width={20}
            height={20}
            onClick={handleClickEdit}
          /> */}
        </InputContainer>
      )
    }
  }, [focused, handleBlur, handleChangeInput, handleInputKeyPress, score, value])

  return (
    <Container
      onClick={handleClickBox}
      $yet={value === -1}
    >
      <Amark>A. &nbsp;</Amark>
      { InputBox }
    </Container>
  )
}

export default AnswerBox

const Container = styled.div<{ $yet: boolean }>`
  height: 100%;
  box-sizing: border-box;
  width: 150px;
  padding: 15px 25px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 12px;
  border: 0.2px solid rgba(242, 242, 242, .5);
  display: flex;
  flex-direction: row;
  align-items: center;

  ${props => props.$yet
    ? css`
      background-color: rgba(242, 242, 242, .5);
    `
    : css`
      background-color: rgba(242, 242, 242, .5);
    `
  }
`

const Amark = styled.span`
  font-size: 18px;
  font-weight: bold;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
`

const Input = styled.input`
  text-decoration: none;
  border: none;
  width: 50px;
  height: 30px;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  border-radius: 6px;
  padding-left: 10px;
  padding-right: 5px;

  &:focus {
    border: 1px solid rgb(183, 206, 241);
    outline: none;
  }
`

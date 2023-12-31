import Image from "next/image"
import { useCallback, useMemo } from "react"
import { css, styled } from "styled-components"

type Position = 'left' | 'right'

interface DialogBoxProps {
  position: Position
  text: string
}

function DialogBox({
  position,
  text,
}: DialogBoxProps) {

  return (
    <DialogBubble
      $position={position}
    >
      { text }
    </DialogBubble>
  )
}

export default DialogBox

const DialogBubble = styled.div<{ $position: Position }>`
  position: relative;
  padding: 12px 24px;
  border-radius: 32px;
  min-height: 50px;
  max-width: 850px;
  margin: 20px 0;
  width: fit-content;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-line;

  display: flex;
  align-items: center;
  z-index: -1;

  ${props => (
    props.$position === 'right'
    ? css`
      margin-left: auto;
      margin-right: 20px;
      background-color: rgba(36,145,247,1);
      color: rgba(250,252,255,1);
    `
    : css`
      margin-left: 20px;
      background-color: rgba(225,225,230,1);
      color: rgba(21,21,22,1);
    `
  )}
`

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

  const Seeker = useMemo(() => (
    <TypeImage
      src="/seeker.png"
      alt="seeker"
      $position={position}
      width={40}
      height={40}
    />
  ), [position])

  const Supporter = useMemo(() => (
    <TypeImage
      src="/supporter.png"
      alt="supporter"
      $position={position}
      width={40}
      height={40}
    />
  ), [position])

  const rawText = useMemo(() => text.replace('supporter: ', "").replace("seeker: ", ""), [text])

  return (
    <DialogBubble
      $position={position}
    >
      { rawText }
      {/* { position === 'left'
        ? Supporter
        : Seeker
      } */}
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

  display: flex;
  align-items: center;

  ${props => (
    props.$position === 'left'
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

const TypeImage = styled(Image)<{ $position: Position }>`
  position: absolute;

  border-radius: 8px;

  ${props =>
    props.$position === 'left'
      ? css`
        top: -20px;
        right: -20px;
      `
      : css`
        top: -20px;
        left: -20px;
      `
  }
`

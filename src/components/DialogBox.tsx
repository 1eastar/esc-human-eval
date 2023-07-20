import Image from "next/image"
import { useCallback, useMemo } from "react"
import { css, styled } from "styled-components"

import { Dialogue, UttrType } from "./Dialogue"


interface DialogBoxProps {
  type: UttrType
  text: string
}

function DialogBox({
  type,
  text,
}: DialogBoxProps) {

  const Seeker = useMemo(() => (
    <TypeImage
      src="/seeker.png"
      alt="seeker"
      $type={type}
      width={40}
      height={40}
    />
  ), [type])

  const Supporter = useMemo(() => (
    <TypeImage
      src="/supporter.png"
      alt="supporter"
      $type={type}
      width={40}
      height={40}
    />
  ), [type])

  const rawText = useMemo(() => text.replace('supporter: ', "").replace("seeker: ", ""), [text])

  return (
    <DialogBubble
      $type={type}
    >
      { rawText }
      { type === UttrType.SUPPORTER
        ? Supporter
        : Seeker
      }
    </DialogBubble>
  )
}

export default DialogBox

const DialogBubble = styled.div<{ $type: UttrType }>`
  position: relative;
  padding: 12px 24px;
  border-radius: 12px;
  min-height: 50px;
  min-width: 150px;
  max-width: 400px;
  margin: 10px 0;

  display: flex;
  align-items: center;

  ${props => (
    props.$type === UttrType.SUPPORTER
    ? css`
      margin-left: auto;
      margin-right: 20px;
      background-color: rgba(217, 227, 242, .7);
    `
    : css`
      margin-left: 20px;
      background-color: rgba(225, 240, 217, .7);
    `
  )}
`

const TypeImage = styled(Image)<{ $type: UttrType }>`
  position: absolute;

  border-radius: 8px;

  ${props =>
    props.$type === UttrType.SUPPORTER
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

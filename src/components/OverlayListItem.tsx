import { Tab } from "@/constants/tabs"
import { useCallback } from "react"
import styled from "styled-components"


interface OverlayListItemProps {
  text: string
  onClick: (item: string) => void
}

function OverlayListItem({
  text,
  onClick,
}: OverlayListItemProps) {
  const handleClick = useCallback(() => {
    onClick(text)
  }, [onClick, text])

  return (
    <Wrapper
      onClick={handleClick}
    >
      { text }
    </Wrapper>
  )
}

export default OverlayListItem

const Wrapper = styled.div`
  border-bottom: 1px solid rgb(242, 242, 242);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(242, 242, 242, .5);
  }
`
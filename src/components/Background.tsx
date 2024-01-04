import { styled } from "styled-components"


interface BackgroundProps {
  text: string
}

function Background({
  text,
}: BackgroundProps) {

  return (
    <Container>
      <BackgroundHeader>
        <BackgroundHeaderText>Dialogue Background</BackgroundHeaderText>
      </BackgroundHeader>
      <BackgroundContentBox>
        { text }
      </BackgroundContentBox>
    </Container>
  )
}

export default Background

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  width: 1000px;
  padding-bottom: 30px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const BackgroundHeader = styled.div`
  width: 1000px;
  box-sizing: border-box;
  padding: 20px 40px;
  border-bottom: 1.5px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BackgroundHeaderText = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const BackgroundContentBox = styled.div`
  border-radius: 8px;
  /* border: 3px solid rgba(217, 227, 242, 1); */
  border: 3px solid rgba(242, 242, 242, 1);
  background-color: rgba(242, 242, 242, .5);
  padding: 20px 25px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  width: 100%;
  word-break: break-word;
  font-size: 18px;
`

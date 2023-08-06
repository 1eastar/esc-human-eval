import { useRouter } from "next/router"
import { ChangeEvent, useCallback, useState } from "react"
import { css, styled } from "styled-components"


interface IdentificationProps {

}

function Identification({}: IdentificationProps) {
  const router = useRouter()

  const [name, setName] = useState("")
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const onFocusInput = useCallback(() => {
    setIsInputFocused(true)
  }, [])

  const onBlurInput = useCallback(() => {
    setIsInputFocused(false)
  }, [])

  const handleSubmit = useCallback(() => {
    if (!!name) {
      router.push(`/home?name=${name}`)
    } else {
      alert('성함을 입력해주세요.')
    }
  }, [name, router])
  
  return (
    <WindowContainer>
      <Container>
        <Explaination>
          성함을 입력해주세요.
          <SmallTypograph>(어느 분께서 작성한 건지 구분하기 위함입니다)</SmallTypograph>
        </Explaination>
        <ButtonRow>
          <Wrapper $isFocused={isInputFocused}>
            <Input
              value={name}
              onChange={handleChangeInput}
              onFocus={onFocusInput}
              onBlur={onBlurInput}
              />
          </Wrapper>
          <Button
            onClick={handleSubmit}
          >
            확인
          </Button>
        </ButtonRow>
      </Container>
    </WindowContainer>
  )
}

export default Identification

const WindowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  width: 600px;
  height: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Explaination = styled.div`
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const SmallTypograph = styled.div`
  font-size: 16px;
`

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

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Button = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  border: 2.5px solid rgba(242, 242, 242, .8);
  transition: all .3 ease-in-out;

  &:hover {
    background-color: rgba(242, 242, 242, .6);
  }
`

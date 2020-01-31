import styled from 'styled-components'

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0px 1px 0px #ededed;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: bold;
  margin: auto calc(50% - 109px);
`

export const StyledLeftButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 60px;
  color: black;
  border: 0;
  outline: none;
  background-color: transparent;
  :hover {
    color: #aaa;
  }
`

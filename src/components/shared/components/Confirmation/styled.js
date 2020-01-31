import styled from 'styled-components'

export const Header = styled.p`
  position: absolute;
  width: 335px;
  height: 16px;
  left: 20px;
  top: 50px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
`

export const YButton = styled.button`
  position: absolute;
  width: 128px;
  height: 39px;
  left: 20px;
  top: 85px;

  background: #ffffff;
  color: #047afe;
  border: 1px solid #047afe;
  box-sizing: border-box;
  border-radius: 3px;

  &:hover,
  &:focus {
    background-color: rgba(4, 123, 254, 1);
    color: #fff;
  }
`

export const NButton = styled.button`
  position: absolute;
  width: 63px;
  height: 39px;
  left: 159px;
  top: 85px;

  background: #ffffff;
  color: #979797;
  border: 1px solid #ffffff;
  border-radius: 3px;
  transition: all 0.5s ease;

  &:hover,
  &:focus {
    background-color: rgba(4, 123, 254, 1);
    color: #fff;
    border: 1px solid #047afe;
    border: none;
  }
`

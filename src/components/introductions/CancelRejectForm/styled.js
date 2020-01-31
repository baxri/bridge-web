// import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

export const CancelRejectContainer = styled.div`
  background-color: white;
  position: relative;
  display: block;
  ${media.greaterThan('large')`
    height: 85vh;
    width: 375px;
    max-width: 100%;
    border: none;
    margin: 0 auto;
    padding-top: 20px;
  `}

  /* ${media.lessThan('large')`
     min-height: 100%;
   `} */
`

export const Label = styled.h3`
  font-weight: 500;
  font-size: 20px;
`

export const ErrorMsg = styled.div`
  position: absolute;
  width: 335px;
  height: 35px;
  left: 0px;
  top: 12px;

  background: rgba(255, 31, 31, 0.75);
  border-radius: 22px;
`

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

export const Reasons = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  text-align: center;

  color: #979797;
`

export const OptionOne = styled.button`
  position: absolute;
  width: 106px;
  height: 50px;
  left: 20px;
  top: 100px;

  background: #ffffff;
  border: 1px solid #979797;
  box-sizing: border-box;
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(4, 123, 254, 1);
    color: #fff;
    border: none;
  }

  ${props => props.active && addBlueBorder()};
`

export const OptionTwo = styled.button`
  position: absolute;
  width: 106px;
  height: 50px;
  right: 20px;
  left: 180px;
  top: 100px;

  background: #ffffff;
  border: 1px solid #979797;
  box-sizing: border-box;
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(4, 123, 254, 1);
    color: #fff;
    border: none;
  }

  ${props => props.active && addBlueBorder()};
  ${media.lessThan('large')`
    right: 0px;
    left: 180px;
  `}
`
const addBlueBorder = () => {
  return {
    borderColor: '#007bff',
    border: '2px solid #047BFE',
    outline: 'none',
    color: '#007bff',
  }
}
export const OptionThree = styled.button`
  position: absolute;
  width: 106px;
  height: 50px;
  left: 20px;
  top: 165px;

  background: #ffffff;
  border: 1px solid #979797;
  box-sizing: border-box;
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(4, 123, 254, 1);
    color: #fff;
    border: none;
  }
  ${props => props.active && addBlueBorder()};
`

export const OptionFour = styled.button`
  position: absolute;
  width: 106px;
  height: 50px;
  right: 20px;
  left: 180px;
  top: 165px;

  background: #ffffff;
  border: 1px solid #979797;
  box-sizing: border-box;
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(4, 123, 254, 1);
    color: #fff;
    border: none;
  }
  ${props => props.active && addBlueBorder()};
  ${media.lessThan('large')`
    right: 0px;
    left: 180px;
  `}
`

export const ErrorMsgBlock = styled.div`
  ${media.lessThan('medium')`
    padding-top:10px;
  `}
`

export const InfoBox = styled.div`
  margin: 0 20px;
  padding-top: 20px;
`

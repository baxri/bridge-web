// import React from 'react'
import styled from 'styled-components'
import media from 'utils/styledMediaQueryFix'

export const ThankYouWrapper = styled.div`
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

  // ${media.lessThan('large')`
  //   min-height: 100%;
  // `}
`

export const InfoBox = styled.div`
  margin: 0 20px;
  padding-top: 20px;
`

export const CountSection = styled.div`
  display: block;
  height: 12px;
  left: 101px;
  top: 280px;
  margin: 0 auto;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  text-align: center;

  color: #979797;
`

export const CountMessage = styled.div`
  width: 306px;
  height: 146px;
  max-width: 100%;
  display: block;
  margin: 0 auto;
  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #000000;
`

export const ReferralText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  width: 306px;
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
`

export const MessageBox = styled.div`
  text-align: left;
  background: #e5e5e5;
  position: relative;
  padding: 10px;
  color: #555;
  position: relative;
  border-radius: 3px;
  white-space: pre-line;

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    border-top: 4px solid #e5e5e5;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`

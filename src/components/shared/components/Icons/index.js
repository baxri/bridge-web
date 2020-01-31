import React from 'react'
import {
  FaAngleRight,
  FaAngleLeft,
  FaBars as Bars,
  FaThumbsUp,
  FaSearch,
  FaPlay,
  FaCaretLeft,
  FaArrowRight,
  FaTimes,
  FaChevronRight,
} from 'react-icons/fa'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

import styled from 'styled-components'

const green = '#B8E986'
const yellow = '#FFE60B'
const red = '#C22336'
const grey = '#E3E3E3'
const fontSize = '20px'
const blue = '#047BFE'

// fix warning props
const ThumbsUp = ({ left, status, ...props }) => <FaThumbsUp {...props} />

const IntroThumbsUp = styled(ThumbsUp)`
  ${props => props.left && 'transform: scale(-1, 1);'}
  color: ${props => {
    if (props.status === 'accepted') return green
    return grey
  }};
  font-size: ${fontSize};
`

const IntroArrowLeft = styled(FaAngleLeft)`
  font-size: ${fontSize};
  color: ${props => {
    if (props.status === 'initialized') return yellow
    if (['confirmed', 'rejected', 'published'].includes(props.status))
      return green
    if (props.status === 'canceled') return red
    return grey
  }};
`

const IntroArrowRight = styled(FaAngleRight)`
  font-size: ${fontSize};
  color: ${props => {
    if (props.status === 'published') return yellow
    if (props.status === 'rejected') return red
    return grey
  }};
`
const EditButton = styled(FaPlay)`
  font-size: 10px;
  color: ${props => {
    if (props.status === 'published') return blue
    if (props.status === 'rejected') return green
    return blue
  }};
`

const Check = styled(IoIosCheckmarkCircleOutline)`
  font-size: ${fontSize};
  color: ${blue};
`

export {
  FaAngleRight as AngleRight,
  FaAngleLeft as AngleLeft,
  Bars,
  IntroThumbsUp,
  IntroArrowLeft,
  IntroArrowRight,
  EditButton,
  Check,
  FaSearch as Search,
  FaCaretLeft as CaretLeft,
  FaArrowRight as ArrowRight,
  FaTimes as Times,
  FaChevronRight as ChevronRight,
}

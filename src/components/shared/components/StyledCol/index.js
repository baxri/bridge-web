import styled from 'styled-components'
import { Col } from 'reactstrap'

const StyledCol = styled(Col)`
  text-align: ${props => {
    if (props.default === 'left') return 'left'
    return 'right'
  }}
  @media screen and (max-width:480px){
    margin-top:10px;
    text-align: center;
  }
`
export default StyledCol

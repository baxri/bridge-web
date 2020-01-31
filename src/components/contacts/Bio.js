import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 24px;
`

const ContentWrapper = styled.div`
  word-break: break-word;
  overflow: hidden;
  max-height: ${props => props.height};
  transition: max-height 0.2s ease-out;
`

const Content = styled.p`
  font-size: 14px;
  line-height: 1.3rem;
`

const CollapseButton = styled.span`
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #82879c;
`

const Icon = styled.i.attrs(props => ({
  className: props.collapsed ? 'fa fa-angle-down' : 'fa fa-angle-up',
}))`
  font-size: 28px;
  margin-right: 4px;
  position: relative;
  top: -1px;
  color: #82879c;
`

const BioSource = styled.p`
  font-size: 14px;
  color: #82879c;
  margin: 8px 0;
`

const TEXT_OFFSET = 3.75

export default class Bio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: true,
      needCollapse: false,
    }

    this.contentRef = React.createRef()
  }

  componentDidMount() {
    if (this.getBioHeightOffset() > TEXT_OFFSET) {
      this.setState({ needCollapse: true })
    }
  }

  toggleBio = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  /**
   * @param {String} text
   */
  computeText = text => {
    if (this.state.needCollapse && this.state.collapsed) {
      const textLength = text.length
      const lengthOffset = TEXT_OFFSET / this.getBioHeightOffset()

      return text.substr(0, textLength * lengthOffset) + ' ...'
    }
    return text
  }

  getBioHeightOffset = () =>
    this.contentRef.current ? this.contentRef.current.offsetHeight / 16 : 0

  render() {
    const { needCollapse, collapsed } = this.state
    let { bio, bio_source } = this.props

    bio = this.computeText(bio || '')

    return (
      <Wrapper>
        <ContentWrapper height={collapsed ? '3.6rem' : 'null'}>
          <Content ref={this.contentRef}>{bio}</Content>
        </ContentWrapper>
        {bio_source && <BioSource>{bio_source}</BioSource>}
        {needCollapse && (
          <CollapseButton onClick={this.toggleBio}>
            <Icon collapsed={collapsed} />
            {collapsed ? 'Read More' : 'Collapse'}
          </CollapseButton>
        )}
      </Wrapper>
    )
  }
}

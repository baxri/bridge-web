import React from 'react'
import {
  FlowSelectorItemWrapper,
  FlowSelectorItemTitle,
  FlowSelectorItemInfo,
  FlowSelectorItemChecked,
  FlowSelectorWrapper,
} from './styled'
import Header from './Header'

const FlowSelectorItem = React.memo(function FlowSelectorItem({
  title,
  info,
  selected,
  onChange,
}) {
  return (
    <FlowSelectorItemWrapper onClick={onChange}>
      <FlowSelectorItemTitle>{title}</FlowSelectorItemTitle>
      <FlowSelectorItemInfo>{info}</FlowSelectorItemInfo>
      <FlowSelectorItemChecked visible={selected} />
    </FlowSelectorItemWrapper>
  )
})

const FlowSelector = React.memo(
  ({ flowType, onChange, onClose, show, introPerson, toPerson }) => (
    <FlowSelectorWrapper show={show}>
      <Header onBack={onClose} title="Intro Flow" />
      <FlowSelectorItem
        title="Get Forwardable Info & Opt-In"
        info={`${introPerson} will be asked to provide you more information
      and context that you can send ${toPerson} to Opt-In`}
        selected={flowType === 'opt_in'}
        onChange={() => (flowType === 'opt_in' ? null : onChange('opt_in'))}
      />
      <FlowSelectorItem
        title="Fast, No Opt-In"
        info={`${introPerson} and ${toPerson} will be introduced immediately with
      no opt-ins requested`}
        selected={flowType === 'fast'}
        onChange={() => (flowType === 'fast' ? null : onChange('fast'))}
      />
    </FlowSelectorWrapper>
  )
)

export default FlowSelector

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import share from './share_reducer'
import filter from './filter_reducer'
import buildReducer from 'intropath-core/reducers'

const rootReducer = buildReducer(combineReducers, { share, filter, form }, [
  'share',
  'filter',
  'form',
])

export default rootReducer

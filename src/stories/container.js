import React from 'react'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

import createStore from '../store'

const store = createStore({})

const Container = storyFn => (
  <div className="story-container">
    <Provider store={store}>{storyFn()}</Provider>
  </div>
)

export default Container

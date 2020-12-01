import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagaMiddleware'

const sagaMiddleware = createSagaMiddleware()

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  })
  sagaMiddleware.run(rootSaga)
  return store
}

export default createStore

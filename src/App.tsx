import { FC, MouseEvent, useCallback } from 'react'
import {
  FFContextProvider,
  FFContextProviderProps
} from '@harnessio/ff-react-client-sdk'
import Loader from './components/Loader/Loader'
import ClassComponentWithFlags from './components/ClassComponentWithFlags/ClassComponentWithFlags'
import css from './App.module.css'
import FunctionComponentWithFlag from './components/FunctionComponentWithFlag/FunctionComponentWithFlag'

const App: FC = () => {
  const useAsyncMode = window.location.search.includes('async=true')

  const target: FFContextProviderProps['target'] = {
    identifier: 'ReactSDK',
    name: 'React SDK',
    attributes: {
      hello: 'world'
    }
  }

  const handleAsyncModeToggle = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      window.location.search = `async=${useAsyncMode ? 'false' : 'true'}`
    },
    []
  )

  return (
    <FFContextProvider
      apiKey="2d129b22-7a51-47cd-92db-0b175c6cbd78"
      target={target}
      fallback={<Loader />}
      async={useAsyncMode}
    >
      <article>
        <h1>Feature Flags</h1>
        <button onClick={handleAsyncModeToggle}>
          {useAsyncMode ? 'Use synchronous mode' : 'Use asynchronous mode'}
        </button>
        <div className={css.sections}>
          <FunctionComponentWithFlag />
          <ClassComponentWithFlags />
        </div>
      </article>
    </FFContextProvider>
  )
}

export default App

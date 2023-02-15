import { FC } from 'react'
import { useFeatureFlag } from '@harnessio/ff-react-client-sdk'

const FunctionComponentWithFlag: FC = () => {
  const flagEnabled = useFeatureFlag('MyFlag')

  return (
    <section>
      <h3>I wonder if the flag is enabled 🤔</h3>
      {flagEnabled ? (
        <p>Yup, it's enabled alright 👍🏻</p>
      ) : (
        <p>Ah dang, it's disabled 😔</p>
      )}
    </section>
  )
}

export default FunctionComponentWithFlag

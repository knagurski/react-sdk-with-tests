import { Component } from 'react'
import { withFeatureFlags } from '@harnessio/ff-react-client-sdk'
import Loader from '../Loader/Loader'

import css from './ClassComponentWithFlags.module.css'

class ClassComponentWithFlags extends Component<{
  flags: Record<string, any>
  loading: boolean
}> {
  componentDidMount() {
    console.log('Component mounted and got these flags', this.props.flags)
  }

  render() {
    const flagsList = Object.entries(this.props.flags)

    return (
      <section>
        {this.props.loading ? (
          <>
            <h3>FLAGS INCOMING!</h3>
            <Loader />
          </>
        ) : (
          <>
            <h3>We're done loading</h3>
            {!flagsList.length ? (
              <p>Ah man, no flags</p>
            ) : (
              <ul className={css.flagList}>
                {flagsList.map(([key, val]) => (
                  <li key={key}>
                    Flag <strong>{key}</strong> is{' '}
                    <strong>{JSON.stringify(val)}</strong>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    )
  }
}

export default withFeatureFlags(ClassComponentWithFlags)

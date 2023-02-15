import { render, RenderResult, screen } from '@testing-library/react'
import FunctionComponentWithFlag from '../FunctionComponentWithFlag'
import { FFContext } from '@harnessio/ff-react-client-sdk'

const renderComponent = (flags: Record<string, unknown> = {}): RenderResult =>
  render(<FunctionComponentWithFlag />, {
    wrapper: ({ children }) => (
      <FFContext.Provider value={{ flags, loading: false }}>
        {children}
      </FFContext.Provider>
    )
  })

describe('FunctionComponentWithFlag with a CONTEXT WRAPPER', () => {
  test('it should show a happy message when enabled', async () => {
    renderComponent({ MyFlag: true })

    expect(screen.getByText("Yup, it's enabled alright 👍🏻")).toBeInTheDocument()
  })

  test('it should show a sad message when disabled', async () => {
    renderComponent({ MyFlag: false })

    expect(screen.getByText("Ah dang, it's disabled 😔")).toBeInTheDocument()
  })
})

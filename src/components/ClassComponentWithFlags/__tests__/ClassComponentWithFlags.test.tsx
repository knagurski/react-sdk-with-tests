import { render, RenderResult, screen } from '@testing-library/react'
import ClassComponentWithFlags from '../ClassComponentWithFlags'
import { FFContext } from '@harnessio/ff-react-client-sdk'

const renderComponent = (
  flags: Record<string, unknown> = { flag1: true, flag2: false },
  loading = false
): RenderResult =>
  render(<ClassComponentWithFlags />, {
    wrapper: ({ children }) => (
      <FFContext.Provider value={{ flags, loading }}>
        {children}
      </FFContext.Provider>
    )
  })

describe('ClassComponentWithFlags', () => {
  test('it should show a loading message and the loader when flags are loading', async () => {
    renderComponent({}, true)

    expect(
      screen.getByRole('heading', { name: 'FLAGS INCOMING!' })
    ).toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('it should show the flags when finished loading', async () => {
    const flags = {
      myFlag: true,
      yourFlag: false,
      theirFlag: false
    }
    renderComponent(flags)

    expect(
      screen.getByRole('heading', { name: "We're done loading" })
    ).toBeInTheDocument()

    Object.entries(flags).forEach(([key, val]) => {
      expect(screen.getByRole('list')).toHaveTextContent(
        `${key} is ${val ? 'true' : 'false'}`
      )
    })
  })

  test('it should be bummed when there are no flags after loading', async () => {
    renderComponent({})

    expect(
      screen.getByRole('heading', { name: "We're done loading" })
    ).toBeInTheDocument()
    expect(screen.getByText('Ah man, no flags')).toBeInTheDocument()
  })
})

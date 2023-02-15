import { render, screen } from '@testing-library/react'
import { useFeatureFlag } from '@harnessio/ff-react-client-sdk'
import FunctionComponentWithFlag from '../FunctionComponentWithFlag'

jest.mock('@harnessio/ff-react-client-sdk')

describe('FunctionComponentWithFlag with a MOCK', () => {
  test('it should show a happy message when enabled', async () => {
    ;(useFeatureFlag as jest.Mock).mockReturnValue(true)
    render(<FunctionComponentWithFlag />)

    expect(screen.getByText("Yup, it's enabled alright 👍🏻")).toBeInTheDocument()
  })

  test('it should show a sad message when disabled', async () => {
    ;(useFeatureFlag as jest.Mock).mockReturnValue(false)
    render(<FunctionComponentWithFlag />)

    expect(screen.getByText("Ah dang, it's disabled 😔")).toBeInTheDocument()
  })
})

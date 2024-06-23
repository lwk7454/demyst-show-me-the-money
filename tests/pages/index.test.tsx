import { getBalanceSheet } from '@/app/actions/xeroApi'
import { BalanceSheetSuccess } from '@/tests/mocks/xero'
import { render } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('@/utils/utils', () => ({
  wait: jest.fn(),
}))

jest.mock('@/app/actions/xeroApi', () => ({
  getBalanceSheet: jest.fn()
}))

const mockedApi = getBalanceSheet as jest.Mocked<typeof getBalanceSheet>

describe('Home page', () => {
  beforeEach(() => {
    mockedApi.mockResolvedValue(BalanceSheetSuccess)
  })

  it('should show fetched data', async () => {
    const page = render(await Home())

    await page.findAllByRole('heading')
    expect(page.getAllByRole('heading')[0]).toHaveTextContent('Balance Sheet')
    expect(page.getAllByRole('heading')[1]).toHaveTextContent('Demo Org')
    expect(page.getAllByRole('heading')[2]).toHaveTextContent('As at 23 June 2024')
    expect(page.findAllByText('My Bank Account')).toBeTruthy()
    expect(page.findAllByText('Sample Business 1')).toBeTruthy()
    expect(page.findAllByText('Accounts Receivable')).toBeTruthy()
    expect(page.findAllByText('Toyota Hilux Car')).toBeTruthy()
    expect(page.findAllByText('Total Assets')).toBeTruthy()
    expect(page.findAllByText('PAYG Withholdings')).toBeTruthy()
    expect(page.findAllByText('Total Non-Current Liabilities')).toBeTruthy()
    expect(page.findAllByText('508972.19')).toBeTruthy()
    expect(page.findAllByText('488468.74')).toBeTruthy()
  })
})

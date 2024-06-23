import { baseRequest, getBalanceSheet } from '@/app/actions/xeroApi'
import axios, { AxiosError } from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Xero API', () => {

  describe('base request', () => {
    test('should return data', async () => {
      mockedAxios.mockImplementation(() => ({ data: 'test' }))
      const res = await baseRequest<string>({
        method: 'POST',
        url: '/test/path',
      })

      expect(res).toEqual('test')
    })

    test('should catch known errors', async () => {
      mockedAxios.mockImplementation((() => {
        throw new AxiosError('Test Error')
      }))

      const res = await baseRequest<string>({
        url: '/test/path',
      })

      expect(res).toEqual('error')
    })

    test('should throw unknown errors', async () => {
      mockedAxios.mockImplementation((() => {
        throw new Error('Unknown Error')
      }))

      await expect(baseRequest<string>({ url: '/test/path' }))
        .rejects.toThrow()
    })
  })

  describe('GET balance sheet', () => {
    test('should call the correct API', async () => {
      mockedAxios.mockImplementation(() => ({ data: null }))
      await getBalanceSheet()
      expect(mockedAxios).toHaveBeenCalledWith({
        url: '/Reports/BalanceSheet',
        baseURL: 'undefined/api.xro/2.0',
        method: 'GET',
      })
    })
  })
})

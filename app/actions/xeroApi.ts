import { Xero } from '@/types/xero'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export async function baseRequest<T>(args: AxiosRequestConfig): Promise<T> {
  try {
    const res = await axios({
      baseURL: process.env.XERO_ROOT + '/api.xro/2.0',
      ...args
    })
    return res.data as T
  } catch (e) {
    if(e instanceof AxiosError) {
      // TODO: error handling logic
      return 'error' as T
    }
    throw e as Error
  }
}

export async function getBalanceSheet() {
  return await baseRequest<Xero.BalanceSheetResponse>({
    url: '/Reports/BalanceSheet',
    method: 'GET'
  })
}

import { Xero } from '@/types/xero'
import axios, { AxiosError } from 'axios'

async function baseRequest<T>(args: axios.AxiosRequestConfig): Promise<T> {
  try {
    const res = await axios({
      baseURL: process.env.XERO_ROOT + '/api.xro/2.0',
      ...args
    })
    return res.data as T
  } catch (e) {
    if(e instanceof AxiosError) {
      // TODO: error handling logic
      throw e
    }
    throw e as Error
  }
}

export async function getBalanceSheet() {
  return await baseRequest<Xero.BalanceSheetResponse>({
    url: '/Reports/BalanceSheet'
  })
}

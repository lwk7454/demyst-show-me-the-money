import { wait } from '@/utils/utils'

jest.useFakeTimers()

describe('#wait', () => {
  it('returns after timeout', async () => {
    const time = 2;
    const promise = wait(time);
    jest.advanceTimersByTime(time * 1000);

    await expect(promise).resolves.toBeTruthy();
  })
})

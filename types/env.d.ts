declare global {
  namespace NodeJS {
    interface ProcessEnv {
      XERO_ROOT: `http${string}`
    }
  }
}

export {}

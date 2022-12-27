/* eslint-disable @typescript-eslint/no-unused-vars */
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      fullname: string
      image?: string
      menu: string[]
    }
    accessToken: string
  }

  interface Account {
    access_token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: Users | null
    accessToken: string
  }
}

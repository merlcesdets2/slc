import { AppShell, Container } from '@mantine/core'
import { Sidebar } from './sidebar'
import { useSession } from 'next-auth/react'
import Loading from '../loading'
import { useRouter } from 'next/router'
import { setToken } from '../../util/axiosConfig'

type Props = {
  children: React.ReactNode
}

export const AplicationContainer = ({ children }: Props) => {
  const { data: session, status } = useSession()
  const profile = session?.user
  const router = useRouter()
  const [, path] = router.asPath.split('/')
  const isCallCenter = path === 'callcenter'

  if (session) setToken(session.accessToken)

  if (status === 'loading') return <Loading />
  if (!profile) return <>{children}</>
  if (isCallCenter) return <Container>{children}</Container>

  return (
    <AppShell
      navbar={<Sidebar />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  )
}

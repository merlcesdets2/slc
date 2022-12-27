import { Button, Stack } from '@mantine/core'
import { Profile } from './profile'
import Menu from './menu'
import { SignOut } from './signout'

const DevMode = () => (
  <Button
    radius={0}
    styles={{
      root: {
        '&:disabled': {
          color: 'white',
          backgroundColor: '#fa5252',
        },
        '&:hover': {
          backgroundColor: '#fa5252',
        },
      },
    }}
    disabled
  >
    ระบบทดสอบ
  </Button>
)

export function Sidebar() {
  const hostname = window.location.hostname
  const isDevMode = hostname !== 'energycsc.jasmine.com'

  return (
    <Stack spacing={'xs'} w={200}>
      {isDevMode ? <DevMode /> : ''}
      <Profile />
      <Menu />
      <SignOut />
    </Stack>
  )
}

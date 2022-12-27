import { ActionIcon, Text } from '@mantine/core'
import { signOut } from 'next-auth/react'
import { IconLogout } from '@tabler/icons'

const signOutFlow = () => {
  window.open(
    'https://api.jasmine.com/authen1/jaslogout-page',
    '_blank',
    'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=600'
  )
  signOut()
}

const style = {
  borderTop: '1px solid black',
  marginTop: '10px',
  width: '80%',
  display: 'flex',
  alignSelf: 'center',
}

export const SignOut = () => {
  return (
    <>
      <div style={style} />
      <ActionIcon onClick={signOutFlow} w={'100%'}>
        <IconLogout size={18} />
        <Text size={14} ml={8}>
          Sign Out
        </Text>
      </ActionIcon>
    </>
  )
}

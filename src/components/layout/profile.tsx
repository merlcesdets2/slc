import { Center, Stack, Text } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import logo from '@/public/assets/images/jasEnergyLogo.png'

export const Profile = () => {
  const { data: session } = useSession()
  const profile = session?.user
  const empId = profile ? profile.id : 'emp id'
  const fullname = profile ? profile.fullname : 'firstname lastname'

  return (
    <Center p={10}>
      <Stack spacing={4}>
        <Image src={logo} alt="logo" width={160} height={60} />
        <Text c="dimmed" fz="xs" ta="center">
          Version Software V1.0.1
        </Text>
        <Text ta="center">{empId}</Text>
        <Text ta="center">{fullname}</Text>
      </Stack>
    </Center>
  )
}

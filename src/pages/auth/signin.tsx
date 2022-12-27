import { Text, Button, Grid, Card, createStyles } from '@mantine/core'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '@/public/static/jaslogo.jpg'

const useStyles = createStyles(() => ({
  background: {
    height: '100vh',
    marginTop: '-20px',
    marginBottom: '-20px',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backgroudCard: {
    alignSelf: 'center',
    backgroundColor: '#DEE0E6',
  },
  card: { textAlign: 'center' },
  button: {
    backgroundColor: '#007bff',
    marginTop: '20px',
    fontWeight: 'bold',
    borderRadius: '2rem',
    height: '50px',
    width: '100%',
  },
}))

export default function Component() {
  const router = useRouter()
  const urlCallback: string = router.query.callbackUrl ? router.query.callbackUrl.toString() : '/'
  const { data: session, status } = useSession()

  const massage = {
    detail: session ? `Signed in as ${session.user?.email}` : 'Version : 1.0.0',
    sign: session ? 'SIGN OUT' : 'SIGN IN WITH JASMINE.',
  }
  const { classes } = useStyles()

  if (status === 'loading') return

  return (
    <>
      <Grid className={classes.background}>
        <Grid.Col sm={3} md={3} className={classes.backgroudCard}>
          <Card shadow="sm" p="xl" radius="md" className={classes.card}>
            <Text weight={700} size="xl">
              Jas Solar Home
            </Text>
            <Text> {massage.detail} </Text>
            <Card.Section mt={20}>
              <Image src={logo} alt="logo" />
            </Card.Section>
            <Button
              color="blue"
              className={classes.button}
              p="xs"
              onClick={() => {
                {
                  session ? signOut() : signIn('jasmine', { callbackUrl: urlCallback })
                }
              }}
            >
              {massage.sign}
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  )
}

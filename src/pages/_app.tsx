import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { AplicationContainer } from '@/components/layout/template'
import { io, Socket } from 'socket.io-client'
import { apiCall } from '@/util/axiosConfig'
import { showNotification } from '@mantine/notifications'
import { AppConfig } from '@/AppConfig'
import { RouterTransition } from '@/components/RouterTransition'
import { SessionProvider } from 'next-auth/react'

const { wsUrl, toggleWs } = AppConfig

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const primary = 'base'
  const themeInput = {
    input: { backgroundColor: '#f1fff2' },
    label: { color: '#4bb874' },
  }
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (toggleWs === 'on') {
      const socketConnect = io(`${wsUrl}`, { transports: ['websocket'] })
      setSocket(socketConnect)
      showNotification({
        title: 'Socket Connected',
        message: 'you are connecting to socket io',
      })
      socketConnect.on('notification', function (msg) {
        showNotification({
          title: 'Socket Notification',
          message: msg,
        })
      })
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="icon" href="assets/images/jaslogo.jpg" />
        <title>Solar Home</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            xs: 500,
            sm: 768,
            md: 960,
            lg: 1200,
            xl: 1400,
          },
          components: {
            NumberInput: {
              styles: () => ({
                input: {
                  textAlign: 'right',
                  backgroundColor: '#f1fff2',
                },
                label: { color: '#4bb874' },
              }),
            },
            TextInput: {
              styles: () => themeInput,
            },
            Select: {
              styles: () => themeInput,
            },
            Textarea: {
              styles: () => themeInput,
            },
            Radio: {
              styles: () => ({
                label: { color: '#4bb874' },
                radio: { backgroundColor: '#c6ebc9', borderColor: '#c6ebc9' },
              }),
            },
            FileInput: {
              styles: () => themeInput,
            },
          },
          colors: {
            base: [
              '#FBE9E7',
              '#FFCCBC',
              '#FFAB91',
              '#FF8A65',
              '#FF7043',
              '#FF5722',
              '#356859',
              '#224513',
              '#356859',
              '#356859',
            ],
          },
          primaryColor: primary,
          fontFamily: 'Noto Sans Thai',
        }}
      >
        <SessionProvider refetchOnWindowFocus={false}>
          <NotificationsProvider>
            <ModalsProvider>
              <AplicationContainer>
                <SWRConfig
                  value={{
                    fetcher: (url: string) => apiCall.get(url).then((res) => res.data),
                    revalidateOnFocus: false,
                    revalidateOnReconnect: false,
                  }}
                >
                  <RouterTransition />
                  <Component {...pageProps} socket={socket} />
                </SWRConfig>
              </AplicationContainer>
            </ModalsProvider>
          </NotificationsProvider>
        </SessionProvider>
      </MantineProvider>
    </>
  )
}

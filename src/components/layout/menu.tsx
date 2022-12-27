import { useRouter } from 'next/router'
import { Box, createStyles, NavLink } from '@mantine/core'
import { IconUserSearch, IconChartInfographic } from '@tabler/icons'
import { AppConfig } from '@/AppConfig'

const useStyles = createStyles(() => ({
  nav: {
    '&[data-active], &[data-active]:hover': { backgroundColor: '#1aa160' },
  },
  nestedNav: {
    '&[data-active], &[data-active]:hover': { backgroundColor: '#f1fff2' },
  },
}))

export default function Menu() {
  const router = useRouter()
  const { route } = router
  const registerGroup = '/register-list'
  const customerSearch = '/x-search-customer'

  const { classes } = useStyles()

  return (
    <Box sx={{ width: 230 }}>
      <NavLink
        label="รายการลูกค้าลงทะเบียน"
        icon={<IconChartInfographic />}
        childrenOffset={36}
        active={route === registerGroup}
        variant="filled"
        classNames={{
          root: classes.nav,
        }}
        onClick={() => router.push(registerGroup)}
      />
      <NavLink
        label="CSC Ticket System"
        icon={<IconUserSearch />}
        childrenOffset={36}
        active={customerSearch === route}
        onClick={() =>
          router.replace(
            `${AppConfig.frontEndUrl}/JAS_POWER_CC/dist/index.html?pages=searchCustomer`
          )
        }
        variant="filled"
        classNames={{
          root: classes.nav,
        }}
      />
    </Box>
  )
}

import { apiCall } from '@/util/axiosConfig'
import { Stack, Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { registerListProps } from 'types/register-table'
import { CustomerInfo } from './customerInfomation'

import { AppConfig } from '@/AppConfig'
import { NextRouter } from 'next/router'

const { apiUrl } = AppConfig

const ModalReviedJob = (row: registerListProps, router: NextRouter) => {
  openConfirmModal({
    styles: {
      modal: {
        width: '400px',
      },
    },
    title: (
      <Text color={'#356859'} fw={'bold'}>
        เจ้าหน้าที่ประสงค์ รับงาน
      </Text>
    ),
    centered: true,
    children: (
      <Stack spacing={1}>
        <Text size="sm">เลขที่รอติดต่อลูกค้า</Text>
        <Text mb={15}> {row.registerTransactionId}</Text>
        <CustomerInfo {...row} />
      </Stack>
    ),
    labels: { confirm: 'รับงาน', cancel: 'ปิดหน้าต่างนี้' },
    confirmProps: { color: '#2f9e44' },
    onConfirm: async () => {
      await apiCall.post(`${apiUrl}/jas-energy-customer/service/customer/saleorder`, {
        registerTransactionId: row.registerTransactionId,
      })
      const result = await apiCall.get(
        `${apiUrl}/jas-energy-customer/service/customer/register?registerTransactionId=${row.registerTransactionId}`
      )
      const saleOrderId = result.data[0].saleOrderId
      router.push(`/register-form?refId=${saleOrderId}`)
    },
  })
}

export default ModalReviedJob

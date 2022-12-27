import { apiCall } from '@/util/axiosConfig'
import { Stack, Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { registerListProps, stateProcessListProps } from 'types/register-table'
import { CustomerInfo } from './customerInfomation'

import { AppConfig } from '@/AppConfig'
import { KeyedMutator } from 'swr'
const { apiUrl } = AppConfig

const ModalHaveFlow = (
  row: registerListProps,
  flow: stateProcessListProps | undefined,
  refresh: KeyedMutator<unknown>
) => {
  openConfirmModal({
    styles: {
      modal: {
        width: '400px',
      },
    },
    title: (
      <Text color={'#356859'} fw={'bold'}>
        ลูกค้าประสงค์ {flow?.stateProcessName}
      </Text>
    ),
    centered: true,
    children: (
      <Stack spacing={1}>
        <Text size="sm">เลขที่ Sale Order</Text>
        <Text mb={15} color={'#356859'} fw={'bold'}>
          {row.saleOrderId}
        </Text>
        <CustomerInfo {...row} />
      </Stack>
    ),
    labels: { confirm: 'ยืนยัน, บันทึก', cancel: 'ปิดหน้าต่างนี้' },
    confirmProps: { color: '#1aa160' },
    onConfirm: async () => {
      await apiCall.put(`${apiUrl}/jas-energy-customer/service/customer/state`, {
        refId: row.saleOrderId,
        stateCode: flow?.stateProcessCode,
      })
      refresh()
    },
  })
}

export default ModalHaveFlow

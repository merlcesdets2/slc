import { apiCall } from '@/util/axiosConfig'
import { Stack, Text, Textarea } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { registerListProps, stateProcessListProps } from 'types/register-table'
import { CustomerInfo } from './customerInfomation'

import { AppConfig } from '@/AppConfig'
import { ChangeEvent, useState } from 'react'
import { KeyedMutator } from 'swr'
const { apiUrl } = AppConfig

let textRemark = ''

const Context = ({ row }: { row: registerListProps }) => {
  const [textArea, SetTextArea] = useState('')
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    SetTextArea(e.currentTarget.value)
    textRemark = textArea
  }
  return (
    <Stack spacing={1}>
      <Text size="sm">เลขที่ Sale Order</Text>
      <Text mb={15} color={'#356859'} fw={'bold'}>
        {row.saleOrderId}
      </Text>
      <CustomerInfo {...row} />
      <Textarea label={'หมายเหตุ'} value={textArea} onChange={(e) => handleChange(e)} />
    </Stack>
  )
}

const ModalNoFlow = (
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
      <Text color="red" fw={'bold'}>
        ลูกค้าประสงค์ {flow?.stateProcessName}
      </Text>
    ),
    centered: true,
    children: <Context row={row} />,
    labels: { confirm: 'ยืนยัน', cancel: 'ปิดหน้าต่างนี้' },
    confirmProps: { color: 'red' },
    onConfirm: async () => {
      await apiCall.put(`${apiUrl}/jas-energy-customer/service/customer/state`, {
        refId: row.saleOrderId,
        stateCode: flow?.stateProcessCode,
        stateRemark: textRemark,
      })
      refresh()
    },
  })
}

export default ModalNoFlow

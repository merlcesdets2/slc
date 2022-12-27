import { Group, Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { registerFormProps } from 'types/register-form'
import { apiCall } from '@/util/axiosConfig'
import { uploadBill } from '../fileBill'

import { AppConfig } from '@/AppConfig'
import { bePopup } from '@/components/bePopup'
import { ResponseProps } from 'types/response-backend'

const { apiUrl } = AppConfig

const confirmPut = (v: registerFormProps, backToList: () => void) => {
  const { saleOrderId, customer } = v
  openConfirmModal({
    title: 'เจ้าหน้าที่จะดำเนินการ ยืนยัน, บันทึกข้อมูลใช่หรือไม่',
    children: (
      <>
        <Group>
          <Text>เลขที่ Sale Order:</Text>
          <Text>{saleOrderId}</Text>
        </Group>
        <Group>
          <Text>ชื่อ-นามสกุลลูกค้า:</Text>
          <Text>{`${customer.custFirstName} ${customer.custLastName}`}</Text>
        </Group>
        <Group>
          <Text>เบอร์โทรติดต่อ:</Text>
          <Text>{customer.mobileNo}</Text>
        </Group>
      </>
    ),
    centered: true,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: async () => {
      const result = await apiCall.put<unknown, ResponseProps>(
        `${apiUrl}/jas-energy-customer/service/customer/saleorder`,
        JSON.stringify(v)
      )
      bePopup(result)
      v.urlBill && (await uploadBill(v))
      backToList()
    },
  })
}

export default confirmPut

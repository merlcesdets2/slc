import { Title, Text, Group, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import { registerFormProps } from 'types/register-form'
import { AnalysisServiceForm } from './analyService'
import { CustomerInformationForm } from './customerInfomation'
import confirmPut from './modal/confirmPut'
import { calculateAverageUnit } from '.'

const FormRegister = ({ initData }: { initData: registerFormProps }) => {
  const router = useRouter()
  const payload = { ...initData, urlBill: '' }

  const form = useForm({
    initialValues: payload,
    validateInputOnChange: true,
    validate: {
      customer: {
        custFirstName: (value: string) =>
          /[^a-zA-Zก-๏\s]/.test(value)
            ? '***รองรับตัวอักษร ก-ฮ,A-Z,a-z ความยาวไม่เกิน 100 ตัวอักษร'
            : null,
        custLastName: (value: string) =>
          /[^a-zA-Zก-๏\s]/.test(value)
            ? '***รองรับตัวอักษร ก-ฮ,A-Z,a-z ความยาวไม่เกิน 100 ตัวอักษร'
            : null,
        mobileNo: (value: string) =>
          /[0][6,8,9][0-9]{8}/.test(value)
            ? null
            : '*** รองรับตัวเลข 0-9 โดยหมายเลขต้องขึ้นต้นด้วย 06,08,09 เท่านั้น',
        lineId: (value: string) => (value.length > 25 ? 'ไม่เกิน 25 ตัวอักษร' : null),
        address: {
          homeNo: (value: string) =>
            /[^0-9/,-]/.test(value) ? '*** รองรับตัวเลข 0-9 และเครื่องหมาย /,-' : null,
          moo: (value: string) =>
            /[^0-9]/.test(value) || value.length > 2 ? '*** รองรับตัวเลข 0-9 ไม่เกิน 2 หลัก' : null,
        },
      },
    },
  })

  const handleSubmit = (v: registerFormProps) => {
    const averageUnit = calculateAverageUnit(form)
    v.averageUnitsPast6Months = averageUnit
    confirmPut(v, () => router.push('/register-list'))
  }

  const handleError = (errors: typeof form.errors) =>
    errors && window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <Title order={3} style={{ fontFamily: 'Noto Sans Thai' }}>
        แบบฟอร์มบันทึกข้อมูลลูกค้า และคุณสมบัติขอรับบริการ
      </Title>
      เลขที่ Sale Order
      <Text fw={'bold'}>
        {initData.saleOrderId} ({initData.stateCode})
      </Text>
      <div style={{ backgroundColor: 'white', padding: '15px' }}>
        <Text weight={400} size={20} ml={2}></Text>
        <form onSubmit={form.onSubmit(handleSubmit, handleError)} id="regis-form">
          <CustomerInformationForm form={form} />
          <AnalysisServiceForm form={form} />
        </form>
      </div>
      <Group position="apart" mt={25} bg={'#f8f9fa'} p={20}>
        <Button variant="outline" onClick={() => router.push('/register-list')}>
          กลับไปหน้าหลัก
        </Button>
        <Button type="submit" form="regis-form">
          บันทึกข้อมูล
        </Button>
      </Group>
    </>
  )
}

export default FormRegister

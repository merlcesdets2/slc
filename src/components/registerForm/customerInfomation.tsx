import { useEffect, useState } from 'react'
import { Anchor, Grid, Group, NumberInput, Radio, Select, Text, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { apiCall } from '@/util/axiosConfig'
import { registerFormProps } from 'types/register-form'
import Loading from '../loading'
import useSWR from 'swr'

import { AppConfig } from '@/AppConfig'
const { apiUrl } = AppConfig

interface provinceProp {
  provinceId: string
  provinceName: string
}

interface SelectTambolProps {
  value: string
  label: string
  zipcode: string
}

const getDistrict = async (proviceId: string) => {
  const district = await apiCall.get(
    `${apiUrl}/jas-energy-customer/service/util/amphur?provinceId=${proviceId}`
  )
  return district.data.map((amphur: { amphurId: string; amphurName: string }) => {
    return {
      value: amphur.amphurId,
      label: amphur.amphurName,
    }
  })
}

const getSubDistrict = async (proviceId: string, districtId: string) => {
  const subDistrict = await apiCall.get(
    `${apiUrl}/jas-energy-customer/service/util/tambol?provinceId=${proviceId}&amphurId=${districtId}`
  )
  return subDistrict.data.map(
    (tambol: { tambolId: string; tambolName: string; postCode: string }) => {
      return {
        value: tambol.tambolId,
        label: tambol.tambolName,
        zipcode: tambol.postCode,
      }
    }
  )
}

const CustomerInformationForm = ({ form }: { form: UseFormReturnType<registerFormProps> }) => {
  const { data: province } = useSWR(`${apiUrl}/jas-energy-customer/service/util/province`)
  const [amphurValue, setAmphurValue] = useState([])
  const [tambolValue, setTambolValue] = useState<SelectTambolProps[]>([])

  useEffect(() => {
    const fetchAmphur = async () => {
      const openAmphur = await getDistrict(form.values.customer.address.province)
      setAmphurValue(openAmphur)
    }
    fetchAmphur()
  }, [form.values.customer.address.province])

  useEffect(() => {
    const fetchTambol = async () => {
      if (!form.values.customer.address.amphur) return
      const openTambol = await getSubDistrict(
        form.values.customer.address.province,
        form.values.customer.address.amphur
      )
      setTambolValue(openTambol)
    }
    fetchTambol()
  }, [form.values.customer.address.amphur, form.values.customer.address.province])

  if (!province) return <Loading />

  const provinces = province.map((province: provinceProp) => {
    return {
      value: province.provinceId,
      label: province.provinceName,
    }
  })

  return (
    <>
      <Group position="left">
        <Text weight={400} size={18} ml={2}>
          STEP1: ข้อมูลลูกค้า และสถานที่ติดตั้ง
        </Text>
      </Group>
      <Grid mt={5} gutter="sm" style={{}}>
        <Grid.Col md={2}>
          <Text weight={400} size={16} ml={2}>
            ข้อมูลลูกค้า
          </Text>
        </Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="ชื่อ"
            radius="md"
            required
            {...form.getInputProps('customer.custFirstName')}
            maxLength={100}
          />
        </Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="นามสกุล"
            radius="md"
            required
            {...form.getInputProps('customer.custLastName')}
            maxLength={100}
          />
        </Grid.Col>
        <Grid.Col md={2}></Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="เบอร์มือถือ"
            radius="md"
            required
            pattern="[0][6,8,9][0-9]{8}"
            {...form.getInputProps('customer.mobileNo')}
            maxLength={10}
          />
        </Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="เบอร์โทรสำรอง"
            radius="md"
            pattern="[0][6,8,9][0-9]{8}"
            {...form.getInputProps('customer.contactNo')}
            maxLength={10}
          />
        </Grid.Col>
        <Grid.Col md={2}></Grid.Col>
        <Grid.Col md={5}>
          <Radio.Group name="gender" label="เพศ" spacing="xl" {...form.getInputProps('gender')}>
            <Radio value="1" label="ชาย" />
            <Radio value="2" label="หญิง" />
          </Radio.Group>
        </Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="LINE ID (ถ้ามี)"
            radius="md"
            {...form.getInputProps('customer.lineId')}
          />
        </Grid.Col>

        <Grid.Col xs={2} md={2}>
          <Text weight={400} size={16} ml={2}>
            ข้อมูลสถานที่ติดตั้ง
          </Text>
        </Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="บ้านเลขที่"
            radius="md"
            {...form.getInputProps('customer.address.homeNo')}
          />
        </Grid.Col>
        <Grid.Col md={5}>
          <TextInput label="หมู่ที่" radius="md" {...form.getInputProps('customer.address.moo')} />
        </Grid.Col>
        <Grid.Col xs={2} md={2}></Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="หมู่บ้าน/อาคาร"
            radius="md"
            maxLength={200}
            {...form.getInputProps('customer.address.building')}
          />
        </Grid.Col>
        <Grid.Col md={5}>
          <TextInput
            label="ซอย"
            radius="md"
            {...form.getInputProps('customer.address.soi')}
            maxLength={200}
          />
        </Grid.Col>
        <Grid.Col md={2}></Grid.Col>
        <Grid.Col md={10}>
          <TextInput
            label="ถนน"
            radius="md"
            {...form.getInputProps('customer.address.road')}
            maxLength={250}
          />
        </Grid.Col>
        <Grid.Col md={2}></Grid.Col>
        <Grid.Col md={5}>
          <Select
            label="จังหวัด:"
            radius="md"
            required
            data={provinces}
            {...form.getInputProps('customer.address.province')}
            onChange={async (e) => {
              if (e) {
                form.setFieldValue('customer.address.province', e)
                form.setFieldValue('customer.address.amphur', '')
                form.setFieldValue('customer.address.tambol', '')
                form.setFieldValue('customer.address.zipcode', '')
                setTambolValue([])
                const amphurs = await getDistrict(e)
                setAmphurValue(amphurs)
              }
            }}
            searchable
          />
          <Select
            label="อำเภอ:"
            radius="md"
            required
            data={amphurValue}
            {...form.getInputProps('customer.address.amphur')}
            onChange={async (e) => {
              if (e) {
                form.setFieldValue('customer.address.amphur', e)
                form.setFieldValue('customer.address.tambol', '')
                form.setFieldValue('customer.address.zipcode', '')
                const tambols = await getSubDistrict(form.values.customer.address.province, e)
                setTambolValue(tambols)
              }
            }}
            searchable
          />
          <Select
            label="ตำบล:"
            radius="md"
            required
            data={tambolValue}
            {...form.getInputProps('customer.address.tambol')}
            onChange={async (e) => {
              if (e) {
                form.setFieldValue('customer.address.tambol', e)
                const zipCode = tambolValue.find((f) => e === f.value)?.zipcode
                form.setFieldValue('customer.address.zipcode', zipCode)
              }
            }}
          />
          <TextInput
            disabled
            label="รหัสไปรษณีย์"
            radius="md"
            {...form.getInputProps('customer.address.zipcode')}
          />
          <NumberInput
            label="Latitude"
            radius="md"
            hideControls
            precision={6}
            {...form.getInputProps('customer.address.latitude')}
          />
          <NumberInput
            label="longitude"
            radius="md"
            hideControls
            precision={6}
            {...form.getInputProps('customer.address.longitude')}
          />
        </Grid.Col>
        <Grid.Col md={5}></Grid.Col>
        <Grid.Col md={2}></Grid.Col>
        <Grid.Col md={10}>
          <Group>
            <Grid.Col md={6}>
              <TextInput
                label="Link Google Map"
                radius="md"
                {...form.getInputProps('customer.address.latLongGoogleMapUrl')}
              />
            </Grid.Col>
            {form.values.customer.address.latLongGoogleMapUrl && (
              <Anchor
                c="blue"
                variant="link"
                href={form.values.customer.address.latLongGoogleMapUrl}
                target="_blank"
                style={{
                  display: 'flex',
                  alignSelf: 'flex-end',
                  marginBottom: '10px',
                  fontSize: '13px',
                }}
              >
                Open Link
              </Anchor>
            )}
          </Group>
        </Grid.Col>
      </Grid>
    </>
  )
}

export { CustomerInformationForm }

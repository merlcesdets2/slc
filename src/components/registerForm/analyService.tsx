import React from 'react'
import { Grid, Group, NumberInput, Radio, Select, Text, Textarea } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { registerFormProps } from 'types/register-form'
import { calculateAverageUnit, unitList } from '.'
import { UploadBillComponent } from './fileBill'

const formatter = (value: string | undefined) =>
  value && !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''

const parser = (value: string | undefined) => value && value.replace(/\$\s?|(,*)/g, '')

const AnalysisServiceForm = ({ form }: { form: UseFormReturnType<registerFormProps> }) => (
  <>
    <Group position="left">
      <Text weight={400} size={20} ml={2} mt={20}>
        STEP2: วิเคราะห์คุณสมบัติที่สามารถใช้ให้บริการลูกค้า
      </Text>
    </Group>
    <Grid mt={5} gutter="sm" style={{}}>
      <Grid.Col md={2}>
        <Text weight={400} size={16} ml={2}>
          อัตราค่าไฟ
        </Text>
      </Grid.Col>
      <Grid.Col xs={3} md={3}>
        <NumberInput
          label="ค่าไฟฟ้าประมาณเดือนละ(บาท)"
          radius="md"
          hideControls
          precision={2}
          parser={parser}
          formatter={formatter}
          {...form.getInputProps('electricBill')}
          required
        />
      </Grid.Col>
      <Grid.Col md={6}></Grid.Col>

      <Grid.Col md={2}>
        <Text weight={400} size={16} ml={2}>
          ยูนิตย้อนหลัง
        </Text>
      </Grid.Col>
      {unitList.map((e, i) => {
        return (
          <React.Fragment key={i}>
            <Grid.Col md={3}>
              <NumberInput
                label={`ย้อนหลังเดือนที่ ${e}`}
                radius="md"
                hideControls
                parser={parser}
                formatter={formatter}
                {...form.getInputProps(`electricityUnitsUsed${e}MonthsAgo`)}
              />
            </Grid.Col>
            <Grid.Col md={6}></Grid.Col>
            <Grid.Col md={2}></Grid.Col>
          </React.Fragment>
        )
      })}
      <Grid.Col md={3}>
        <NumberInput
          label={'ค่าเฉลี่ยการใช้ไฟฟ้า 6 เดือน (ยูนิต)'}
          radius="md"
          hideControls
          parser={parser}
          disabled
          formatter={formatter}
          value={(() => calculateAverageUnit(form))()}
        />
      </Grid.Col>
      <Grid.Col md={6}></Grid.Col>
      <Grid.Col md={2}></Grid.Col>
      <Grid.Col md={10}>
        <UploadBillComponent form={form} />
      </Grid.Col>

      <Grid.Col md={2}>
        <Text weight={400} size={16} ml={2}>
          พฤติกรรมการใช้ไฟฟ้า
        </Text>
      </Grid.Col>
      <Grid.Col md={6}>
        <Radio.Group
          name="placeProp"
          label="ลักษณะสถานที่"
          spacing="xl"
          {...form.getInputProps('buildingType')}
        >
          <Radio value="1" label="บ้าน/ที่พักอาศัย" />
          <Radio value="2" label="Home Office" />
          <Radio value="3" label="ร้านค้า/บริการ" />
          <Radio value="4" label="อื่นๆ" />
          {form.values.buildingType === '4' ? (
            <Textarea
              radius="md"
              w={'85%'}
              required={form.values.buildingType === '4'}
              {...form.getInputProps('buildingTypeDetails')}
              description="ระบุข้อมูลอื่นๆเพิ่มเติม"
            />
          ) : (
            <></>
          )}
        </Radio.Group>
      </Grid.Col>
      <Grid.Col md={4}></Grid.Col>
      <Grid.Col md={2}>
        <Text weight={400} size={16} ml={2}>
          ประมาณการใช้ไฟฟ้าเวลากลางวัน
        </Text>
      </Grid.Col>
      <Grid.Col md={3}>
        <NumberInput
          label="แอร์ (จำนวนเครื่อง)"
          radius="md"
          min={0}
          hideControls
          {...form.getInputProps('airConditionAmount')}
          precision={0}
        />
      </Grid.Col>
      <Grid.Col md={3}>
        <NumberInput
          label="จำนวนชั่วโมงที่ใช้งาน"
          radius="md"
          min={0}
          hideControls
          {...form.getInputProps('airConditionUsedHour')}
          precision={0}
        />
      </Grid.Col>
      <Grid.Col md={3}>
        <NumberInput
          label="ตู้เย็น (จำนวนเครื่อง)"
          radius="md"
          min={0}
          hideControls
          {...form.getInputProps('refrigeratorAmount')}
          precision={0}
        />
      </Grid.Col>
      <Grid.Col md={2}>
        <Text weight={400} size={16} ml={2}>
          อัตรากรใช้ไฟฟ้าเวลากลางวัน (06:00-18:00)
        </Text>
      </Grid.Col>
      <Grid.Col md={5}>
        <Select
          {...form.getInputProps('daytimeElectricScale')}
          data={[
            { value: 25, label: '25%' },
            { value: 50, label: '50%' },
            { value: 75, label: '75%' },
            { value: 100, label: '100%' },
          ]}
        />
      </Grid.Col>
      <Grid.Col md={4}></Grid.Col>
    </Grid>
  </>
)

export { AnalysisServiceForm }

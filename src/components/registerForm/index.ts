import { UseFormReturnType } from '@mantine/form'
import { registerFormProps } from 'types/register-form'
export { AnalysisServiceForm } from './analyService'
export { CustomerInformationForm } from './customerInfomation'

export const convertFormNumber = (data: registerFormProps) => {
  return {
    ...data,
    electricBill: Number(data.electricBill) || undefined,
    electricityUnitsUsed1MonthsAgo: Number(data.electricityUnitsUsed1MonthsAgo) || undefined,
    electricityUnitsUsed2MonthsAgo: Number(data.electricityUnitsUsed2MonthsAgo) || undefined,
    electricityUnitsUsed3MonthsAgo: Number(data.electricityUnitsUsed3MonthsAgo) || undefined,
    electricityUnitsUsed4MonthsAgo: Number(data.electricityUnitsUsed4MonthsAgo) || undefined,
    electricityUnitsUsed5MonthsAgo: Number(data.electricityUnitsUsed5MonthsAgo) || undefined,
    electricityUnitsUsed6MonthsAgo: Number(data.electricityUnitsUsed6MonthsAgo) || undefined,
    averageUnitsPast6Months: Number(data.averageUnitsPast6Months) || undefined,
    airConditionAmount: Number(data.airConditionAmount) || undefined,
    airConditionUsedHour: Number(data.airConditionUsedHour) || undefined,
    refrigeratorAmount: Number(data.refrigeratorAmount) || undefined,
    daytimeElectricScale: Number(data.daytimeElectricScale) || undefined,
    customer: {
      ...data.customer,
      address: {
        ...data.customer.address,
        latitude: Number(data.customer.address.latitude) || undefined,
        longitude: Number(data.customer.address.longitude) || undefined,
      },
    },
  }
}

export const unitList = Array.from(Array(6), (_, i) => i + 1)

export const calculateAverageUnit = (form: UseFormReturnType<registerFormProps>) => {
  const colectList = unitList
    .map((m) => {
      const key: keyof registerFormProps =
        `electricityUnitsUsed${m}MonthsAgo` as keyof registerFormProps
      return form.values[key] ? form.values[key] : 0
    })
    .reduce((a, b) => a + b, 0)
  const averageUnit = colectList / unitList.length
  return averageUnit
}

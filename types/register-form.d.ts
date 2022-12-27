export interface registerFormProps {
  registerTransactionId: string
  saleOrderId: string
  saleUserId: string
  customerRef: string
  surveyWorkOrderId: string
  electricPhaseType: string
  electricMeterAmp: string
  electricBillType: string
  daytimeElectricScale: number | undefined
  electricBill: number | undefined
  electricityUnitsUsed1MonthsAgo: number | undefined
  electricityUnitsUsed2MonthsAgo: number | undefined
  electricityUnitsUsed3MonthsAgo: number | undefined
  electricityUnitsUsed4MonthsAgo: number | undefined
  electricityUnitsUsed5MonthsAgo: number | undefined
  electricityUnitsUsed6MonthsAgo: number | undefined
  buildingRoofType: string
  buildingRoofTypeDetails: string
  airConditionAmount: number | undefined
  airConditionUsedHour: number | undefined
  refrigeratorAmount: number | undefined
  electricalApplianceOthersAmount: string
  buildingType: string
  solarCellType: string
  solarCellTypeDetail: string
  solarCellPowerType: string
  solarCellPowerTypeDetail: string
  solarCellBatteryBackup: string
  solarCellBatterySize: string
  stateCode: string
  customer: customerRefProps
  averageUnitsPast6Months: number | undefined
  urlBill: strring
}

interface customerProps {
  customerRef: string
  title: string
  custFirstName: string
  custLastName: string
  contactNo: string
  mobileNo: string
  personalRefType: string
  personalRefInfo: string
  lineId: string
  facebookId: string
  address: addressProps
}

interface addressProps {
  fullAddress: string
  building: string
  moo: string
  soi: string
  road: string
  tambol: string
  amphur: string
  province: string
  zipcode: string
  latitude: number | undefined
  longitude: number | undefined
  latLongGoogleMapUrl: string
}

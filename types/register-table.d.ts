export interface registerListProps {
  registerTransactionId: string
  registerChannelName: string
  provinceName: string
  registerStatusName: string
  firstName: string
  lastName: string
  telNo: string
  electricBill: number
  status: string
  saleOrderId: string
  saleOrderStatus: string
  updateDate: string
  updateUser: string
  createUser: string
  createDate: string
  customerRef: string
  province: string
  ticketNoList: string[]
  workOrderList: woList[]
  fullName: string
  stateCode: string
  stateName: string
  stateProcessList: stateProcessListProps[]
}

export interface stateProcessListProps {
  stateProcessName: string
  stateProcessCode: string
  showRemark: 'Y' | 'N'
}

interface woList {
  workorderId: string
}

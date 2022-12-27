import { ActionIcon, Tooltip } from '@mantine/core'
import { utils as xlsxUtile, writeFile as xlsxWriteFile } from 'xlsx'
import { IconFileSpreadsheet } from '@tabler/icons'
import { dateToString } from '../../util/helper'
import { registerListProps } from 'types/register-table'

export const ExportToExcel = ({ apiData }: { apiData: registerListProps[] }) => {
  const exportToCSV = (apiData: registerListProps[]) => {
    const exportData = apiData.map((d) => {
      return {
        registerTransactionId: d.registerTransactionId,
        registerChannelName: d.registerChannelName,
        firstName: d.firstName,
        lastName: d.lastName,
        telNo: d.telNo,
        provinceName: d.provinceName,
        electricBill: d.electricBill,
        customerRef: d.customerRef,
        saleOrderId: d.saleOrderId,
        stateCode: d.stateCode,
        stateName: d.stateName,
        ticketNoList: d.ticketNoList,
        createUser: d.createUser,
        createDate: d.createDate,
        updateUser: d.updateUser,
        updateDate: d.updateDate,
      }
    })

    const ws = xlsxUtile.json_to_sheet(exportData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const currData = dateToString(new Date())
    xlsxWriteFile(wb, `รายการลูกค้า_Solar_Home_${currData}.xlsx`)
  }

  return (
    <Tooltip label="Export Excel" color={'#1aa160'}>
      <ActionIcon color={'#1aa160'} size="lg" radius="md" onClick={() => exportToCSV(apiData)}>
        <IconFileSpreadsheet />
      </ActionIcon>
    </Tooltip>
  )
}

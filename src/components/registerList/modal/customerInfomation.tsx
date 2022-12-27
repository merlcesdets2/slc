import { Table, createStyles } from '@mantine/core'
import { registerListProps } from 'types/register-table'

const useStyles = createStyles(() => ({
  table: {
    marginBottom: 7,
    '& tbody tr td:first-of-type': {
      width: '35%',
      textAlign: 'right',
    },
    '& tbody tr td:last-of-type': {
      color: '#356859',
      fontWeight: 'bold',
    },
    '& tbody tr td': {
      border: 'none',
      padding: 4,
    },
  },
}))

export const CustomerInfo = (row: registerListProps) => {
  const { classes } = useStyles()
  return (
    <Table className={classes.table}>
      <tbody>
        <tr>
          <td>ชื่อ-นามสกุล ลูกค้า: </td>
          <td>
            {row.firstName} {row.lastName}
          </td>
        </tr>
        <tr>
          <td>เบอร์โทรติดต่อ: </td>
          <td>{row.telNo}</td>
        </tr>
        <tr>
          <td>ที่อยู่สถานที่ติดตั้ง: </td>
          <td>{row.provinceName}</td>
        </tr>
        <tr>
          <td>ค่าเฉลี่ยไฟฟ้า/เดือน: </td>
          <td>{row.electricBill} บาท</td>
        </tr>
        <tr>
          <td>วันที่สร้างรายการ: </td>
          <td>{row.createDate}</td>
        </tr>
        <tr>
          <td>ช่องทางการติดต่อ: </td>
          <td>{row.registerChannelName}</td>
        </tr>
      </tbody>
    </Table>
  )
}

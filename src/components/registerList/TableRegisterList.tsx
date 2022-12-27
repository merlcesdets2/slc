import { recieve } from '@/public/assets/images/actionIcon'
import {
  Button,
  Center,
  createStyles,
  Group,
  ScrollArea,
  Select,
  Table,
  UnstyledButton,
  Text,
} from '@mantine/core'
import Image from 'next/image'
import { ModalNoFlow, ModalHaveFlow, ModalReviedJob } from './modal'
import { registerListProps, stateProcessListProps } from 'types/register-table'
import Link from 'next/link'
import { useRegisterList } from '@/hook/registerList'
import { useRouter } from 'next/router'
import { AppConfig } from '@/AppConfig'
import React, { useEffect, useState } from 'react'
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons'

const recieveJobLogo = () => {
  return <Image src={recieve} alt="logo" width={20} height={20} />
}

const [
  SALE_ORDER_ID,
  FULL_NAME,
  TEL_NO,
  PROVINCE_NAME,
  ELECTRIC_BILL,
  REGISTER_CHANNEL_NAME,
  CREATE_USER,
  CREATE_DATE,
  UPDATE_USER,
  UPDATE_DATE,
] = [
  'saleOrderId',
  'fullName',
  'telNo',
  'provinceName',
  'electricBill',
  'registerChannelName',
  'createUser',
  'createDate',
  'updateUser',
  'updateDate',
]

const useStyles = createStyles(() => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#1aa160',
    zIndex: 1,
    fontWeight: 500,
    '& tr th': {
      color: 'white !important',
    },
    '& button div div': {
      fontWeight: 500,
      color: 'white !important',
    },
  },
}))

const TableRegisterList = ({ data }: { data: registerListProps[] }) => {
  const { classes } = useStyles()
  const [sortBy, setSortBy] = useState('')
  const [sortData, setSortData] = useState<registerListProps[]>(data)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  useEffect(() => {
    setSortData(data)
  }, [data])

  const router = useRouter()
  const { mutateRegisList } = useRegisterList()

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    const sortData2 = [...data].sort((a, b) => {
      if (reversed) {
        return String(b[field as keyof registerListProps]).localeCompare(
          String(a[field as keyof registerListProps]),
          undefined,
          {
            numeric: true,
            sensitivity: 'base',
          }
        )
      }
      return String(a[field as keyof registerListProps]).localeCompare(
        String(b[field as keyof registerListProps]),
        undefined,
        {
          numeric: true,
          sensitivity: 'base',
        }
      )
    })
    setSortData(sortData2)
  }

  function Th({
    children,
    onSort,
    reversed,
    sorted,
    width,
  }: {
    children: React.ReactNode
    onSort: () => void
    reversed: boolean
    sorted: boolean
    width: string
  }) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
    return (
      <th style={{ minWidth: width }}>
        <UnstyledButton onClick={onSort} w={'100%'}>
          <Group position={'apart'}>
            <Text weight={400} size="sm">
              {children}
            </Text>
            <Center>
              <Icon size={14} />
            </Center>
          </Group>
        </UnstyledButton>
      </th>
    )
  }

  const ShowModalFlowOrNot = (v: stateProcessListProps | undefined, index: number) => {
    return v?.showRemark === 'N'
      ? ModalHaveFlow(sortData[index], v, mutateRegisList)
      : ModalNoFlow(sortData[index], v, mutateRegisList)
  }

  const Receive = ({ index }: { index: number }) => {
    const flowList = sortData[index].stateProcessList

    const mapFlow = flowList.map((f) => {
      return {
        value: f.stateProcessCode,
        label: `${f.stateProcessCode}: ${f.stateProcessName}`,
      }
    })

    return (
      <Select
        data={mapFlow}
        w={200}
        onChange={(v) =>
          ShowModalFlowOrNot(
            flowList.find((item) => item.stateProcessCode === v),
            index
          )
        }
        placeholder="เลือกขั้นตอนทำงาน"
      />
    )
  }

  const rows = sortData.map((d, index) => {
    const hasTk = d.ticketNoList.length
    const newTapTk = hasTk ? (
      d.ticketNoList.map((d) => {
        const [year, id] = hasTk ? d.split('-') : []
        return (
          <a
            key={id}
            target="_blank"
            href={`${AppConfig.frontEndUrl}\/JAS_POWER_CC/dist/index.html?pages=detailTicket&ticketNo=${id}&contactYear=${year}&from=search`}
            rel="noopener noreferrer"
          >
            {d} <br />
          </a>
        )
      })
    ) : (
      <></>
    )

    const hasWo = d.workOrderList.length
    const woLink = hasWo ? (
      d.workOrderList.map((dd) => {
        return (
          <a
            key={dd.workorderId}
            target="_blank"
            href={`https://energycsc-service.jasmine.com/JASENERGY/?WoNo=${dd.workorderId}`}
            rel="noopener noreferrer"
          >
            {dd.workorderId} <br />
          </a>
        )
      })
    ) : (
      <></>
    )

    const hasState = d.stateCode
    const stateColor = hasState && hasState === 'ORCC' ? 'red' : 'black'

    return (
      <tr key={index}>
        <td>
          {d.registerStatusName === 'Receive' ? (
            <Receive index={index} />
          ) : (
            <Center>
              <Button
                size="sm"
                radius={'lg'}
                leftIcon={recieveJobLogo()}
                onClick={() => ModalReviedJob(sortData[index], router)}
              >
                รับงาน
              </Button>
            </Center>
          )}
        </td>
        <td>
          {d.saleOrderId ? (
            <Link href={`/register-form?refId=${d.saleOrderId}`} prefetch={false}>
              {d.saleOrderId}
            </Link>
          ) : (
            '-'
          )}
          <br />
          {woLink}
        </td>
        <td style={{ color: stateColor }}>
          {d.stateCode ? `${d.stateCode} : ${d.stateName}` : '-'}
        </td>
        <td>{newTapTk}</td>
        <td>คุณ {d.fullName}</td>
        <td>{d.telNo}</td>
        <td>{d.provinceName}</td>
        <td style={{ textAlign: 'right' }}>{d.electricBill}</td>
        <td>{d.registerChannelName}</td>
        <td>{d.createUser}</td>
        <td>{d.createDate}</td>
        <td>{d.updateUser}</td>
        <td>{d.updateDate}</td>
      </tr>
    )
  })

  return (
    <>
      <ScrollArea style={{ height: '60vh' }} scrollHideDelay={500} offsetScrollbars>
        <Table striped highlightOnHover>
          <thead className={classes.header}>
            <tr>
              <th style={{ textAlign: 'center' }}>ขั้นตอนถัดไป</th>
              <Th
                onSort={() => setSorting(SALE_ORDER_ID)}
                reversed={reverseSortDirection}
                sorted={sortBy === SALE_ORDER_ID}
                width={'130px'}
              >
                Sale Order
              </Th>
              <th style={{ minWidth: '100px' }}>ขั้นตอนล่าสุด</th>
              <th style={{ minWidth: '100px' }}>Ticket No.</th>
              <Th
                onSort={() => setSorting(FULL_NAME)}
                reversed={reverseSortDirection}
                sorted={sortBy === FULL_NAME}
                width={'160px'}
              >
                ชื่อลูกค้า
              </Th>
              <Th
                onSort={() => setSorting(TEL_NO)}
                reversed={reverseSortDirection}
                sorted={sortBy === TEL_NO}
                width={'130px'}
              >
                เบอร์โทร
              </Th>
              <Th
                onSort={() => setSorting(PROVINCE_NAME)}
                reversed={reverseSortDirection}
                sorted={sortBy === PROVINCE_NAME}
                width={'130px'}
              >
                จังหวัดติดตั้ง
              </Th>
              <Th
                onSort={() => setSorting(ELECTRIC_BILL)}
                reversed={reverseSortDirection}
                sorted={sortBy === ELECTRIC_BILL}
                width={'130px'}
              >
                ค่าเฉลี่ยไฟฟ้า
                <br />
                /เดือน
              </Th>
              <Th
                onSort={() => setSorting(REGISTER_CHANNEL_NAME)}
                reversed={reverseSortDirection}
                sorted={sortBy === REGISTER_CHANNEL_NAME}
                width={'135px'}
              >
                ช่องทางติดต่อ
              </Th>
              <Th
                onSort={() => setSorting(CREATE_USER)}
                reversed={reverseSortDirection}
                sorted={sortBy === CREATE_USER}
                width={'160px'}
              >
                ผู้สร้างรายการ
              </Th>
              <Th
                onSort={() => setSorting(CREATE_DATE)}
                reversed={reverseSortDirection}
                sorted={sortBy === CREATE_DATE}
                width={'150px'}
              >
                วันที่สร้างรายการ
              </Th>
              <Th
                onSort={() => setSorting(UPDATE_USER)}
                reversed={reverseSortDirection}
                sorted={sortBy === UPDATE_USER}
                width={'150px'}
              >
                ผู้ปรับปรุงรายการ
              </Th>
              <Th
                onSort={() => setSorting(UPDATE_DATE)}
                reversed={reverseSortDirection}
                sorted={sortBy === UPDATE_DATE}
                width={'140px'}
              >
                วันที่
                <br />
                ปรับปรุงรายการ
              </Th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  )
}

export default TableRegisterList

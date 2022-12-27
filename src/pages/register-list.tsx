import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Stack, Group, Title, Text, Select, Notification } from '@mantine/core'
import { Custom500 } from '@/components/error/500'
import { ExportToExcel } from '@/components/tableUtill/exportExcel'
import TableRegisterList from '@/components/registerList/TableRegisterList'
import Refresh from '@/components/tableUtill/refresh'
import SearchBox from '@/components/tableUtill/searchBox'
import Loading from '@/components/loading'
import { registerListProps } from 'types/register-table'
import { useRegisterList } from '@/hook/registerList'
import { AppConfig } from '@/AppConfig'
const { apiUrl } = AppConfig

const SEARCH_COLUMN = [
  'fullName',
  'telNo',
  'saleOrderId',
  'provinceName',
  'stateName',
  'stateCode',
  'electricBill',
]

const List = () => {
  const [listData, setListData] = useState([])

  const { data, error, mutateRegisList, isLoading, isValidating } = useRegisterList()
  const { data: stateList } = useSWR(`${apiUrl}/jas-energy-customer/service/util/state/info`)
  const valueState =
    sessionStorage['CurrentState'] == undefined ? '' : sessionStorage['CurrentState']

  useEffect(() => {
    if (data && (!valueState || valueState === 'all')) setListData(data)
    if (data && valueState && valueState !== 'all')
      setListData(() => {
        return data.filter((row: registerListProps) => {
          return row.stateCode === valueState
        })
      })
  }, [data, valueState])

  if (error || data?.error) return <Custom500 />
  if (isLoading || !stateList) return <Loading />

  const selectValue = stateList.map((state: { stateCode: string; stateName: string }) => {
    return {
      value: state.stateCode,
      label: state.stateName,
    }
  })

  selectValue.unshift({ value: 'all', label: 'ALL' })

  const search = (value: string) => {
    const keys = SEARCH_COLUMN
    const query = value.toLowerCase().trim()
    const matchWord = data.filter((row: registerListProps) => {
      return keys.some((key) => {
        const val = row[key as keyof registerListProps]
        return val.toString().toLowerCase().includes(query)
      })
    })
    setListData(matchWord)
  }

  const handleFilter = (v: string) => {
    sessionStorage['CurrentState'] = v
    if (!v) return
    if (v === 'all') return search('')
    return search(v)
  }

  return (
    <>
      <Stack>
        {false && <div style={{ backgroundColor: 'white', padding: '15px' }}>สถานะงานประจำวัน</div>}
        <Title order={3} style={{ fontFamily: 'Noto Sans Thai' }}>
          รายการลูกค้าประสงค์ใช้บริการ
        </Title>
        <div style={{ padding: '15px', backgroundColor: 'white' }}>
          <Group mb="md" position="apart">
            <SearchBox cb={search} />
            <Group spacing={10}>
              <Refresh onClick={() => mutateRegisList()} />
              <ExportToExcel apiData={listData} />
            </Group>
          </Group>
          <Group pb={18} position="apart">
            <Group>
              <Text> สถานะ</Text>
              <Select defaultValue={valueState} data={selectValue} onChange={handleFilter} />
            </Group>
            {isValidating && (
              <Notification
                loading
                title="Data Loading..."
                disallowClose
                color="green"
                radius="xl"
              />
            )}
          </Group>
          <TableRegisterList data={listData} />
        </div>
      </Stack>
    </>
  )
}

export default List

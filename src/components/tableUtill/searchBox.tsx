import { TextInput } from '@mantine/core'
import { useState } from 'react'

export default function SearchBox({ cb }: { cb: (val: string) => void }) {
  const [textSearch, setTextSearch] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const text = e.currentTarget ? e.currentTarget.value : ''
    setTextSearch(text)
    cb(text)
  }

  return (
    <TextInput
      value={textSearch}
      placeholder="ค้นหาด้วย: ชื่อ-นามสกุล, เบอร์โทรศัพท์, จังหวัด, จำนวนค่าไฟฟ้า หรือ ขั้นตอนทำงาน"
      w={'70%'}
      styles={() => ({
        input: { backgroundColor: 'white' },
      })}
      onChange={handleSearch}
    />
  )
}

import { ActionIcon, Button, FileInput, Group, Stack, Text, Loader } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { registerFormProps } from 'types/register-form'
import { openModal } from '@mantine/modals'
import { IconTrash } from '@tabler/icons'
import axios from 'axios'
import MD5 from 'crypto-js/md5'
import useSWR from 'swr'
import { AppConfig } from '@/AppConfig'
import { useState } from 'react'
import { getSession } from 'next-auth/react'

const { fileUrl } = AppConfig
const apiUrl = `${fileUrl}/v4/file`

const getAccessTokenFile = async () => {
  const session = await getSession()
  const token = session?.accessToken
  return token
}

const fileFetcher = async (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${await getAccessTokenFile()}`,
      },
    })
    .then((res) => res.data)

const fileDeleter = async (fileNum: string) =>
  axios
    .delete(apiUrl, {
      headers: { Authorization: `Bearer ${await getAccessTokenFile()}` },
      data: { fileNum, reason: 'delete form solarH' },
    })
    .then((res) => res.data)

const filePoster = async (formData: FormData) =>
  await axios
    .post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${await getAccessTokenFile()}`,
      },
    })
    .catch((error) => {
      console.log(error)
      if (error.response.status === 400)
        return openModal({
          title: <Text color={'red'}>Upload รูปภาพไม่สำเร็จ</Text>,
          children: (
            <>
              <Text>{error.response.data.errCode}</Text>
              <Text>{error.response.data.errMsg}</Text>
            </>
          ),
        })
    })

const fileDownloader = async (fileNum: string) => {
  const fileDownloaded = await axios
    .get(`${apiUrl}?fileNum=${fileNum}`, {
      headers: {
        Authorization: `Bearer ${await getAccessTokenFile()}`,
      },
    })
    .then((res) => res.data)
  window.open(fileDownloaded.url, '_blank')
}

export const uploadBill = async ({
  urlBill,
  customerRef,
  saleOrderId,
}: {
  urlBill: string[]
  customerRef: string
  saleOrderId: string
}) => {
  urlBill.forEach((file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileGroupCode', '01')
    formData.append('fileTypeCode', '01')
    formData.append('customerRef', customerRef)
    formData.append('channCode', 'solarH')
    formData.append('workNum', saleOrderId)
    formData.append('fileDtm', '2022-12-23')
    formData.append('md5sum', MD5(file).toString())
    formData.append('uploadBy', 'upload by solar home')

    filePoster(formData)
  })
}

export function UploadBillComponent({ form }: { form: UseFormReturnType<registerFormProps> }) {
  const { fileList, isLoading, mutateFile, isValidating } = useFillBill(form.values.saleOrderId)
  const [triggerDelete, setTriggerDelete] = useState(false)

  if (isLoading || !fileList) return <></>

  const fileActive = fileList.map((f: { fileName: string; fileNum: string }, i: number) => {
    return (
      <Group key={i}>
        <Text color={'blue'} variant="link" size={13} onClick={() => fileDownloader(f.fileNum)}>
          {f.fileName}
        </Text>
        {!triggerDelete && (
          <ActionIcon color="red" onClick={() => setTriggerDelete(true)}>
            <IconTrash size={24} />
          </ActionIcon>
        )}
        {triggerDelete && (
          <>
            <Button
              color="red"
              radius="xl"
              size="xs"
              compact
              onClick={() => {
                fileDeleter(f.fileNum)
                mutateFile()
              }}
            >
              Confirm Remove
            </Button>
            <Button
              color="gray"
              radius="xl"
              size="xs"
              compact
              onClick={() => setTriggerDelete(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </Group>
    )
  })

  return (
    <Stack>
      <FileInput
        w={'45%'}
        multiple
        {...form.getInputProps('urlBill')}
        label={'อัฟโหลด ค่าใช้ไฟฟ้า'}
      />
      {isValidating && (
        <Group>
          <Loader /> validating ...
        </Group>
      )}
      {fileActive}
    </Stack>
  )
}

export function useFillBill(saleOrderId: string) {
  const urlGetFile = `${fileUrl}/v4/doc?workNum=${saleOrderId}&fileGroupCode=01`
  const { data, error, mutate: mutateFile, isValidating } = useSWR(urlGetFile, fileFetcher)

  const filterOutDeleteFile =
    data && data.filter((f: { fileStatusID: number }) => f.fileStatusID === 1)

  return {
    fileList: filterOutDeleteFile,
    isLoading: !error && !data,
    error,
    mutateFile,
    isValidating,
  }
}

import { Stack, Text, Button } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import { IconCircleCheck, IconCircleX } from '@tabler/icons'
import { ResponseProps } from 'types/response-backend'

const StackChild = ({ children }: { children: React.ReactNode }) => (
  <Stack align="center" ta="center">
    {children}
  </Stack>
)

export function bePopup({ returnCode, errorMessage }: ResponseProps) {
  switch (returnCode) {
    case 'S':
      return openModal({
        centered: true,
        children: (
          <>
            <StackChild>
              <IconCircleCheck size={100} color={'green'} />
              <Text>บันทึกข้อมูลสำเร็จเรียบร้อย</Text>
              <Button onClick={() => closeAllModals()} mt="md">
                รับทราบ
              </Button>
            </StackChild>
          </>
        ),
      })
    case 'F':
      return openModal({
        centered: true,
        title: '',
        children: (
          <>
            <StackChild>
              <IconCircleX size={100} color={'red'} />
              <Text>{errorMessage}</Text>
              <Text>บันทึกข้อมูลไม่สำเร็จ พบข้อผิดพลาด</Text>
            </StackChild>
          </>
        ),
      })
    default:
      return openModal({
        centered: true,
        title: '',
        children: (
          <>
            <StackChild>
              <IconCircleX size={100} color={'red'} />
              <Text>{errorMessage}</Text>
              <Text>บันทึกข้อมูลไม่สำเร็จ</Text>
            </StackChild>
          </>
        ),
      })
  }
}

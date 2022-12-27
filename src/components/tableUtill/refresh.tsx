import { ActionIcon, Tooltip } from '@mantine/core'
import { IconRefresh } from '@tabler/icons'

export default function Refresh({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip label="Refresh Data" color={'#1aa160'}>
      <ActionIcon color={'#1aa160'} size="lg" radius="md" onClick={onClick}>
        <IconRefresh />
      </ActionIcon>
    </Tooltip>
  )
}

import useSWR from 'swr'
import { AppConfig } from '@/AppConfig'
const { apiUrl } = AppConfig

const urlRegister = `${apiUrl}/jas-energy-customer/service/customer/register`

export function useRegisterList() {
  const { data, error, mutate: mutateRegisList, isValidating } = useSWR(urlRegister)

  return {
    data,
    isLoading: !error && !data,
    error,
    mutateRegisList,
    isValidating,
  }
}

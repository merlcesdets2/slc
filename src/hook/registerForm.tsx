import useSWR from 'swr'
import { AppConfig } from '@/AppConfig'
import { convertFormNumber } from '@/components/registerForm'
import { registerFormProps } from 'types/register-form'
const { apiUrl } = AppConfig

export function useRegisterForm(refId: string) {
  const urlRegister = `${apiUrl}/jas-energy-customer/service/customer/saleorder?refId=${refId}`
  const { data, error, mutate: mutateRegisList, isValidating } = useSWR(refId ? urlRegister : null)
  const mapData: registerFormProps = data && convertFormNumber(data)

  return {
    data: mapData,
    isLoading: !error && !data,
    error,
    mutateRegisList,
    isValidating,
  }
}

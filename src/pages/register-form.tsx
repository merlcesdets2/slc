import { useRouter } from 'next/router'
import FormRegister from '@/components/registerForm/form'
import { useRegisterForm } from '@/hook/registerForm'
import Loading from '@/components/loading'

const Regisform = () => {
  const router = useRouter()
  const refId = String(router.query.refId)
  const checkRefId = refId === 'undefined' ? '' : refId
  const { data, isLoading, isValidating } = useRegisterForm(checkRefId)
  if (isLoading || isValidating) return <Loading />

  return <FormRegister initData={data} />
}

export default Regisform

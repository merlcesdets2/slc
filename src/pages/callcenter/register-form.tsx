import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import FormRegister from '@/components/registerForm/form'
import getFormServerside from '@/components/registerForm/serversideForm'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getFormServerside(context)
  return {
    props: {
      initData: data,
    },
  }
}

const Regisform = ({ initData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <FormRegister initData={initData} />
}

export default Regisform

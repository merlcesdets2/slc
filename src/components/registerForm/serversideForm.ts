import { apiCall } from '@/util/axiosConfig'
import { AppConfig } from '@/AppConfig'
import { GetServerSidePropsContext, PreviewData } from 'next/types'
import { ParsedUrlQuery } from 'querystring'
import { convertFormNumber } from '.'

const { apiUrl } = AppConfig

export default async function getFormServerside(
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const { query } = context
  const { refId } = query

  const urlGetForm = `${apiUrl}/jas-energy-customer/service/customer/saleorder?refId=${refId}`
  const { data } = await apiCall.get(urlGetForm)
  const formData = convertFormNumber(data)
  return formData
}

import { useRouter } from 'next/router'

export default function SearchCustomer() {
  const router = useRouter()
  const { customerId } = router.query
  const param = customerId ? `&customerId=${customerId}` : ''

  return (
    <>
      <iframe
        src={`/JAS_POWER_CC/dist/index.html?page=searchCustomer${param}`}
        style={{ width: '100%', minHeight: '2200px', border: '0px' }}
      ></iframe>
    </>
  )
}

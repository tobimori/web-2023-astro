import type { KirbyQueryRequest, KirbyQueryResponse } from 'kirby-fest'

const { KIRBY_HEADLESS_API_TOKEN, KIRBY_HEADLESS_API_URL } = import.meta.env
if (!KIRBY_HEADLESS_API_TOKEN || !KIRBY_HEADLESS_API_URL) {
  throw new Error('Missing KIRBY_HEADLESS_API_TOKEN / KIRBY_HEADLESS_API_URL')
}

export const fetchKql = async <
  ResT extends KirbyQueryResponse = KirbyQueryResponse,
  ReqT extends KirbyQueryRequest = KirbyQueryRequest
>(
  query: ReqT
): Promise<ResT> => {
  const response = await fetch(`${KIRBY_HEADLESS_API_URL}/api/kql`, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      Authorization: `Bearer ${KIRBY_HEADLESS_API_TOKEN}`
    }
  })

  return response.json()
}

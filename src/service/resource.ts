import { http } from '@/utils/http'

export type IndexResourceReturnType = {
  list: IndexResourceType[]
  total: number
}

export const getIndexResourceList = (data: PageParams) => {
  return http<IndexResourceReturnType>({
    method: 'POST',
    url: '/resource/page',
    data,
  })
}

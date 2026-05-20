import axios from 'axios'
import { getDefaultStore } from 'jotai/vanilla'
import { apiRoutesAtom } from '../store/apiRoutes'

const store = getDefaultStore()

function createApiClient() {
  const { baseURL } = store.get(apiRoutesAtom)

  return axios.create({
    baseURL,
  })
}

export async function getVagas() {
  const { vagasList } = store.get(apiRoutesAtom)
  const api = createApiClient()
  const response = await api.get(vagasList)
  return response.data
}

export async function getVagaById(id) {
  const { vagaByIdBase } = store.get(apiRoutesAtom)
  const api = createApiClient()
  const response = await api.get(`${vagaByIdBase}/${id}`)
  return response.data
}
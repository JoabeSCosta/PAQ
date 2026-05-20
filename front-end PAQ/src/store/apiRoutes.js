import { atomWithStorage } from 'jotai/utils'

export const apiRoutesAtom = atomWithStorage('paq-api-routes', {
  baseURL: '/api',
  vagasList: '/buscar-vagas',
  vagaByIdBase: '/buscar-vagas',
})
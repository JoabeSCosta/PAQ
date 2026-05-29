// Arquivo: vagasApi.js
// Propósito: cliente HTTP local para consumir os endpoints de vagas.
// Contém funções utilitárias que retornam dados prontos para uso pelos componentes.
import axios from 'axios'
import { apiRoutes } from '../store/apiRoutes'

function createApiClient() {
  // Cria uma instância do axios com a `baseURL` centralizada.
  // Isso facilita testes ou mudanças de ponto de entrada da API.
  return axios.create({
    baseURL: apiRoutes.baseURL,
  })
}

export async function getVagas() {
  // Retorna a lista completa de vagas (o backend atual entrega tudo em uma rota).
  const api = createApiClient()
  const response = await api.get(apiRoutes.vagasList)
  return response.data
}

export async function getVagaById(id) {
  // Retorna os detalhes de uma vaga específica a partir do identificador.
  const api = createApiClient()
  const response = await api.get(`${apiRoutes.vagaByIdBase}/${id}`)
  return response.data
}
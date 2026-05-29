// Arquivo: apiRoutes.js
// Propósito: armazenar as rotas / endpoints usados pelo front-end.
// Nota: originalmente isto era um `atom` do Jotai; foi substituído por
// um objeto simples para evitar dependência de estado global apenas para rotas.
// Se o backend evoluir para suporte a query params (busca/paginação), aqui
// é um bom lugar para centralizar esses padrões.
export const apiRoutes = {
  // URL base para o cliente HTTP
  baseURL: '/api',

  // Endpoint para listar todas as vagas
  vagasList: '/buscar-vagas',

  // Base para pegar uma vaga por id (usado como `${vagaByIdBase}/${id}`)
  vagaByIdBase: '/buscar-vagas',
}
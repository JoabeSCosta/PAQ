// Arquivo: Vagas.jsx
// Propósito: página principal de listagem de vagas.
// Seções:
//  - importações e dependências
//  - estado local (vagas, loading, erro, paginação, pesquisa)
//  - efeitos para carregar dados do backend
//  - lógica de filtragem e paginação (client-side)
//  - renderização da grade de vagas e componentes auxiliares
import { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import { getVagas } from '../services/vagasApi'

function Vagas() {
  // Estado: dados trazidos da API
  const [vagas, setVagas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Estado: paginação e pesquisa locais
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const itemsPerPage = 6
  const searchTermNormalizado = searchTerm.trim().toLowerCase()

  // Filtragem client-side: procura por título, nome, empresa, local ou descrição
  const vagasFiltradas = vagas.filter((vaga) => {
    if (!searchTermNormalizado) return true

    const textoBase = [vaga.title, vaga.name, vaga.company, vaga.location, vaga.description]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return textoBase.includes(searchTermNormalizado)
  })

  // Cálculo de páginas a partir dos resultados filtrados
  const totalPages = Math.ceil(vagasFiltradas.length / itemsPerPage)
  const paginaAtual = totalPages === 0 ? 1 : Math.min(currentPage, totalPages)

  // Fatia os resultados para a página atual
  const vagasDaPagina = vagasFiltradas.slice(
    (paginaAtual - 1) * itemsPerPage,
    paginaAtual * itemsPerPage,
  )

  // Efeito: carregar vagas na montagem do componente
  useEffect(() => {
    let ativo = true

    async function carregarVagas() {
      try {
        setLoading(true)
        setError('')
        const data = await getVagas()

        if (ativo) setVagas(data)
      } catch {
        if (ativo) setError('Não foi possível carregar as vagas no momento.')
      } finally {
        if (ativo) setLoading(false)
      }
    }

    carregarVagas()

    return () => {
      ativo = false
    }
  }, [])

  // Handler: atualiza o termo de pesquisa e reseta a página para 1
  function handleSearchChange(valor) {
    setSearchTerm(valor)
    setCurrentPage(1)
  }

  // Renderizações simples para loading/erro
  if (loading) return <div>Carregando vagas...</div>
  if (error) return <div>{error}</div>

  // JSX: composição da página com SearchInput, grade e paginação
  return (
    <div className='min-h-screen bg-slate-200 pb-10'>
      <SearchInput value={searchTerm} onChange={handleSearchChange} />

      <div className='mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3'>
        {vagasDaPagina.map((job) => {
          const jobId = String(job._id ?? job.id_vaga_external)

          return (
            <JobCard
              key={jobId}
              id={jobId}
              title={job.title || job.name}
              company={job.company}
              location={job.location}
              description={job.description}
            />
          )
        })}
      </div>

      {vagasFiltradas.length === 0 && (
        <p className='mx-auto mt-10 max-w-6xl px-4 text-center text-sm text-slate-600'>
          Nenhuma vaga encontrada com esse filtro.
        </p>
      )}

      <Pagination currentPage={paginaAtual} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default Vagas
import { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'
import { getVagas } from '../services/vagasApi'
import AiChat from '../container/AiChat'

function Vagas() {
  const [vagas, setVagas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6
  const totalPages = Math.ceil(vagas.length / itemsPerPage)

  const vagasDaPagina = vagas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

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

  if (loading) return <div>Carregando vagas...</div>

  if (error) return <div>{error}</div>

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4 py-8">
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

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-2 py-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg bg-white px-4 py-2 transition hover:bg-slate-900 hover:text-white disabled:opacity-50 disabled:hover:bg-white"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`rounded-lg px-4 py-2 transition ${
              currentPage === page
                ? 'bg-slate-900 text-white shadow-inner'
                : 'bg-white hover:bg-slate-500 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded-lg bg-white px-4 py-2 transition hover:bg-slate-900 hover:text-white disabled:opacity-50 disabled:hover:bg-white"
        >
          Próxima
        </button>
      </div>
      <AiChat/>
    </div>
  )
}

export default Vagas
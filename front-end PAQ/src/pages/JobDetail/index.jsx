// Arquivo: JobDetail/index.jsx
// Propósito: página de detalhes de uma vaga específica.
// Seções principais:
//  - carregamento dos dados da vaga (efeito)
//  - estados locais (job, loading, error)
//  - renderizações condicionais para loading/erro/não encontrado/sucesso
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVagaById } from '../../services/vagasApi'
import StatusVaga from './StatusVaga'
import JobNaoEncontrada from './JobNaoEncontrada'

function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Efeito: carrega os dados da vaga quando `id` muda.
  // Usa a flag `ativo` para evitar atualizações de estado quando o componente desmonta.
  useEffect(() => {
    let ativo = true

    async function carregarVaga() {
      try {
        setLoading(true)
        setError('')
        const vaga = await getVagaById(id)

        if (ativo) {
          setJob(vaga)
        }
      } catch {
        if (ativo) {
          setError('Não foi possível carregar os detalhes da vaga.')
        }
      } finally {
        if (ativo) {
          setLoading(false)
        }
      }
    }

    carregarVaga()

    return () => {
      ativo = false
    }
  }, [id])

  // Renderização: estado de carregamento
  if (loading) {
    return (
      <main className='min-h-screen bg-slate-100 px-4 py-10'>
        <div className='mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow'>
          <p className='text-slate-700'>Carregando detalhes da vaga...</p>
        </div>
      </main>
    )
  }

  // Renderização: estado de erro
  if (error) {
    return (
      <main className='min-h-screen bg-slate-100 px-4 py-10'>
        <div className='mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow'>
          <h1 className='text-2xl font-bold text-slate-800'>Erro ao carregar vaga</h1>
          <p className='mt-2 text-slate-600'>{error}</p>
          <Link
            to='/'
            className='mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700'
          >
            Voltar para vagas
          </Link>
        </div>
      </main>
    )
  }

  // Renderização: vaga não encontrada
  if (!job) {
    return <JobNaoEncontrada />
  }

  return (
    <main className='min-h-screen bg-slate-100 px-4 py-10'>
      <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-3'>
        {/* Seção principal: título e descrição */}
        <section className='rounded-2xl bg-white p-6 shadow lg:col-span-2'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-sky-600'>Detalhes da vaga</p>
          <h1 className='mt-3 text-3xl font-bold text-slate-900'>{job.title || job.name}</h1>

          {/* Metadados rápidos (empresa, local, link) usando StatusVaga */}
          <div className='mt-4 flex flex-wrap gap-3'>
            <StatusVaga texto={`Empresa: ${job.company || 'Não informada'}`} cor='#0f172a' />
            <StatusVaga texto={`Local: ${job.location || 'Não informado'}`} cor='#1d4ed8' />
            <StatusVaga
              texto='Ver anúncio original'
              link={job.redirect_url}
              cor='#059669'
            />
          </div>

          <h2 className='mt-8 text-lg font-semibold text-slate-800'>Descrição da vaga</h2>
          <p className='mt-2 whitespace-pre-line leading-relaxed text-slate-700'>
            {job.description}
          </p>
        </section>

        <aside className='rounded-2xl bg-white p-6 shadow'>
          <h2 className='text-lg font-semibold text-slate-900'>Resumo da vaga</h2>

          <div className='mt-4 space-y-3 text-sm text-slate-700'>
            <div className='rounded-lg bg-slate-50 p-3'>
              <p className='text-slate-500'>ID Externa</p>
              <p className='font-semibold'>{job.id_vaga_external}</p>
            </div>

            <div className='rounded-lg bg-slate-50 p-3 wrap-break-words'>
              <p className='text-slate-500'>Atualizado em</p>
              <p className='font-semibold'>
                {new Date(job.updatedAt || job.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <Link
            to='/'
            className='mt-6 block w-full rounded-lg border border-slate-300 py-3 text-center font-semibold text-slate-700 hover:bg-slate-100'
          >
            Voltar para listagem
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default JobDetail
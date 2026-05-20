import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVagaById } from '../services/vagasApi'

function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  if (loading) {
    return (
      <main className='min-h-screen bg-slate-100 px-4 py-10'>
        <div className='mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow'>
          <p className='text-slate-700'>Carregando detalhes da vaga...</p>
        </div>
      </main>
    )
  }

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

  if (!job) {
    return (
      <main className='min-h-screen bg-slate-100 px-4 py-10'>
        <div className='mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow'>
          <h1 className='text-2xl font-bold text-slate-800'>Vaga não encontrada</h1>
          <p className='mt-2 text-slate-600'>
            Não encontramos a vaga solicitada. Verifique o link ou volte para a listagem.
          </p>
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

  return (
    <main className='min-h-screen bg-slate-100 px-4 py-10'>
      <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-3'>
        <section className='rounded-2xl bg-white p-6 shadow lg:col-span-2'>
          <h1 className='mt-3 text-3xl font-bold text-slate-900'>{job.title || job.name}</h1>

          <div className='mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600'>
            <span className='rounded-full bg-slate-100 px-3 py-1'>🏢 {job.company}</span>
            <span className='rounded-full bg-slate-100 px-3 py-1'>📍 {job.location}</span>
            <span className='rounded-full bg-slate-100 px-3 py-1'>🕒 {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>

          <h2 className='mt-8 text-lg font-semibold text-slate-800'>Descrição da vaga</h2>
          <p className='mt-2 leading-relaxed text-slate-700 whitespace-pre-line'>{job.description}</p>
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

          <a
            href={job.redirect_url}
            target='_blank'
            rel='noreferrer'
            className='mt-6 inline-block w-full rounded-lg bg-emerald-600 py-3 text-center font-semibold text-white hover:bg-emerald-700'
          >
            Ver anúncio original
          </a>

          <Link
            to='/'
            className='mt-3 block w-full rounded-lg border border-slate-300 py-3 text-center font-semibold text-slate-700 hover:bg-slate-100'
          >
            Voltar para listagem
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default JobDetail
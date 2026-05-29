// Arquivo: JobNaoEncontrada.jsx
// Propósito: componente simples para indicar que a vaga requisitada não foi encontrada.
import { Link } from 'react-router-dom'

function JobNaoEncontrada() {
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

export default JobNaoEncontrada
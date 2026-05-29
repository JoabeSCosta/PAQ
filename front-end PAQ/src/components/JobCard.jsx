import { Link } from 'react-router-dom'
import { ArrowRight, Building2, MapPin } from 'lucide-react'

// Arquivo: JobCard.jsx
// Propósito: cartão representando uma vaga na grade de listagem.
// Seções:
// - cabeçalho do cartão (ícone + label)
// - título e empresa
// - descrição resumida
// - rodapé com ação para ver detalhes
// imports já declarados no topo do arquivo

function JobCard({ id, title, company, location, description }) {
  return (
    <div className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl'>
      {/* Barra de destaque superior */}
      <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-sky-400 to-cyan-300' />

      <div className='p-5'>
        {/* Cabeçalho: ícone + cargo */}
        <div className='flex items-start justify-between gap-4'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 ring-1 ring-slate-200 transition-colors group-hover:bg-blue-50 group-hover:ring-blue-100'>
            <Building2 className='h-6 w-6 text-slate-500 transition-colors group-hover:text-blue-600' />
          </div>

          <span className='inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-100'>
            Desenvolvedor
          </span>
        </div>

        {/* Título e empresa */}
        <div className='mt-4 space-y-1'>
          <h2 className='text-lg font-semibold leading-tight text-slate-900 transition-colors group-hover:text-blue-700'>
            {title}
          </h2>
          <p className='text-sm text-slate-600'>{company}</p>
        </div>

        {/* Descrição resumida */}
        <p className='mt-4 line-clamp-3 text-sm leading-6 text-slate-600'>
          {description}
        </p>

        {/* Tags / localização */}
        <div className='mt-4 flex flex-wrap gap-2 text-sm text-slate-500'>
          <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1'>
            <MapPin className='h-4 w-4' />
            {location}
          </span>
        </div>
      </div>

      {/* Rodapé com link para a página de detalhes */}
      <div className='border-t border-slate-100 bg-slate-50/80 p-4'>
        <Link
          to={`/vagas/${id}`}
          className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600'
        >
          Ver detalhes
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
        </Link>
      </div>
    </div>
  )
}

export default JobCard
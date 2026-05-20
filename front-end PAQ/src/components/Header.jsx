import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 text-white sm:px-6'>
      <div className='flex items-center gap-2'>
        <Link to='/' className='text-sm font-bold tracking-[0.24em] uppercase text-sky-200'>
           <img src="PaqJobsLogo.png" alt="PaqJobsLogo" className='h-14 w-14 object-contain' />
        </Link>
      </div>

      <div className='flex items-center gap-2 text-sm'>
        <span className='hidden text-slate-400 sm:inline'>Home</span>
        <span className='hidden text-slate-400 sm:inline'>Sobre</span>
        <span className='hidden text-slate-400 sm:inline'>Contato</span>
      
      </div>

      <div>
          <Link
          to='/login'
          className='rounded-full bg-white px-4 py-2 font-semibold text-slate-950 transition hover:bg-slate-200'
        >
          Entrar
        </Link>
      </div>
    </header>
  )
}

export default Header

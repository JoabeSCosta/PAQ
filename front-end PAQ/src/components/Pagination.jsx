// Arquivo: Pagination.jsx
// Propósito: componente de paginação reutilizável.
// Separa a renderização de botões da lógica de paginação presente nas páginas.
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Se não houver mais de uma página, não renderiza o componente.
  if (totalPages <= 1) return null

  // Navbar com botões Previous / números / Next
  return (
    <nav className='mx-auto mt-8 flex max-w-6xl items-center justify-center gap-2 px-4 py-8'>
      {/* Botão anterior */}
      <button
        type='button'
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className='rounded-lg bg-white px-4 py-2 transition hover:bg-slate-900 hover:text-white disabled:opacity-50 disabled:hover:bg-white'
      >
        Anterior
      </button>

      {/* Botões numerados */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          type='button'
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-4 py-2 transition ${
            currentPage === page
              ? 'bg-slate-900 text-white shadow-inner'
              : 'bg-white hover:bg-slate-500 hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botão próxima */}
      <button
        type='button'
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className='rounded-lg bg-white px-4 py-2 transition hover:bg-slate-900 hover:text-white disabled:opacity-50 disabled:hover:bg-white'
      >
        Próxima
      </button>
    </nav>
  )
}

export default Pagination
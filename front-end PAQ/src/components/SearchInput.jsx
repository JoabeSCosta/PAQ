// Arquivo: SearchInput.jsx
// Propósito: input controlado para pesquisa local na lista de vagas.
// Recebe `value` e `onChange` para permitir controle completo pela página pai.
function SearchInput({ value, onChange, placeholder = 'Buscar vagas por cargo, empresa ou local', label = 'Pesquisar vagas' }) {
  // Campo controlado: não mantém estado interno, delega a responsabilidade ao pai.
  return (
    <label className='mx-auto mb-6 block max-w-6xl px-4'>
      <span className='mb-2 block text-sm font-semibold text-slate-700'>{label}</span>
      <input
        type='search'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
      />
    </label>
  )
}

export default SearchInput

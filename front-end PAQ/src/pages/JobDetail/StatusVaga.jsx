// Arquivo: StatusVaga.jsx
// Propósito: badge simples para exibir um status ou metadado da vaga.
// Uso: recebe `texto`, `link` (opcional) e `cor` para customizar a aparência.
function StatusVaga({ texto, link, cor = '#0f172a' }) {
  // Conteúdo visual do badge
  const conteudo = (
    <span
      className='inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white'
      style={{ backgroundColor: cor }}
    >
      {texto}
    </span>
  )

  // Se houver um link, renderiza um <a> ao redor do badge
  if (link) {
    return (
      <a href={link} target='_blank' rel='noreferrer' className='inline-flex'>
        {conteudo}
      </a>
    )
  }

  return conteudo
}

export default StatusVaga
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold">PAQ Jobs</h2>
          <p className="mt-3 text-sm text-slate-300">
            Conectando pessoas às melhores oportunidades de trabalho.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Contatos
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Email: contato@paqjobs.com</li>
            <li>Telefone: (48) 99999-9999</li>
            <li>WhatsApp: (48) 98888-8888</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Endereço
          </h3>
          <p className="mt-3 text-sm text-slate-300">
            Rua Exemplo, 123
            <br />
            Florianópolis - SC
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 px-6 py-4 text-center text-sm text-slate-400">
        © 2026 PAQ Jobs. Todos os direitos reservados.
      </div>
    </footer>
  )
}

export default Footer
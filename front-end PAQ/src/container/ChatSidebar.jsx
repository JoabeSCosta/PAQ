// Arquivo: ChatSidebar.jsx
// Propósito: controla a abertura do painel de chat como um overlay flutuante.
// Seções:
// - botão flutuante (mini launcher)
// - overlay com painel que contém `AiChat` quando aberto
import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Bot, Loader2, Send, User } from 'lucide-react'

// ChatSidebar agora contém TODO o chat (sem arquivo separado).
// Mudanças principais:
// - Removida a coluna "Como usar" (lado esquerdo)
// - Removido cabeçalho branco; mantido cabeçalho preto interno
// - Botão de abrir/fechar usa estilo preto consistente
// - Mantemos o painel com largura máxima (não cobre a tela inteira)

const initialMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    text: 'Oi! Me conte seu perfil e eu te ajudo a encontrar vagas e caminhos de carreira.',
  },
]

function ChatSidebar() {
  // Estado local: aberto/fechado
  const [aberto, setAberto] = useState(false)

  // Estado do chat (mantido no mesmo arquivo para persistir entre aberturas)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(text) {
    const value = text.trim()
    if (!value || isLoading) return

    setIsLoading(true)
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: value },
    ])
    // Simulação: responde após breve timeout
    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'assistant', text: 'Legal — conta mais sobre sua experiência.' },
      ])
      setIsLoading(false)
    }, 800)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
    setInput('')
  }

  return (
    <>
      {/* Launcher flutuante no canto inferior direito (preto) */}
      {!aberto && (
        <button
          type='button'
          onClick={() => setAberto(true)}
          className='fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:bg-slate-800'
          aria-label='Abrir chat da IA'
        >
          <MessageCircle className='h-6 w-6' />
        </button>
      )}

      {/* Overlay do painel de chat (painel limitado, não ocupa toda a tela) */}
      {aberto && (
        <div className='fixed inset-0 z-50 flex justify-end bg-slate-950/30 backdrop-blur-sm'>
          <div className='flex h-screen w-full max-w-160 flex-col overflow-hidden border-l border-sky-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.28)]'>

            {/* Cabeçalho preto (dentro do painel) com título e botão de fechar preto */}
            <div className='flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4 text-white'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800/60 ring-1 ring-white/10'>
                  <Bot className='h-5 w-5 text-sky-300' />
                </div>
                <div>
                  <p className='text-sm font-semibold uppercase tracking-[0.22em] text-sky-200'>
                    Assistente PAQ
                  </p>
                  <p className='text-sm text-slate-300'>Pronto para orientar sua busca por vagas</p>
                </div>
              </div>

              <button
                type='button'
                onClick={() => setAberto(false)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700'
                aria-label='Fechar chat da IA'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* Área principal do chat (sem coluna 'Como usar') */}
            <div className='min-h-0 flex-1 flex flex-col bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.02),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'>
              <div className='flex-1 overflow-y-auto px-6 py-6'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200'>
                        <Bot className='h-4 w-4' />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        message.role === 'user' ? 'bg-slate-900 text-white' : 'border border-sky-100 bg-sky-50 text-slate-800'
                      }`}
                    >
                      {message.text}
                    </div>

                    {message.role === 'user' && (
                      <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white'>
                        <User className='h-4 w-4' />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className='flex items-end gap-3'>
                    <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200'>
                      <Bot className='h-4 w-4' />
                    </div>
                    <div className='flex items-center gap-2 rounded-3xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-600'>
                      <Loader2 className='h-4 w-4 animate-spin text-sky-600' />
                      Pensando...
                    </div>
                  </div>
                )}

                <div ref={scrollRef} />
              </div>

              <form onSubmit={handleSubmit} className='border-t border-slate-100 bg-white p-4 sm:p-5'>
                <div className='flex gap-3 rounded-2xl border border-sky-200 bg-slate-50 p-2 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100'>
                  <input
                    type='text'
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder='Digite sua mensagem...'
                    className='min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400'
                    disabled={isLoading}
                  />
                  <button
                    type='submit'
                    disabled={!input.trim() || isLoading}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <Send className='h-4 w-4' />
                    <span className='sr-only'>Enviar mensagem</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatSidebar
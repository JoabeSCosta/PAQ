import { useEffect, useRef, useState } from 'react'
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react'

const suggestedQuestions = [
	'Quais vagas combinam com meu perfil de estudante de TI?',
	'Qual a diferença entre estágio e jovem aprendiz?',
	'Como me preparar para entrevistas de emprego?',
	'Quais são as vagas remotas disponíveis?',
]

const initialMessages = [
	{
		id: 'welcome',
		role: 'assistant',
		text: 'Oi! Me conte seu perfil e eu te ajudo a encontrar vagas e caminhos de carreira.',
	},
]

function AIChat() {
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
	}

	function handleSubmit(event) {
		event.preventDefault()
		sendMessage(input)
		setInput('')
	}

	return (
		<section className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_35%),linear-gradient(180deg,#eff6ff_0%,#dbeafe_100%)] px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto max-w-2xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
						<Sparkles className="h-4 w-4" />
						Assistente com IA
					</div>
					<h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
						Encontre a vaga ideal com a ajuda da IA
					</h2>
					<p className="mt-4 text-base leading-7 text-slate-600">
						Converse com o assistente para descobrir oportunidades compatíveis com seu perfil,
						objetivos e nível de experiência.
					</p>
				</div>

				<div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-4xl border border-sky-100 bg-white shadow-[0_30px_80px_rgba(30,64,175,0.16)]">
					<div className="border-b border-sky-100 bg-slate-950 px-6 py-5 text-white">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 ring-1 ring-white/10">
								<Bot className="h-5 w-5 text-sky-300" />
							</div>
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
									Assistente PAQ Jobs
								</p>
								<p className="text-sm text-slate-300">
									Pronto para orientar sua busca por vagas
								</p>
							</div>
						</div>
					</div>

					<div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
						<aside className="border-b border-sky-100 bg-slate-50 px-6 py-6 lg:border-b-0 lg:border-r">
							<h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
								Sugestões rápidas
							</h3>
							<div className="mt-4 flex flex-wrap gap-2">
								{suggestedQuestions.map((question) => (
									<button
										key={question}
										type="button"
										onClick={() => sendMessage(question)}
										disabled={isLoading}
										className="rounded-full border border-sky-200 bg-white px-3 py-2 text-left text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
									>
										{question}
									</button>
								))}
							</div>

							<div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
								<p className="text-sm font-semibold text-sky-200">Como usar</p>
								<ul className="mt-3 space-y-3 text-sm text-slate-300">
									<li>• Fale sobre sua formação e habilidades.</li>
									<li>• Pergunte sobre tipo de vaga e modalidade.</li>
									<li>• Peça dicas para currículo e entrevista.</li>
								</ul>
							</div>
						</aside>

						<div className="flex flex-col">
							<div className="h-105 space-y-4 overflow-y-auto px-6 py-6">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex items-end gap-3 ${
											message.role === 'user' ? 'justify-end' : 'justify-start'
										}`}
									>
										{message.role === 'assistant' && (
											<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
												<Bot className="h-4 w-4" />
											</div>
										)}

										<div
											className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
												message.role === 'user'
													? 'bg-slate-950 text-white'
													: 'border border-sky-100 bg-sky-50 text-slate-800'
											}`}
										>
											{message.text}
										</div>

										{message.role === 'user' && (
											<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
												<User className="h-4 w-4" />
											</div>
										)}
									</div>
								))}

								{isLoading && (
									<div className="flex items-end gap-3">
										<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
											<Bot className="h-4 w-4" />
										</div>
										<div className="flex items-center gap-2 rounded-3xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-600">
											<Loader2 className="h-4 w-4 animate-spin text-sky-600" />
											Pensando...
										</div>
									</div>
								)}

								<div ref={scrollRef} />
							</div>

							<form onSubmit={handleSubmit} className="border-t border-sky-100 bg-white p-4 sm:p-5">
								<div className="flex gap-3 rounded-2xl border border-sky-200 bg-slate-50 p-2 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
									<input
										type="text"
										value={input}
										onChange={(event) => setInput(event.target.value)}
										placeholder="Digite sua mensagem..."
										className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
										disabled={isLoading}
									/>
									<button
										type="submit"
										disabled={!input.trim() || isLoading}
										className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<Send className="h-4 w-4" />
										<span className="sr-only">Enviar mensagem</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AIChat

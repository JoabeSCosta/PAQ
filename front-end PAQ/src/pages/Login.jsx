import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LockKeyhole, Mail, User } from 'lucide-react'

function Login() {
  const location = useLocation()
  const [mode, setMode] = useState(location.pathname.includes('register') ? 'register' : 'login')
  const isLogin = mode === 'login'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-4xl border border-white/60 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-slate-950 px-8 py-10 text-white sm:px-12 lg:px-14">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.2),transparent_40%),linear-gradient(225deg,rgba(168,85,247,0.2),transparent_45%)]" />
          <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                <img src="PaqJobsLogo.png" alt="PaqJobsLogo" className='h-14 w-14 object-contain' />
              PAQ Jobs
            </Link>

            <div className="mt-10 max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-200/80">
                Vagas, carreira e comunidade
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                {isLogin ? 'Entre para continuar sua jornada.' : 'Crie sua conta e comece hoje.'}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                Uma experiência de acesso clara, moderna e responsiva para candidatos e empresas que querem se conectar rápido.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="font-semibold text-white">Perfil unificado</p>
              <p className="mt-2">Centralize dados, histórico e preferências em um só lugar.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="font-semibold text-white">Acesso rápido</p>
              <p className="mt-2">Fluxo simples para voltar às vagas ou criar nova conta.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="font-semibold text-white">UI Tailwind</p>
              <p className="mt-2">Visual limpo, consistente e fácil de evoluir depois.</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-lg">
            <div className="inline-flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold text-slate-500 shadow-sm">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`rounded-2xl px-4 py-2 transition ${
                  isLogin ? 'bg-white text-slate-950 shadow' : 'hover:text-slate-900'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`rounded-2xl px-4 py-2 transition ${
                  !isLogin ? 'bg-white text-slate-950 shadow' : 'hover:text-slate-900'
                }`}
              >
                Registrar
              </button>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                  {isLogin ? 'Acesso à plataforma' : 'Criar novo acesso'}
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">
                  {isLogin ? 'Bem-vindo de volta' : 'Abra sua conta'}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {isLogin
                    ? 'Use seus dados para entrar e acompanhar as vagas mais recentes.'
                    : 'Leva menos de um minuto para começar a explorar oportunidades.'}
                </p>
              </div>

              <form className="mt-8 space-y-4">
                {!isLogin && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-slate-700">
                      <span>Nome completo</span>
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-sky-500 focus-within:bg-white">
                        <User className="h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Seu nome"
                          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </label>

                    <label className="space-y-2 text-sm font-medium text-slate-700">
                      <span>Telefone</span>
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-sky-500 focus-within:bg-white">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="(48) 99999-9999"
                          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </label>
                  </div>
                )}

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>E-mail</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-sky-500 focus-within:bg-white">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="voce@exemplo.com"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Senha</span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-sky-500 focus-within:bg-white">
                    <LockKeyhole className="h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      placeholder={isLogin ? 'Digite sua senha' : 'Crie uma senha forte'}
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </label>

                {isLogin ? (
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      Lembrar de mim
                    </label>
                    <button type="button" className="font-semibold text-sky-600 hover:text-sky-700">
                      Esqueci a senha
                    </button>
                  </div>
                ) : (
                  <label className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span>
                      Concordo com os termos de uso e autorizo o tratamento dos meus dados para fins de cadastro.
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {isLogin ? 'Entrar agora' : 'Criar conta'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                {isLogin ? 'Ainda não tem conta?' : 'Já tem conta?'}{' '}
                <button
                  type="button"
                  onClick={() => setMode(isLogin ? 'register' : 'login')}
                  className="font-semibold text-sky-600 hover:text-sky-700"
                >
                  {isLogin ? 'Registrar agora' : 'Entrar'}
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login

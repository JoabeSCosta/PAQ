// Arquivo: App.jsx
// Propósito: shell da aplicação — renderiza cabeçalho, footer e a rota atual.
// Ponto de extensão: o `ChatSidebar` monta o launcher do assistente globalmente.
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatSidebar from './container/ChatSidebar'

function App() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Cabeçalho global */}
      <Header />

      {/* Área principal onde as rotas são renderizadas */}
      <main className='flex-1'>
        <Outlet />
      </main>

      {/* Rodapé global */}
      <Footer />

      {/* Launcher / painel do chat da IA */}
      <ChatSidebar />
    </div>
  )
}

export default App

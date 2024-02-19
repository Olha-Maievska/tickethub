import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

const root = ReactDOM.createRoot(
  document.getElementById('root')! as HTMLElement
)

enableMocking().then(() => {
  root.render(<App />)
})

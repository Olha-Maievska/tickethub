import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.ts'

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
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

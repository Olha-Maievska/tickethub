import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home-page'
import { EventPage } from './pages/event-page'
import { OrderPage } from './pages/order-page'
import { SuccessPage } from './pages/success-page'

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  )
}

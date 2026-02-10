import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { ClientDetail } from './pages/ClientDetail'
import { CustomerFormPage } from './pages/CustomerFormPage'
import { MeetingFormPage } from './pages/MeetingFormPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/kunde/:id" element={<ClientDetail />} />
      <Route path="/kundeskjema/:token" element={<CustomerFormPage />} />
      <Route path="/kunde/:id/moteskjema" element={<MeetingFormPage />} />
    </Routes>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getClientByToken } from '../lib/api'
import { CustomerForm } from '../components/CustomerForm'
import type { Client } from '../lib/types'

export function CustomerFormPage() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUnauthorized, setIsUnauthorized] = useState(false)

  useEffect(() => {
    async function loadClient() {
      if (!token) {
        setIsUnauthorized(true)
        setIsLoading(false)
        return
      }
      try {
        const data = await getClientByToken(token)
        if (!data) {
          setIsUnauthorized(true)
        } else {
          setClient(data)
        }
      } catch (error) {
        console.error('Feil ved lasting av kunde:', error)
        setIsUnauthorized(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadClient()
  }, [token])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Laster...</p>
      </div>
    )
  }

  if (isUnauthorized || !client) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Ugyldig eller utløpt lenke</h1>
          <p className="text-slate-600 mb-6">Vennligst kontakt Skar Digital for en ny lenke.</p>
          <p className="text-slate-600">
            <span className="font-medium">Kontakt:</span> media@skardigital.no
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">{client.name}</h1>
          <div className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
            Kundeversjon
          </div>
        </div>
      </div>
      <CustomerForm clientName={client.name} clientId={client.id} />
    </div>
  )
}

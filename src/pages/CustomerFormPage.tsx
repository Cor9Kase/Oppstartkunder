import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getClient } from '../lib/api'
import { CustomerForm } from '../components/CustomerForm'
import type { Client } from '../lib/types'

export function CustomerFormPage() {
  const { id } = useParams<{ id: string }>()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadClient() {
      if (!id) return
      try {
        const data = await getClient(id)
        setClient(data)
      } catch (error) {
        console.error('Feil ved lasting av kunde:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadClient()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Laster...</p>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-slate-900 mb-4">Kunde ikke funnet</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">Tilbake til oversikten</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to={`/kunde/${client.id}`}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Tilbake</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              Kundeversjon
            </div>
          </div>
        </div>
      </div>
      <CustomerForm clientName={client.name} />
    </div>
  )
}

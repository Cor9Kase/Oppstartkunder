import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getClient } from '../lib/api'
import type { Client } from '../lib/types'

export function ClientDetail() {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-500">Laster...</p>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-slate-900 mb-4">Kunde ikke funnet</h1>
          <p className="text-slate-600 mb-6">Denne kunden finnes ikke eller har blitt slettet.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tilbake til oversikten
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Alle kunder</span>
          </Link>
          <h1 className="text-slate-900 mb-4">Oppstartsskjema for {client.name} – Skar Digital</h1>
          <p className="text-slate-600">Velg hvilken versjon av skjemaet du vil bruke</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Version Card */}
          <Link
            to={`/kunde/${client.id}/kundeskjema`}
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow text-left group block"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-slate-900 mb-2">Kundeversjon</h2>
            <p className="text-slate-600 mb-4">
              En oversiktlig versjon som kan sendes til kunden i forkant av møtet.
              Gir kunden en oversikt over hvilken informasjon og tilganger som trengs.
            </p>
            <div className="inline-flex items-center text-blue-600 group-hover:gap-2 transition-all">
              <span>Send til kunde</span>
              <svg className="w-4 h-4 ml-1 group-hover:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Meeting Version Card */}
          <Link
            to={`/kunde/${client.id}/moteskjema`}
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow text-left group block"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-slate-900 mb-2">Møteversjon</h2>
            <p className="text-slate-600 mb-4">
              Fullstendig skjema for å fylle ut i møtet med kunden.
              Kan eksporteres til PDF eller kopieres til Drive og Notion.
            </p>
            <div className="inline-flex items-center text-emerald-600 group-hover:gap-2 transition-all">
              <span>Start møte</span>
              <svg className="w-4 h-4 ml-1 group-hover:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

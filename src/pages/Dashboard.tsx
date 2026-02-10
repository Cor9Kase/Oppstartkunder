import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Users } from 'lucide-react'
import { getClients, createClient, deleteClient } from '../lib/api'
import type { Client } from '../lib/types'

export function Dashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const loadClients = async () => {
    try {
      const data = await getClients()
      setClients(data)
    } catch (error) {
      console.error('Feil ved lasting av kunder:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  const handleCreateClient = async () => {
    if (!newClientName.trim()) return
    setIsCreating(true)
    try {
      await createClient(newClientName.trim())
      setNewClientName('')
      setShowDialog(false)
      await loadClients()
    } catch (error) {
      console.error('Feil ved opprettelse av kunde:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteClient = async (id: string, name: string) => {
    if (!confirm(`Er du sikker på at du vil slette ${name}? All data for denne kunden vil bli slettet permanent.`)) {
      return
    }
    try {
      await deleteClient(id)
      await loadClients()
    } catch (error) {
      console.error('Feil ved sletting av kunde:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-slate-900 mb-4">Oppstart med Skar Digital</h1>
          <p className="text-slate-600">Velg en kunde for å starte oppstartsprosessen, eller legg til en ny kunde.</p>
        </div>

        {/* Add Client Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowDialog(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Legg til ny kunde
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-slate-500">Laster kunder...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && clients.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-slate-700 mb-2">Ingen kunder lagt til ennå</h2>
            <p className="text-slate-500 mb-6">Klikk "Legg til ny kunde" for å komme i gang.</p>
          </div>
        )}

        {/* Client Grid */}
        {!isLoading && clients.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow relative group"
              >
                <Link
                  to={`/kunde/${client.id}`}
                  className="block p-8"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <span className="text-blue-600 font-medium text-lg">
                      {client.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-slate-900 mb-2">{client.name}</h2>
                  <p className="text-slate-500 text-sm">
                    Opprettet {new Date(client.created_at).toLocaleDateString('nb-NO', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <div className="inline-flex items-center text-blue-600 mt-4 group-hover:gap-2 transition-all">
                    <span>Gå til oppstart</span>
                    <svg className="w-4 h-4 ml-1 group-hover:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleDeleteClient(client.id, client.name)
                  }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Slett kunde"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Client Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <h2 className="text-slate-900 mb-4">Legg til ny kunde</h2>
              <div className="mb-6">
                <label className="block text-slate-700 mb-2">Kundenavn</label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateClient()
                  }}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="F.eks. L'Escalier, Fjellsport, etc."
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDialog(false)
                    setNewClientName('')
                  }}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Avbryt
                </button>
                <button
                  onClick={handleCreateClient}
                  disabled={!newClientName.trim() || isCreating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Oppretter...' : 'Opprett kunde'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

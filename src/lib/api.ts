import { supabase } from './supabase'
import type { Client, FormData } from './types'

// --- Kunder ---

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

export async function getClientByToken(token: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('share_token', token)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

export async function createClient(name: string): Promise<Client> {
  // Generate a unique share token
  const shareToken = generateShareToken()
  
  const { data, error } = await supabase
    .from('clients')
    .insert({ name, share_token: shareToken })
    .select()
    .single()

  if (error) throw error
  return data
}

function generateShareToken(): string {
  // Generate a URL-safe token (e.g., "abc123def456...")
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// --- Oppstartsskjema ---

export async function getFormData(clientId: string): Promise<FormData | null> {
  const { data, error } = await supabase
    .from('onboarding_forms')
    .select('form_data')
    .eq('client_id', clientId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return (data?.form_data as FormData) ?? null
}

export async function saveFormData(
  clientId: string,
  formData: FormData
): Promise<void> {
  const { error } = await supabase.from('onboarding_forms').upsert(
    {
      client_id: clientId,
      form_data: formData as unknown as Record<string, unknown>,
    },
    { onConflict: 'client_id' }
  )

  if (error) throw error
}

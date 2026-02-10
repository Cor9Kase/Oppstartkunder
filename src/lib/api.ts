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

export async function createClient(name: string): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .insert({ name })
    .select()
    .single()

  if (error) throw error
  return data
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

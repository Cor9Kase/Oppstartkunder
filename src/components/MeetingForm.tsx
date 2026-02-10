import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Printer, Copy, Check, Trash2 } from 'lucide-react';
import { getFormData, saveFormData } from '../lib/api';
import type { FormData } from '../lib/types';

interface MeetingFormProps {
  clientId: string;
  clientName: string;
}

export function MeetingForm({ clientId, clientName }: MeetingFormProps) {
  const { register, watch, setValue, reset } = useForm<FormData>({
    defaultValues: {}
  });
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formData = watch();

  // Load data from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const saved = await getFormData(clientId);
        if (saved) {
          Object.keys(saved).forEach((key) => {
            setValue(key as keyof FormData, saved[key as keyof FormData]);
          });
        }
      } catch (error) {
        console.error('Feil ved lasting av skjemadata:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [clientId, setValue]);

  // Save data to Supabase whenever formData changes
  useEffect(() => {
    if (isLoading) return;

    const saveData = async () => {
      try {
        await saveFormData(clientId, formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      } catch (error) {
        console.error('Feil ved lagring av skjemadata:', error);
      }
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData, clientId, isLoading]);

  const handleClearForm = async () => {
    if (confirm('Er du sikker på at du vil tømme hele skjemaet? Dette kan ikke angres.')) {
      reset();
      await saveFormData(clientId, {} as FormData);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateFormattedText = () => {
    return `OPPSTARTSSKJEMA FOR ${clientName.toUpperCase()} – SKAR DIGITAL
Møtedokument – ${formData.approvalDate || new Date().toLocaleDateString('nb-NO')}

═══════════════════════════════════════════════

1. BEDRIFTSINFORMASJON

1.1 Juridisk firmanavn: ${formData.companyName || '___________'}
1.2 Organisasjonsnummer: ${formData.orgNumber || '___________'}
1.3 Adresse: ${formData.address || '___________'}

1.4 Kontaktperson(er):
• Navn: ${formData.contactName || '___________'}
• Mobil: ${formData.contactPhone || '___________'}
• E-post: ${formData.contactEmail || '___________'}

1.5 Fakturainformasjon:
• Faktura e-post: ${formData.invoiceEmail || '___________'}
• EHF: ${formData.ehf || '___________'}
• Referanse/PO: ${formData.poReference || '___________'}

1.6 Offisielle bedriftsprofiler:
• Hjemmeside: ${formData.website || '___________'}
• Facebook-side: ${formData.facebook || '___________'}
• Instagram-konto: ${formData.instagram || '___________'}
• TikTok-konto: ${formData.tiktok || '___________'}
• Snapchat-konto: ${formData.snapchat || '___________'}
• LinkedIn-profil: ${formData.linkedin || '___________'}

═══════════════════════════════════════════════

2. MÅL & PRIORITERINGER

2.1 Viktigste mål de første 90 dagene:
${formData.mainGoals || '___________'}

2.2 Topp 3 prioriterte produktkategorier:
${formData.topProducts || '___________'}

2.3 Sesongkampanjer og viktige datoer:
${formData.seasonalCampaigns || '___________'}

═══════════════════════════════════════════════

3. TILGANGER – KRITISK FOR OPPSTART

Alle tilganger gis til: media@skardigital.no

3.1 Shopify
✓ Admin-tilgang: ${formData.shopifyAccess || '___________'}
✓ Link til Shopify-store: ${formData.shopifyStore || '___________'}

3.2 Google
✓ Google Ads-konto: ${formData.googleAdsAccess || '___________'}
✓ Google Merchant Center: ${formData.googleMerchantAccess || '___________'}
✓ Google Search Console: ${formData.googleSearchConsoleAccess || '___________'}
✓ Google Tag Manager: ${formData.googleTagManagerAccess || '___________'}
✓ Google Analytics 4: ${formData.googleAnalyticsAccess || '___________'}
✓ Google Business Profile: ${formData.googleBusinessAccess || '___________'}

3.3 Meta (Facebook & Instagram)
✓ Business Manager ID: ${formData.metaBusinessManagerId || '___________'}
✓ Notater om tilgang: ${formData.metaAccessNotes || '___________'}

3.4 Klaviyo
✓ Eksisterende konto: ${formData.klaviyoExists || '___________'}
✓ Notater: ${formData.klaviyoAccessNotes || '___________'}

3.5 Domene / DNS
✓ DNS-leverandør: ${formData.dnsProvider || '___________'}
✓ Tilgang: ${formData.dnsAccessNotes || '___________'}

═══════════════════════════════════════════════

4. KREATIVE RESSURSER

4.1 Bilder
✓ Tilgjengelige bilder: ${formData.imagesAvailable || '___________'}

4.2 Video
✓ Tilgjengelig video: ${formData.videoAvailable || '___________'}

4.3 Logo og grafisk profil
✓ Logo-filer: ${formData.logoFiles || '___________'}
✓ Fargekoder: ${formData.brandColors || '___________'}
✓ Typografi/fonter: ${formData.fonts || '___________'}
✓ Brand manual: ${formData.brandManual || '___________'}

4.4 Tone-of-Voice
✓ Notater: ${formData.toneOfVoiceNotes || '___________'}

═══════════════════════════════════════════════

5. KLAVIYO OPPSETT

5.1 Avsenderinformasjon
✓ Avsendernavn: ${formData.senderName || '___________'}
✓ Avsender-e-post: ${formData.senderEmail || '___________'}
✓ Support-e-post: ${formData.supportEmail || '___________'}

5.2 Lister & segmenter
✓ Eksisterende lister: ${formData.existingLists || '___________'}
✓ Samtykkestatus: ${formData.consentStatus || '___________'}

5.3 E-postdesignpreferanser
${formData.emailDesignPreferences || '___________'}

═══════════════════════════════════════════════

6. SPORING

6.1 Status på nåværende sporing:
✓ Google Tag Manager: ${formData.usingGTM || '___________'}
✓ Meta-piksel installert: ${formData.metaPixelInstalled || '___________'}
✓ CAPI aktiv: ${formData.capiActive || '___________'}
✓ Google Ads konverteringer: ${formData.googleAdsConversions || '___________'}
✓ Klaviyo e-commerce sporing: ${formData.klaviyoTracking || '___________'}

6.2 Custom tracking
${formData.customTracking || '___________'}

═══════════════════════════════════════════════

7. ANNONSERINGSBUDSJETT

7.1 Månedlig budsjett:
• Meta Ads: ${formData.metaBudget || '___________'} kr
• Google Ads: ${formData.googleBudget || '___________'} kr
• LinkedIn Ads: ${formData.linkedinBudget || '___________'} kr
• Snapchat Ads: ${formData.snapchatBudget || '___________'} kr
• TikTok Ads: ${formData.tiktokBudget || '___________'} kr

7.2 Fordeling:
${formData.budgetDistribution || '___________'}

═══════════════════════════════════════════════

8. EKSTRA NOTATER

${formData.extraNotes || 'Ingen ekstra notater'}

═══════════════════════════════════════════════

Generert: ${new Date().toLocaleString('nb-NO')}
`;
  };

  const handleCopyToClipboard = async () => {
    const formattedText = generateFormattedText();
    
    try {
      // Try modern Clipboard API first
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback to older method
      try {
        const textArea = document.createElement('textarea');
        textArea.value = formattedText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          alert('Kunne ikke kopiere til utklippstavlen. Vennligst velg og kopier teksten manuelt.');
        }
      } catch (fallbackErr) {
        console.error('Copy failed:', fallbackErr);
        alert('Kunne ikke kopiere til utklippstavlen. Vennligst velg og kopier teksten manuelt.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 flex justify-center items-center min-h-[50vh]">
        <p className="text-slate-500">Laster skjemadata...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pb-24">
      {/* Save Indicator */}
      {isSaved && (
        <div className="fixed top-20 right-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 print:hidden z-50">
          <Check className="w-4 h-4" />
          <span>Data lagret automatisk</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 print:shadow-none">
        <div className="text-center mb-8 pb-6 border-b border-slate-200">
          <h1 className="text-slate-900 mb-2">Oppstartsskjema for {clientName}</h1>
          <p className="text-slate-600">Skar Digital – Møteversjon</p>
          <p className="text-slate-500 text-sm mt-2">Skjemaet lagres automatisk</p>
        </div>

        <form className="space-y-8">
          {/* Section 1 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">1. Bedriftsinformasjon</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-2">1.1 Juridisk firmanavn</label>
                <input
                  type="text"
                  {...register('companyName')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Firmanavn AS"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">1.2 Organisasjonsnummer</label>
                <input
                  type="text"
                  {...register('orgNumber')}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="123 456 789"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-slate-700 mb-2">1.3 Adresse</label>
              <input
                type="text"
                {...register('address')}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Gate 1, 0123 Oslo"
              />
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h3 className="text-slate-900 mb-4">1.4 Kontaktperson(er)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Navn</label>
                  <input
                    type="text"
                    {...register('contactName')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Mobil</label>
                  <input
                    type="tel"
                    {...register('contactPhone')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">E-post</label>
                  <input
                    type="email"
                    {...register('contactEmail')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h3 className="text-slate-900 mb-4">1.5 Fakturainformasjon</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Faktura e-post</label>
                  <input
                    type="email"
                    {...register('invoiceEmail')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">EHF?</label>
                  <select
                    {...register('ehf')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Velg...</option>
                    <option value="Ja">Ja</option>
                    <option value="Nei">Nei</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Referanse/PO</label>
                  <input
                    type="text"
                    {...register('poReference')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-slate-900 mb-4">1.6 Offisielle bedriftsprofiler</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Hjemmeside</label>
                  <input
                    type="url"
                    {...register('website')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Facebook-side</label>
                  <input
                    type="url"
                    {...register('facebook')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Instagram-konto</label>
                  <input
                    type="text"
                    {...register('instagram')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="@brukernavn"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">TikTok-konto (valgfri)</label>
                  <input
                    type="text"
                    {...register('tiktok')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="@brukernavn"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Snapchat-konto (valgfri)</label>
                  <input
                    type="text"
                    {...register('snapchat')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="@brukernavn"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">LinkedIn-profil (valgfri)</label>
                  <input
                    type="url"
                    {...register('linkedin')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">2. Mål & Prioriteringer</h2>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-2">2.1 Hva er deres viktigste mål de første 90 dagene?</label>
              <textarea
                {...register('mainGoals')}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="F.eks. øke netthandel, bedre ROAS, mer kvalifisert trafikk, branding & videovisninger, e-postvekst..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-slate-700 mb-2">2.2 Topp 3 prioriterte produktkategorier</label>
              <textarea
                {...register('topProducts')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Basert på messaging: premium, tidløst, håndplukket..."
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">2.3 Eventuelle sesongkampanjer</label>
              <textarea
                {...register('seasonalCampaigns')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Dress-sesong, vinter, back-to-work, etc."
              />
            </div>
          </section>

          {/* Section 3 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">3. Tilganger – Kritisk for oppstart</h2>
            <p className="text-slate-600 mb-6">Alle tilganger gis til: <span className="font-medium text-slate-900">media@skardigital.no</span></p>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-slate-900 mb-4">3.1 Shopify</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-2">Admin-tilgang gitt?</label>
                    <select
                      {...register('shopifyAccess')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Ja">Ja</option>
                      <option value="Nei - må ordnes">Nei - må ordnes</option>
                      <option value="Pågår">Pågår</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Link til Shopify-store</label>
                    <input
                      type="url"
                      {...register('shopifyStore')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="https://butikk.myshopify.com"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-slate-900 mb-4">3.2 Google</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-2">Google Ads-konto</label>
                    <select
                      {...register('googleAdsAccess')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Tilgang gitt">Tilgang gitt</option>
                      <option value="Må opprettes">Må opprettes</option>
                      <option value="Pågår">Pågår</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Google Merchant Center</label>
                    <select
                      {...register('googleMerchantAccess')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Tilgang gitt">Tilgang gitt</option>
                      <option value="Må opprettes">Må opprettes</option>
                      <option value="Pågår">Pågår</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Google Search Console</label>
                    <select
                      {...register('googleSearchConsoleAccess')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Tilgang gitt">Tilgang gitt</option>
                      <option value="Må opprettes">Må opprettes</option>
                      <option value="Pågår">Pågår</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Google Tag Manager</label>
                    <select
                      {...register('googleTagManagerAccess')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Brukes - tilgang gitt">Brukes - tilgang gitt</option>
                      <option value="Brukes ikke">Brukes ikke</option>
                      <option value="Pågår">Pågår</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Google Analytics 4</label>
                    <select
                      {...register('googleAnalyticsAccess')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Tilgang gitt">Tilgang gitt</option>
                      <option value="Må opprettes">Må opprettes</option>
                      <option value="Pågår">Pågår</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Google Business Profile</label>
                    <select
                      {...register('googleBusinessAccess')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Tilgang gitt">Tilgang gitt</option>
                      <option value="Må opprettes">Må opprettes</option>
                      <option value="Ikke relevant">Ikke relevant</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-slate-900 mb-4">3.3 Meta (Facebook & Instagram)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-2">Business Manager ID</label>
                    <input
                      type="text"
                      {...register('metaBusinessManagerId')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="ID nummer"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Notater om tilgang</label>
                    <input
                      type="text"
                      {...register('metaAccessNotes')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Status, kontaktperson, etc."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-slate-900 mb-4">3.4 Klaviyo</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-2">Eksisterende konto?</label>
                    <select
                      {...register('klaviyoExists')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Velg...</option>
                      <option value="Ja - tilgang gitt">Ja - tilgang gitt</option>
                      <option value="Ja - tilgang må gis">Ja - tilgang må gis</option>
                      <option value="Nei - må opprettes">Nei - må opprettes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Notater</label>
                    <input
                      type="text"
                      {...register('klaviyoAccessNotes')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Lister, flows, segmenter..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-slate-900 mb-4">3.5 Domene / DNS</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-2">DNS-leverandør</label>
                    <input
                      type="text"
                      {...register('dnsProvider')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Domeneshop, GoDaddy, Cloudflare..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">Tilgang / kontaktinfo</label>
                    <input
                      type="text"
                      {...register('dnsAccessNotes')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="E-post til DNS-kontakt, login, etc."
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">4. Kreative Ressurser</h2>
            
            <div className="mb-4">
              <label className="block text-slate-700 mb-2">4.1 Tilgjengelige bilder</label>
              <textarea
                {...register('imagesAvailable')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Produktbilder, lifestyle, butikkbilder, sesongkolleksjoner..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-slate-700 mb-2">4.2 Tilgjengelig video</label>
              <textarea
                {...register('videoAvailable')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Instagram-video, behind-the-scenes, brand-videoer..."
              />
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h3 className="text-slate-900 mb-4">4.3 Logo og grafisk profil</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Logo-filer</label>
                  <input
                    type="text"
                    {...register('logoFiles')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="PNG, SVG, etc."
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Fargekoder</label>
                  <input
                    type="text"
                    {...register('brandColors')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="#000000, #FFFFFF..."
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Typografi / fonter</label>
                  <input
                    type="text"
                    {...register('fonts')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Font-navn..."
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Brand manual</label>
                  <select
                    {...register('brandManual')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Velg...</option>
                    <option value="Ja - mottatt">Ja - mottatt</option>
                    <option value="Nei - finnes ikke">Nei - finnes ikke</option>
                    <option value="Skal sendes">Skal sendes</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">4.4 Tone-of-Voice notater</label>
              <textarea
                {...register('toneOfVoiceNotes')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Beskriv ønsket tone-of-voice..."
              />
            </div>
          </section>

          {/* Section 5 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">5. Klaviyo Oppsett – Informasjon vi trenger</h2>
            
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h3 className="text-slate-900 mb-4">5.1 Avsenderinformasjon</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Avsendernavn</label>
                  <input
                    type="text"
                    {...register('senderName')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={clientName}
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Avsender-e-post</label>
                  <input
                    type="email"
                    {...register('senderEmail')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="noreply@domene.no"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Support-e-post</label>
                  <input
                    type="email"
                    {...register('supportEmail')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="support@domene.no"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-2">5.2 Eksisterende lister</label>
                <textarea
                  {...register('existingLists')}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Hvilke lister finnes, segmenter, VIP-kunder..."
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Samtykkestatus</label>
                <textarea
                  {...register('consentStatus')}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="GDPR-samtykke, double opt-in, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">5.3 E-postdesignpreferanser</label>
              <textarea
                {...register('emailDesignPreferences')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Minimalistisk/premium, farger, bildebruk, store produktbilder..."
              />
            </div>
          </section>

          {/* Section 6 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">6. Sporing</h2>
            
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <h3 className="text-slate-900 mb-4">6.1 Nåværende status</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Google Tag Manager?</label>
                  <select
                    {...register('usingGTM')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Velg...</option>
                    <option value="Ja">Ja</option>
                    <option value="Nei">Nei</option>
                    <option value="Usikker">Usikker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Meta-piksel installert?</label>
                  <select
                    {...register('metaPixelInstalled')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Velg...</option>
                    <option value="Ja - via Shopify">Ja - via Shopify</option>
                    <option value="Ja - via GTM">Ja - via GTM</option>
                    <option value="Nei">Nei</option>
                    <option value="Usikker">Usikker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">CAPI aktiv?</label>
                  <select
                    {...register('capiActive')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Velg...</option>
                    <option value="Ja">Ja</option>
                    <option value="Nei">Nei</option>
                    <option value="Usikker">Usikker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Google Ads konverteringer?</label>
                  <select
                    {...register('googleAdsConversions')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Velg...</option>
                    <option value="Ja - fungerer">Ja - fungerer</option>
                    <option value="Nei">Nei</option>
                    <option value="Usikker">Usikker</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Klaviyo e-commerce sporing?</label>
                  <select
                    {...register('klaviyoTracking')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Velg...</option>
                    <option value="Ja">Ja</option>
                    <option value="Nei">Nei</option>
                    <option value="Ikke aktuelt ennå">Ikke aktuelt ennå</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">6.2 Custom tracking / andre ønsker</label>
              <textarea
                {...register('customTracking')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Nyhetsbrevregistrering, produktvisning, add to cart, checkout step, custom events..."
              />
            </div>
          </section>

          {/* Section 7 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">7. Annonseringsbudsjett</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-slate-700 mb-2">7.1 Månedlig Meta Ads budsjett</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('metaBudget')}
                    className="w-full px-4 py-2 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="10000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">kr</span>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Månedlig Google Ads budsjett</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('googleBudget')}
                    className="w-full px-4 py-2 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="10000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">kr</span>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Månedlig LinkedIn Ads budsjett</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('linkedinBudget')}
                    className="w-full px-4 py-2 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="10000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">kr</span>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Månedlig Snapchat Ads budsjett</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('snapchatBudget')}
                    className="w-full px-4 py-2 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="10000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">kr</span>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Månedlig TikTok Ads budsjett</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('tiktokBudget')}
                    className="w-full px-4 py-2 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="10000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">kr</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">7.2 Fordeling ønsket</label>
              <textarea
                {...register('budgetDistribution')}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Branding vs Performance? Retargeting vs cold traffic? Fokus på høyverdi-produkter?"
              />
            </div>
          </section>

          {/* Section 8 */}
          <section className="pb-8 border-b border-slate-200">
            <h2 className="text-slate-900 mb-6">8. Ekstra notater</h2>
            <textarea
              {...register('extraNotes')}
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Andre viktige notater, avtaler eller oppfølgingspunkter..."
            />
          </section>
        </form>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 print:hidden shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-end gap-3">
          <button
            onClick={handleCopyToClipboard}
            className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Kopiert!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Kopier til Drive/Notion
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Skriv ut / Lagre som PDF
          </button>
          <button
            onClick={handleClearForm}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Tøm skjema
          </button>
        </div>
      </div>
    </div>
  );
}
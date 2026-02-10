import { CheckCircle } from 'lucide-react';

interface CustomerFormProps {
  clientName: string
  clientId: string
}

export function CustomerForm({ clientName, clientId }: CustomerFormProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 print:shadow-none">
        <div className="text-center mb-8 pb-6 border-b border-slate-200">
          <h1 className="text-slate-900 mb-2">Oppstartsskjema</h1>
          <p className="text-slate-600">{clientName} – Skar Digital</p>
          <p className="text-slate-500 mt-2">Kundeversjon</p>
        </div>

        <div className="mb-8">
          <p className="text-slate-700">
            Dette dokumentet gir deg en oversikt over informasjon og tilganger vi trenger for å sette opp annonsering, e-postmarketing, sporing og løpende drift for {clientName}.
          </p>
          <p className="text-slate-700 mt-4">
            Gå gjerne gjennom listen før vårt oppstartsmøte, så kan vi gjøre gjennomgangen mer effektiv.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h2 className="text-slate-900 mb-4">1. Bedriftsinformasjon</h2>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Juridisk firmanavn og organisasjonsnummer</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Kontaktinformasjon</span>
                <p className="text-slate-600 text-sm mt-1">Navn, mobil og e-post til primærkontakt(er)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Fakturainformasjon</span>
                <p className="text-slate-600 text-sm mt-1">E-post for faktura, EHF-mulighet, referanse/PO</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Offisielle bedriftsprofiler</span>
                <p className="text-slate-600 text-sm mt-1">Hjemmeside, Facebook, Instagram, TikTok, Snapchat, LinkedIn (hvis relevant)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h2 className="text-slate-900 mb-4">2. Mål & Prioriteringer</h2>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Viktigste mål de første 90 dagene</span>
                <p className="text-slate-600 text-sm mt-1">Øke netthandel, ROAS, trafikk, branding, e-postvekst?</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Topp 3 prioriterte produktkategorier</span>
                <p className="text-slate-600 text-sm mt-1">Hvilke produkter skal vi fokusere på først?</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Sesongkampanjer og viktige datoer</span>
                <p className="text-slate-600 text-sm mt-1">Dress-sesong, vinter, back-to-work, etc.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - E-postmarketing */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h2 className="text-slate-900 mb-4">3. E-postmarketing & Nyhetsbrev</h2>
          <p className="text-slate-600 mb-4">
            Først må vi vite om du allerede bruker en e-postmarkeringsløsning. Svar på spørsmålene under så vi vet hva vi skal jobbe med.
          </p>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-slate-900 mb-3 font-medium">Bruker du en software for e-postmarketing eller nyhetsbrev?</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span>Ja, vi bruker allerede en løsning</span>
                    <p className="text-slate-600 text-sm mt-1">Hvilken? (f.eks. Klaviyo, Mailchimp, Brevo, ConvertKit, andre)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Nei, vi ønsker å sette opp noe nytt</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-blue-900 text-sm">
                <span className="font-medium">Hva vi trenger:</span> Hvis du bruker en løsning, trenger vi tilgang til å integrer med Shopify og knyttet sporing. Vi kan også bistå med oppsett av ny løsning hvis du velger det.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h2 className="text-slate-900 mb-4">4. Tilganger – Kritisk for oppstart</h2>
          <p className="text-slate-600 mb-4">
            Vi trenger tilgang til følgende plattformer. Alle tilganger kan gis til: <span className="font-medium text-slate-900">media@skardigital.no</span>
          </p>
          
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-slate-900 mb-3">Shopify</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Admin-tilgang til Shopify-butikken</span>
                </li>
                <li className="text-slate-600 text-sm ml-7">
                  Trengs for e-postintegrasjon, pixel-sjekk, sporing og Google Merchant Center
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-slate-900 mb-3">Google</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Google Ads-konto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Google Merchant Center</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Google Search Console</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Google Analytics 4</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Google Tag Manager (hvis brukt)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Google Business Profile</span>
                </li>
                <li className="text-slate-600 text-sm ml-7 mt-2">
                  Rolle: Administrator
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-slate-900 mb-3">Meta (Facebook & Instagram)</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Meta Business Manager-tilgang</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Facebook-side og Instagram-konto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Meta Ads-konto og Meta Pixel</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Produktkatalog</span>
                </li>
                <li className="text-slate-600 text-sm ml-7 mt-2">
                  Tilgangsnivå: Admin
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-slate-900 mb-3">E-postmarketering</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Administrator-tilgang til valgt e-postplattform</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>API-nøkkel for integrasjon (hvis aktuelt)</span>
                </li>
                <li className="text-slate-600 text-sm ml-7">
                  Vi trenger tilgang for å koble Shopify, Facebook og Google-sporing
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="text-slate-900 mb-3">Domene / DNS</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Tilgang til domenekontrollpanel</span>
                </li>
                <li className="text-slate-600 text-sm ml-7">
                  For DKIM, SPF, CNAME (f.eks. Domeneshop, GoDaddy, Cloudflare)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h2 className="text-slate-900 mb-4">5. Kreative Ressurser</h2>
          <p className="text-slate-600 mb-4">
            For å lage annonser og kreativt materiale trenger vi:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900 mb-2">Bilder</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Produktbilder, lifestyle-bilder, bilder fra butikk</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 mb-2">Video</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Videomateriale fra Instagram, behind-the-scenes, brand-videoer</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 mb-2">Logo og grafisk profil</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Logo i PNG & SVG, fargekoder, typografi, brand manual (hvis den finnes)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-8 pb-8 border-b border-slate-200">
          <h2 className="text-slate-900 mb-4">6. Annonseringsbudsjett</h2>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Månedlig budsjett for Meta Ads og Google Ads</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Ønsket fordeling</span>
                <p className="text-slate-600 text-sm mt-1">Branding vs Performance? Retargeting vs cold traffic?</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-slate-900 mb-2">Neste steg</h3>
          <p className="text-slate-700">
            Vi går gjennom dette skjemaet sammen i oppstartsmøtet. 
            Ta gjerne kontakt hvis du har spørsmål på forhånd.
          </p>
          <p className="text-slate-700 mt-2">
            <span className="font-medium">Kontakt:</span> media@skardigital.no
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 print:hidden">
        <div className="max-w-4xl mx-auto flex justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Skriv ut / Lagre som PDF
          </button>
        </div>
      </div>
    </div>
  );
}

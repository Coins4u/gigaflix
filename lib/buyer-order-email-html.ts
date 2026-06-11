/**
 * Modern invoice-style HTML for the buyer “secure checkout” email.
 * Table layout + inline styles for broad client support.
 * Colors align with app/globals.css :root (GiGa FliX brand).
 */

/** Mirrors :root in globals.css — keep in sync when rebranding */
const C = {
  primary: "#2c1596",
  primaryDark: "#1b0d5f",
  bgPage: "#f5f5f7",
  bgCard: "#ffffff",
  text: "#111111",
  textGray: "#4b5563",
  border: "#e5e7eb",
  ctaText: "#ffffff",
  /** Soft tint of primary for notice box */
  alertBg: "#f3f1ff",
  alertBorder: "#c7bfff",
  headerSub: "rgba(255,255,255,0.92)",
  headerInvoice: "rgba(255,255,255,0.85)",
  linkOnWhite: "#2c1596",
} as const;

/**
 * Dark mode for clients that honor `prefers-color-scheme` + embedded `<style>`.
 * Scoped so we do **not** blanket-paint every `td` (that washed out the header,
 * CTA, and callouts). Uses `!important` to override inline styles where allowed.
 */
const EMAIL_DARK_MODE_STYLE = `
:root { color-scheme: light dark; }
@media (prefers-color-scheme: dark) {
  body.gf-email-root,
  table.gf-email-outer {
    background-color: #0e0e14 !important;
  }
  table.gf-email-card {
    background-color: #16161e !important;
    border: 1px solid #3d3d4f !important;
  }
  table.gf-email-card td.gf-email-main,
  table.gf-email-card td.gf-email-footer {
    background-color: #16161e !important;
  }
  table.gf-email-card td.gf-email-footer {
    border-top: 1px solid #3d3d4f !important;
  }

  /* Header row: keep gradient + light type (do not inherit “body” colors) */
  table.gf-email-card td.gf-email-header p {
    color: rgba(255, 255, 255, 0.94) !important;
  }
  table.gf-email-card td.gf-email-header strong {
    color: #ffffff !important;
  }

  /* Opening lines only (not nested module copy) */
  table.gf-email-card td.gf-email-main > p:not(.gf-email-muted) {
    color: #e2e2e8 !important;
  }
  table.gf-email-card td.gf-email-main > p:not(.gf-email-muted) strong {
    color: #ffffff !important;
  }

  table.gf-email-card .gf-email-muted {
    color: #9b9ba8 !important;
  }
  table.gf-email-card a {
    color: #c4b5fd !important;
  }
  table.gf-email-card .gf-email-heading {
    color: #ede9fe !important;
  }
  table.gf-email-card .gf-email-price {
    color: #e9d5ff !important;
  }
  table.gf-email-card .gf-email-critical {
    color: #fb7185 !important;
  }

  /* Inset panels (bill-to, steps, line item) */
  table.gf-email-card .gf-email-surface {
    background-color: #1f1f28 !important;
    border-color: #4b4b5e !important;
  }
  table.gf-email-card .gf-email-surface td {
    border-color: #4b4b5e !important;
    color: #e4e4ea !important;
  }
  table.gf-email-card .gf-email-surface td.gf-email-muted {
    color: #9b9ba8 !important;
  }
  table.gf-email-card .gf-email-surface p {
    color: #e4e4ea !important;
  }
  table.gf-email-card .gf-email-surface strong {
    color: #ffffff !important;
  }

  /* Secure checkout notice */
  table.gf-email-card .gf-email-alert {
    background-color: #252036 !important;
    border-color: #6d5bd0 !important;
  }
  table.gf-email-card .gf-email-alert p {
    color: #eceaf5 !important;
  }
  table.gf-email-card .gf-email-alert strong {
    color: #ddd6fe !important;
  }

  /* CTA pill: slightly brighter edge in dark UI */
  table.gf-email-card td.gf-email-cta-wrap {
    box-shadow: 0 6px 28px rgba(99, 102, 241, 0.45) !important;
  }
  table.gf-email-card td.gf-email-cta-wrap a {
    color: #ffffff !important;
  }

  /* Callouts: higher contrast text vs panel */
  table.gf-email-card .gf-email-callout-cyan {
    background-color: #0c1f2e !important;
    border-color: #0e7490 !important;
  }
  table.gf-email-card .gf-email-callout-cyan p {
    color: #cffafe !important;
  }
  table.gf-email-card .gf-email-callout-cyan strong {
    color: #5eead4 !important;
  }

  table.gf-email-card .gf-email-callout-amber {
    background-color: #29170a !important;
    border-color: #c2410c !important;
  }
  table.gf-email-card .gf-email-callout-amber p {
    color: #ffedd5 !important;
  }
  table.gf-email-card .gf-email-callout-amber strong {
    color: #fdba74 !important;
  }

  table.gf-email-card .gf-email-callout-green {
    background-color: #0f1f14 !important;
    border-color: #166534 !important;
  }
  table.gf-email-card .gf-email-callout-green p {
    color: #dcfce7 !important;
  }
  table.gf-email-card .gf-email-callout-green strong {
    color: #86efac !important;
  }

  table.gf-email-card .gf-email-sep {
    color: #5c5c70 !important;
  }
}
`;

export type BuyerLocale = "en" | "fr" | "nl" | "de" | "it" | "pt" | "es";

type BuyerEmailCopy = {
  subjectPrefix: string;
  htmlTitle: string;
  headerEyebrow: string;
  invoiceReference: string;
  greeting: string;
  thanksLine: string;
  billTo: string;
  paymentInstructions: string;
  secureCheckoutLabel: string;
  secureCheckoutText: string;
  ctaLabel: string;
  fallbackLinkHelp: string;
  stepGuideTitle: string;
  step1: string;
  step2: string;
  step3: string;
  criticalNotes: string;
  instantDeliveryTitle: string;
  instantDeliveryText: string;
  communicationProtocolTitle: string;
  communicationProtocolText: string;
  supportTitle: string;
  supportText: string;
  lineItem: string;
  amount: string;
  spamReminder: string;
  ignoreNotice: string;
  refundPolicy: string;
  termsOfService: string;
  plainHello: string;
  plainSecureReady: string;
  plainCheckoutNote: string;
  plainInvoiceReference: string;
  plainOpenPayment: string;
  plainPlan: string;
  plainSpamCheck: string;
  plainIgnoreNotice: string;
};

const COPY: Record<BuyerLocale, BuyerEmailCopy> = {
  en: {
    subjectPrefix: "Your order is ready",
    htmlTitle: "Your order is ready",
    headerEyebrow: "Your order is ready!",
    invoiceReference: "Invoice reference",
    greeting: "Hello",
    thanksLine:
      "Thank you for your order. Your technical configuration invoice is ready for settlement. Please use our secure payment gateway partner below to finalize your payment and activate your digital asset allocation.",
    billTo: "Bill to",
    paymentInstructions: "Payment Instructions",
    secureCheckoutLabel: "Note:",
    secureCheckoutText:
      "Please leave any optional description or note fields blank during checkout to ensure instant automated provisioning. Your access credentials and configuration data will be dispatched directly to your primary inbox immediately after network confirmation.",
    ctaLabel: "Complete Secure Payment via Whop",
    fallbackLinkHelp:
      "If the button does not open, copy and paste this URL into your browser:",
    stepGuideTitle: "Step-by-Step Payment Guide",
    step1:
      "Step 1: Click the secure link above to open our official Whop checkout page.",
    step2:
      "Step 2: Sign in or create a Whop account if prompted.",
    step3:
      "Step 3: Complete your payment using your preferred method (PayPal, Apple Pay, Google Pay, or credit card). Leave any optional description or note fields blank.",
    criticalNotes: "Critical Delivery & Security Notes",
    instantDeliveryTitle: "Instant Delivery:",
    instantDeliveryText:
      "Your access credentials and configuration data will be dispatched directly to your primary inbox immediately after network confirmation.",
    communicationProtocolTitle: "Secure Payment Partner:",
    communicationProtocolText:
      "Whop is our secure payment gateway partner. All transactions are processed through their encrypted checkout to protect your payment details.",
    supportTitle: "Technical Support:",
    supportText:
      "For all technical assistance or configuration help, please reply directly to this email. Our engineering team handles all support off-platform to maintain your privacy.",
    lineItem: "Line item",
    amount: "Amount",
    spamReminder:
      "After paying, please check your Spam or Promotions folder in case delivery details are filtered.",
    ignoreNotice: "If you did not request this email, you can safely ignore it.",
    refundPolicy: "Refund Policy",
    termsOfService: "Terms of Service",
    plainHello: "Hello",
    plainSecureReady:
      "Thank you for your order. Your technical configuration invoice is ready for settlement. Please use our secure payment gateway partner below to finalize your payment and activate your digital asset allocation.",
    plainCheckoutNote:
      "Note: Please leave any optional description or note fields blank during checkout to ensure instant automated provisioning. Your access credentials and configuration data will be dispatched directly to your primary inbox immediately after network confirmation.",
    plainInvoiceReference: "Invoice reference",
    plainOpenPayment: "Open payment link",
    plainPlan: "Plan",
    plainSpamCheck:
      "After paying, check your Spam folder if you do not see our confirmation.",
    plainIgnoreNotice: "If you did not request this email, you can ignore it.",
  },
  fr: {
    subjectPrefix: "Votre commande est prete",
    htmlTitle: "Votre commande est prete",
    headerEyebrow: "Votre commande est prete !",
    invoiceReference: "Reference de facture",
    greeting: "Bonjour",
    thanksLine:
      "Merci pour votre commande. Votre facture de configuration technique est prete a etre reglee. Veuillez utiliser notre partenaire de passerelle de paiement securise ci-dessous pour finaliser votre paiement et activer votre allocation d actifs numeriques.",
    billTo: "Facture a",
    paymentInstructions: "Instructions de paiement",
    secureCheckoutLabel: "Note :",
    secureCheckoutText:
      "Veuillez laisser vides tous les champs de description ou de note optionnels lors du paiement afin d assurer un provisionnement automatise instantane. Vos identifiants d acces et vos donnees de configuration seront envoyes directement dans votre boite de reception principale immediatement apres confirmation du reseau.",
    ctaLabel: "Finaliser le paiement securise via Whop",
    fallbackLinkHelp:
      "Si le bouton ne s ouvre pas, copiez-collez cette URL dans votre navigateur :",
    stepGuideTitle: "Guide de paiement etape par etape",
    step1:
      "Etape 1 : Cliquez sur le lien securise ci-dessus pour ouvrir notre page de paiement Whop officielle.",
    step2:
      "Etape 2 : Connectez-vous ou creez un compte Whop si vous y etes invite.",
    step3:
      "Etape 3 : Finalisez votre paiement avec le moyen de votre choix (PayPal, Apple Pay, Google Pay ou carte bancaire). Laissez vides les champs de description ou de note optionnels.",
    criticalNotes: "Notes critiques de livraison et de securite",
    instantDeliveryTitle: "Livraison instantanee :",
    instantDeliveryText:
      "Vos identifiants d acces et vos donnees de configuration seront envoyes directement dans votre boite de reception principale immediatement apres confirmation du reseau.",
    communicationProtocolTitle: "Partenaire de paiement securise :",
    communicationProtocolText:
      "Whop est notre partenaire de passerelle de paiement securise. Toutes les transactions sont traitees via leur checkout chiffre pour proteger vos informations de paiement.",
    supportTitle: "Support technique :",
    supportText:
      "Pour toute assistance technique ou aide de configuration, repondez directement a cet email. Notre equipe d ingenierie gere le support hors plateforme pour proteger votre confidentialite.",
    lineItem: "Article",
    amount: "Montant",
    spamReminder:
      "Apres paiement, verifiez vos dossiers Spam ou Promotions si les details de livraison sont filtres.",
    ignoreNotice:
      "Si vous n avez pas demande cet email, vous pouvez l ignorer en toute securite.",
    refundPolicy: "Politique de remboursement",
    termsOfService: "Conditions d utilisation",
    plainHello: "Bonjour",
    plainSecureReady:
      "Merci pour votre commande. Votre facture de configuration technique est prete a etre reglee. Veuillez utiliser notre partenaire de passerelle de paiement securise ci-dessous pour finaliser votre paiement et activer votre allocation d actifs numeriques.",
    plainCheckoutNote:
      "Note : Veuillez laisser vides tous les champs de description ou de note optionnels lors du paiement afin d assurer un provisionnement automatise instantane. Vos identifiants d acces et vos donnees de configuration seront envoyes directement dans votre boite de reception principale immediatement apres confirmation du reseau.",
    plainInvoiceReference: "Reference de facture",
    plainOpenPayment: "Ouvrir le lien de paiement",
    plainPlan: "Forfait",
    plainSpamCheck:
      "Apres paiement, verifiez votre dossier Spam si vous ne voyez pas notre confirmation.",
    plainIgnoreNotice:
      "Si vous n avez pas demande cet email, vous pouvez l ignorer.",
  },
  nl: {
    subjectPrefix: "Je bestelling is klaar",
    htmlTitle: "Je bestelling is klaar",
    headerEyebrow: "Je bestelling is klaar!",
    invoiceReference: "Factuurreferentie",
    greeting: "Hallo",
    thanksLine:
      "Bedankt voor je bestelling. Je technische configuratiefactuur is klaar voor betaling. Gebruik onze beveiligde betaalgateway-partner hieronder om je betaling af te ronden en je digitale asset-toewijzing te activeren.",
    billTo: "Factuur voor",
    paymentInstructions: "Betaalinstructies",
    secureCheckoutLabel: "Opmerking:",
    secureCheckoutText:
      "Laat optionele beschrijvings- of notitievelden leeg tijdens het afrekenen om directe geautomatiseerde levering te garanderen. Je toegangsgegevens en configuratiedata worden direct naar je primaire inbox gestuurd zodra de betaling is bevestigd.",
    ctaLabel: "Voltooi beveiligde betaling via Whop",
    fallbackLinkHelp:
      "Als de knop niet opent, kopieer en plak deze URL in je browser:",
    stepGuideTitle: "Stapsgewijze betaalgids",
    step1:
      "Stap 1: Klik op de beveiligde link hierboven om onze officiële Whop-checkoutpagina te openen.",
    step2:
      "Stap 2: Log in of maak een Whop-account aan indien gevraagd.",
    step3:
      "Stap 3: Rond je betaling af met je voorkeursmethode (PayPal, Apple Pay, Google Pay of creditcard). Laat optionele beschrijvings- of notitievelden leeg.",
    criticalNotes: "Belangrijke leverings- en beveiligingsnotities",
    instantDeliveryTitle: "Directe levering:",
    instantDeliveryText:
      "Je toegangsgegevens en configuratiedata worden direct naar je primaire inbox gestuurd zodra de betaling is bevestigd.",
    communicationProtocolTitle: "Beveiligde betaalpartner:",
    communicationProtocolText:
      "Whop is onze beveiligde betaalgateway-partner. Alle transacties worden verwerkt via hun versleutelde checkout om je betaalgegevens te beschermen.",
    supportTitle: "Technische ondersteuning:",
    supportText:
      "Voor alle technische hulp of configuratiehulp kun je direct op deze e-mail reageren. Ons engineeringteam behandelt ondersteuning buiten het platform om je privacy te beschermen.",
    lineItem: "Regel",
    amount: "Bedrag",
    spamReminder:
      "Controleer na betaling je Spam- of Promoties-map als leveringsdetails worden gefilterd.",
    ignoreNotice:
      "Als je deze e-mail niet hebt aangevraagd, kun je deze veilig negeren.",
    refundPolicy: "Terugbetalingsbeleid",
    termsOfService: "Servicevoorwaarden",
    plainHello: "Hallo",
    plainSecureReady:
      "Bedankt voor je bestelling. Je technische configuratiefactuur is klaar voor betaling. Gebruik onze beveiligde betaalgateway-partner hieronder om je betaling af te ronden en je digitale asset-toewijzing te activeren.",
    plainCheckoutNote:
      "Opmerking: Laat optionele beschrijvings- of notitievelden leeg tijdens het afrekenen om directe geautomatiseerde levering te garanderen. Je toegangsgegevens en configuratiedata worden direct naar je primaire inbox gestuurd zodra de betaling is bevestigd.",
    plainInvoiceReference: "Factuurreferentie",
    plainOpenPayment: "Open betaallink",
    plainPlan: "Plan",
    plainSpamCheck:
      "Controleer na betaling je Spam-map als je onze bevestiging niet ziet.",
    plainIgnoreNotice:
      "Als je deze e-mail niet hebt aangevraagd, kun je deze negeren.",
  },
  de: {
    subjectPrefix: "Ihre Bestellung ist bereit",
    htmlTitle: "Ihre Bestellung ist bereit",
    headerEyebrow: "Ihre Bestellung ist bereit!",
    invoiceReference: "Rechnungsreferenz",
    greeting: "Hallo",
    thanksLine:
      "Vielen Dank fuer Ihre Bestellung. Ihre technische Konfigurationsrechnung ist zur Zahlung bereit. Bitte nutzen Sie unseren sicheren Zahlungsgateway-Partner unten, um Ihre Zahlung abzuschliessen und Ihre digitale Asset-Zuweisung zu aktivieren.",
    billTo: "Rechnung an",
    paymentInstructions: "Zahlungsanweisungen",
    secureCheckoutLabel: "Hinweis:",
    secureCheckoutText:
      "Bitte lassen Sie optionale Beschreibungs- oder Notizfelder beim Checkout leer, um eine sofortige automatische Bereitstellung zu gewaehrleisten. Ihre Zugangsdaten und Konfigurationsdaten werden direkt nach Netzwerkbestaetigung an Ihren primaeren Posteingang gesendet.",
    ctaLabel: "Sichere Zahlung ueber Whop abschliessen",
    fallbackLinkHelp:
      "Wenn der Button nicht geoeffnet wird, kopieren Sie diese URL in Ihren Browser:",
    stepGuideTitle: "Schritt-fuer-Schritt Zahlungsanleitung",
    step1:
      "Schritt 1: Klicken Sie auf den sicheren Link oben, um unsere offizielle Whop-Checkout-Seite zu oeffnen.",
    step2:
      "Schritt 2: Melden Sie sich an oder erstellen Sie ein Whop-Konto, falls Sie dazu aufgefordert werden.",
    step3:
      "Schritt 3: Schliessen Sie die Zahlung mit Ihrer bevorzugten Methode ab (PayPal, Apple Pay, Google Pay oder Kreditkarte). Lassen Sie optionale Beschreibungs- oder Notizfelder leer.",
    criticalNotes: "Wichtige Liefer- und Sicherheitshinweise",
    instantDeliveryTitle: "Sofortige Zustellung:",
    instantDeliveryText:
      "Ihre Zugangsdaten und Konfigurationsdaten werden direkt nach Netzwerkbestaetigung an Ihren primaeren Posteingang gesendet.",
    communicationProtocolTitle: "Sicherer Zahlungspartner:",
    communicationProtocolText:
      "Whop ist unser sicherer Zahlungsgateway-Partner. Alle Transaktionen werden ueber deren verschluesselten Checkout verarbeitet, um Ihre Zahlungsdaten zu schuetzen.",
    supportTitle: "Technischer Support:",
    supportText:
      "Bei technischer Hilfe oder Konfigurationshilfe antworten Sie bitte direkt auf diese E-Mail. Unser Engineering-Team bearbeitet den Support ausserhalb der Plattform zum Schutz Ihrer Privatsphaere.",
    lineItem: "Position",
    amount: "Betrag",
    spamReminder:
      "Pruefen Sie nach der Zahlung Ihren Spam- oder Werbeordner, falls Lieferdetails gefiltert werden.",
    ignoreNotice:
      "Wenn Sie diese E-Mail nicht angefordert haben, koennen Sie sie sicher ignorieren.",
    refundPolicy: "Rueckerstattungsrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    plainHello: "Hallo",
    plainSecureReady:
      "Vielen Dank fuer Ihre Bestellung. Ihre technische Konfigurationsrechnung ist zur Zahlung bereit. Bitte nutzen Sie unseren sicheren Zahlungsgateway-Partner unten, um Ihre Zahlung abzuschliessen und Ihre digitale Asset-Zuweisung zu aktivieren.",
    plainCheckoutNote:
      "Hinweis: Bitte lassen Sie optionale Beschreibungs- oder Notizfelder beim Checkout leer, um eine sofortige automatische Bereitstellung zu gewaehrleisten. Ihre Zugangsdaten und Konfigurationsdaten werden direkt nach Netzwerkbestaetigung an Ihren primaeren Posteingang gesendet.",
    plainInvoiceReference: "Rechnungsreferenz",
    plainOpenPayment: "Zahlungslink oeffnen",
    plainPlan: "Tarif",
    plainSpamCheck:
      "Pruefen Sie nach der Zahlung Ihren Spam-Ordner, wenn Sie unsere Bestaetigung nicht sehen.",
    plainIgnoreNotice:
      "Wenn Sie diese E-Mail nicht angefordert haben, koennen Sie sie ignorieren.",
  },
  it: {
    subjectPrefix: "Il tuo ordine e pronto",
    htmlTitle: "Il tuo ordine e pronto",
    headerEyebrow: "Il tuo ordine e pronto!",
    invoiceReference: "Riferimento fattura",
    greeting: "Ciao",
    thanksLine:
      "Grazie per il tuo ordine. La tua fattura di configurazione tecnica e pronta per il pagamento. Utilizza il nostro partner gateway di pagamento sicuro qui sotto per finalizzare il pagamento e attivare l allocazione dei tuoi asset digitali.",
    billTo: "Fatturato a",
    paymentInstructions: "Istruzioni di pagamento",
    secureCheckoutLabel: "Nota:",
    secureCheckoutText:
      "Lascia vuoti eventuali campi opzionali di descrizione o note durante il checkout per garantire un provisioning automatico istantaneo. Le tue credenziali di accesso e i dati di configurazione saranno inviati direttamente alla tua casella di posta principale subito dopo la conferma di rete.",
    ctaLabel: "Completa il pagamento sicuro tramite Whop",
    fallbackLinkHelp:
      "Se il pulsante non si apre, copia e incolla questo URL nel browser:",
    stepGuideTitle: "Guida al pagamento passo dopo passo",
    step1:
      "Passo 1: Clicca sul link sicuro qui sopra per aprire la nostra pagina di checkout Whop ufficiale.",
    step2:
      "Passo 2: Accedi o crea un account Whop se richiesto.",
    step3:
      "Passo 3: Completa il pagamento con il metodo che preferisci (PayPal, Apple Pay, Google Pay o carta di credito). Lascia vuoti i campi opzionali di descrizione o note.",
    criticalNotes: "Note critiche su consegna e sicurezza",
    instantDeliveryTitle: "Consegna istantanea:",
    instantDeliveryText:
      "Le tue credenziali di accesso e i dati di configurazione saranno inviati direttamente alla tua casella di posta principale subito dopo la conferma di rete.",
    communicationProtocolTitle: "Partner di pagamento sicuro:",
    communicationProtocolText:
      "Whop e il nostro partner gateway di pagamento sicuro. Tutte le transazioni vengono elaborate tramite il loro checkout crittografato per proteggere i tuoi dati di pagamento.",
    supportTitle: "Supporto tecnico:",
    supportText:
      "Per assistenza tecnica o supporto di configurazione, rispondi direttamente a questa email. Il nostro team di ingegneria gestisce il supporto fuori piattaforma per proteggere la tua privacy.",
    lineItem: "Voce",
    amount: "Importo",
    spamReminder:
      "Dopo il pagamento, controlla la cartella Spam o Promozioni nel caso in cui i dettagli di consegna vengano filtrati.",
    ignoreNotice:
      "Se non hai richiesto questa email, puoi ignorarla in sicurezza.",
    refundPolicy: "Politica di rimborso",
    termsOfService: "Termini di servizio",
    plainHello: "Ciao",
    plainSecureReady:
      "Grazie per il tuo ordine. La tua fattura di configurazione tecnica e pronta per il pagamento. Utilizza il nostro partner gateway di pagamento sicuro qui sotto per finalizzare il pagamento e attivare l allocazione dei tuoi asset digitali.",
    plainCheckoutNote:
      "Nota: Lascia vuoti eventuali campi opzionali di descrizione o note durante il checkout per garantire un provisioning automatico istantaneo. Le tue credenziali di accesso e i dati di configurazione saranno inviati direttamente alla tua casella di posta principale subito dopo la conferma di rete.",
    plainInvoiceReference: "Riferimento fattura",
    plainOpenPayment: "Apri link di pagamento",
    plainPlan: "Piano",
    plainSpamCheck:
      "Dopo il pagamento, controlla la cartella Spam se non vedi la nostra conferma.",
    plainIgnoreNotice:
      "Se non hai richiesto questa email, puoi ignorarla.",
  },
  pt: {
    subjectPrefix: "Seu pedido esta pronto",
    htmlTitle: "Seu pedido esta pronto",
    headerEyebrow: "Seu pedido esta pronto!",
    invoiceReference: "Referencia da fatura",
    greeting: "Ola",
    thanksLine:
      "Obrigado pelo seu pedido. Sua fatura de configuracao tecnica esta pronta para pagamento. Use nosso parceiro de gateway de pagamento seguro abaixo para finalizar seu pagamento e ativar sua alocacao de ativos digitais.",
    billTo: "Faturar para",
    paymentInstructions: "Instrucoes de pagamento",
    secureCheckoutLabel: "Nota:",
    secureCheckoutText:
      "Deixe em branco quaisquer campos opcionais de descricao ou observacao durante o checkout para garantir provisionamento automatizado instantaneo. Suas credenciais de acesso e dados de configuracao serao enviados diretamente para sua caixa de entrada principal imediatamente apos a confirmacao da rede.",
    ctaLabel: "Concluir pagamento seguro via Whop",
    fallbackLinkHelp:
      "Se o botao nao abrir, copie e cole esta URL no seu navegador:",
    stepGuideTitle: "Guia de pagamento passo a passo",
    step1:
      "Passo 1: Clique no link seguro acima para abrir nossa pagina oficial de checkout Whop.",
    step2:
      "Passo 2: Faca login ou crie uma conta Whop se solicitado.",
    step3:
      "Passo 3: Conclua seu pagamento usando seu metodo preferido (PayPal, Apple Pay, Google Pay ou cartao de credito). Deixe em branco campos opcionais de descricao ou observacao.",
    criticalNotes: "Notas criticas de entrega e seguranca",
    instantDeliveryTitle: "Entrega instantanea:",
    instantDeliveryText:
      "Suas credenciais de acesso e dados de configuracao serao enviados diretamente para sua caixa de entrada principal imediatamente apos a confirmacao da rede.",
    communicationProtocolTitle: "Parceiro de pagamento seguro:",
    communicationProtocolText:
      "A Whop e nossa parceira de gateway de pagamento seguro. Todas as transacoes sao processadas por meio do checkout criptografado para proteger seus dados de pagamento.",
    supportTitle: "Suporte tecnico:",
    supportText:
      "Para ajuda tecnica ou configuracao, responda diretamente a este email. Nossa equipe de engenharia presta suporte fora da plataforma para manter sua privacidade.",
    lineItem: "Item",
    amount: "Valor",
    spamReminder:
      "Apos o pagamento, verifique sua pasta de Spam ou Promocoes caso os detalhes de entrega sejam filtrados.",
    ignoreNotice:
      "Se voce nao solicitou este email, pode ignora-lo com seguranca.",
    refundPolicy: "Politica de reembolso",
    termsOfService: "Termos de servico",
    plainHello: "Ola",
    plainSecureReady:
      "Obrigado pelo seu pedido. Sua fatura de configuracao tecnica esta pronta para pagamento. Use nosso parceiro de gateway de pagamento seguro abaixo para finalizar seu pagamento e ativar sua alocacao de ativos digitais.",
    plainCheckoutNote:
      "Nota: Deixe em branco quaisquer campos opcionais de descricao ou observacao durante o checkout para garantir provisionamento automatizado instantaneo. Suas credenciais de acesso e dados de configuracao serao enviados diretamente para sua caixa de entrada principal imediatamente apos a confirmacao da rede.",
    plainInvoiceReference: "Referencia da fatura",
    plainOpenPayment: "Abrir link de pagamento",
    plainPlan: "Plano",
    plainSpamCheck:
      "Apos o pagamento, verifique sua pasta de Spam se nao encontrar nossa confirmacao.",
    plainIgnoreNotice:
      "Se voce nao solicitou este email, pode ignora-lo.",
  },
  es: {
    subjectPrefix: "Tu pedido esta listo",
    htmlTitle: "Tu pedido esta listo",
    headerEyebrow: "Tu pedido esta listo!",
    invoiceReference: "Referencia de factura",
    greeting: "Hola",
    thanksLine:
      "Gracias por tu pedido. Tu factura de configuracion tecnica esta lista para el pago. Utiliza nuestro socio de pasarela de pago seguro a continuacion para finalizar tu pago y activar tu asignacion de activos digitales.",
    billTo: "Facturar a",
    paymentInstructions: "Instrucciones de pago",
    secureCheckoutLabel: "Nota:",
    secureCheckoutText:
      "Deja en blanco cualquier campo opcional de descripcion o nota durante el checkout para garantizar un aprovisionamiento automatizado instantaneo. Tus credenciales de acceso y datos de configuracion se enviaran directamente a tu bandeja de entrada principal inmediatamente despues de la confirmacion de red.",
    ctaLabel: "Completar pago seguro por Whop",
    fallbackLinkHelp:
      "Si el boton no se abre, copia y pega esta URL en tu navegador:",
    stepGuideTitle: "Guia de pago paso a paso",
    step1:
      "Paso 1: Haz clic en el enlace seguro de arriba para abrir nuestra pagina oficial de checkout de Whop.",
    step2:
      "Paso 2: Inicia sesion o crea una cuenta de Whop si se te solicita.",
    step3:
      "Paso 3: Completa tu pago con tu metodo preferido (PayPal, Apple Pay, Google Pay o tarjeta). Deja en blanco los campos opcionales de descripcion o nota.",
    criticalNotes: "Notas criticas de entrega y seguridad",
    instantDeliveryTitle: "Entrega instantanea:",
    instantDeliveryText:
      "Tus credenciales de acceso y datos de configuracion se enviaran directamente a tu bandeja de entrada principal inmediatamente despues de la confirmacion de red.",
    communicationProtocolTitle: "Socio de pago seguro:",
    communicationProtocolText:
      "Whop es nuestro socio de pasarela de pago seguro. Todas las transacciones se procesan a traves de su checkout cifrado para proteger tus datos de pago.",
    supportTitle: "Soporte tecnico:",
    supportText:
      "Para cualquier ayuda tecnica o de configuracion, responde directamente a este correo. Nuestro equipo de ingenieria gestiona el soporte fuera de la plataforma para proteger tu privacidad.",
    lineItem: "Concepto",
    amount: "Importe",
    spamReminder:
      "Despues del pago, revisa tu carpeta de Spam o Promociones por si los detalles de entrega se filtran.",
    ignoreNotice:
      "Si no solicitaste este correo, puedes ignorarlo de forma segura.",
    refundPolicy: "Politica de reembolso",
    termsOfService: "Terminos del servicio",
    plainHello: "Hola",
    plainSecureReady:
      "Gracias por tu pedido. Tu factura de configuracion tecnica esta lista para el pago. Utiliza nuestro socio de pasarela de pago seguro a continuacion para finalizar tu pago y activar tu asignacion de activos digitales.",
    plainCheckoutNote:
      "Nota: Deja en blanco cualquier campo opcional de descripcion o nota durante el checkout para garantizar un aprovisionamiento automatizado instantaneo. Tus credenciales de acceso y datos de configuracion se enviaran directamente a tu bandeja de entrada principal inmediatamente despues de la confirmacion de red.",
    plainInvoiceReference: "Referencia de factura",
    plainOpenPayment: "Abrir enlace de pago",
    plainPlan: "Plan",
    plainSpamCheck:
      "Despues del pago, revisa la carpeta de Spam si no ves nuestra confirmacion.",
    plainIgnoreNotice:
      "Si no solicitaste este correo, puedes ignorarlo.",
  },
};

function normalizeCountry(value: string): string {
  return value.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();
}

const LOCALE_BY_COUNTRY: Record<string, BuyerLocale> = {
  "france": "fr",
  "belgium": "fr",
  "switzerland": "fr",
  "luxembourg": "fr",
  "monaco": "fr",
  "haiti": "fr",
  "netherlands": "nl",
  "germany": "de",
  "austria": "de",
  "liechtenstein": "de",
  "italy": "it",
  "san marino": "it",
  "vatican city": "it",
  "portugal": "pt",
  "brazil": "pt",
  "spain": "es",
  "andorra": "es",
  "argentina": "es",
  "bolivia": "es",
  "chile": "es",
  "colombia": "es",
  "costa rica": "es",
  "cuba": "es",
  "dominican republic": "es",
  "ecuador": "es",
  "el salvador": "es",
  "guatemala": "es",
  "honduras": "es",
  "mexico": "es",
  "nicaragua": "es",
  "panama": "es",
  "paraguay": "es",
  "peru": "es",
  "uruguay": "es",
  "venezuela": "es",
};

export function resolveBuyerLocaleFromCountry(country: string): BuyerLocale {
  return LOCALE_BY_COUNTRY[normalizeCountry(country)] ?? "en";
}

export function getBuyerEmailSubject(
  tierName: string,
  invoiceRef: string,
  locale: BuyerLocale,
): string {
  const t = COPY[locale];
  return `${t.subjectPrefix} — ${tierName} (${invoiceRef})`;
}

export type BuyerOrderEmailParams = {
  fullName: string;
  email: string;
  country: string;
  tierName: string;
  sellAppLink: string;
  /** e.g. "$14.59 /mo" from the pricing card */
  priceDisplay: string;
  invoiceRef: string;
  siteOrigin: string;
  locale: BuyerLocale;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildBuyerOrderEmailHtml(p: BuyerOrderEmailParams): string {
  const t = COPY[p.locale];
  const name = escapeHtml(p.fullName);
  const mail = escapeHtml(p.email);
  const country = escapeHtml(p.country);
  const tier = escapeHtml(p.tierName);
  const price = escapeHtml(p.priceDisplay || "—");
  const link = escapeHtml(p.sellAppLink);
  const inv = escapeHtml(p.invoiceRef);
  const origin = p.siteOrigin.replace(/\/$/, "");
  const localePrefix =
    p.locale === "fr" ||
    p.locale === "de" ||
    p.locale === "it" ||
    p.locale === "nl" ||
    p.locale === "pt"
      ? `/${p.locale}`
      : "";
  const refundUrl = `${origin}${localePrefix}/RefundPolicy`;
  const termsUrl = `${origin}${localePrefix}/TermsConditions`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${escapeHtml(t.htmlTitle)}</title>
<style type="text/css">
${EMAIL_DARK_MODE_STYLE}
</style>
</head>
<body class="gf-email-root" style="margin:0;padding:0;background-color:${C.bgPage};font-family:'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
<table role="presentation" class="gf-email-outer" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};padding:24px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" class="gf-email-card" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:${C.bgCard};border-radius:12px;overflow:hidden;border:1px solid ${C.border};">
        <!-- Header: brand gradient (primary → primary-dark) -->
        <tr>
          <td class="gf-email-header" style="background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);background-color:${C.primaryDark};padding:28px 32px;text-align:center;">
            <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.12em;color:${C.headerSub};text-transform:uppercase;">${escapeHtml(t.headerEyebrow)}</p>
            <p style="margin:0 0 10px 0;font-size:28px;font-weight:700;color:#ffffff;font-family:Georgia,'Times New Roman',Times,serif;line-height:1.2;">GiGa FliX</p>
            <p style="margin:0;font-size:13px;color:${C.headerInvoice};">${escapeHtml(t.invoiceReference)}: <strong style="color:#ffffff;">${inv}</strong></p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td class="gf-email-main" style="padding:28px 32px 8px 32px;">
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${C.text};">${escapeHtml(t.greeting)} <strong>${name}</strong>,</p>
            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:${C.text};">${escapeHtml(t.thanksLine)}</p>
            <!-- Bill to -->
            <table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;margin-bottom:20px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p class="gf-email-muted" style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.08em;color:${C.textGray};text-transform:uppercase;">${escapeHtml(t.billTo)}</p>
                  <p style="margin:0 0 4px 0;font-size:16px;font-weight:700;color:${C.text};">${name}</p>
                  <p style="margin:0 0 4px 0;font-size:14px;"><a href="mailto:${mail}" style="color:${C.linkOnWhite};text-decoration:underline;">${mail}</a></p>
                  <p class="gf-email-muted" style="margin:0;font-size:14px;color:${C.textGray};">${country}</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px 0;">
              <tr>
                <td style="padding:0 0 10px 0;">
                  <p class="gf-email-heading" style="margin:0;font-size:20px;font-weight:800;color:${C.primaryDark};line-height:1.2;">${escapeHtml(t.paymentInstructions)}</p>
                </td>
              </tr>
              <tr>
                <td class="gf-email-alert" style="background-color:${C.alertBg};border:1px solid ${C.alertBorder};border-radius:10px;padding:14px 16px;">
                  <p style="margin:0;font-size:14px;line-height:1.6;color:${C.text};"><strong style="color:${C.primaryDark};">${escapeHtml(t.secureCheckoutLabel)}</strong> ${escapeHtml(t.secureCheckoutText)}</p>
                </td>
              </tr>
            </table>
            <!-- Prominent escrow CTA -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 18px auto;">
              <tr>
                <td class="gf-email-cta-wrap" style="border-radius:50px;background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);background-color:${C.primaryDark};">
                  <a href="${link}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:15px 30px;font-size:15px;font-weight:800;color:#ffffff;text-decoration:none;text-transform:none;">${escapeHtml(t.ctaLabel)}</a>
                </td>
              </tr>
            </table>
            <p class="gf-email-muted" style="margin:0 0 22px 0;font-size:13px;color:${C.textGray};text-align:center;">${escapeHtml(t.fallbackLinkHelp)}<br/><a href="${link}" style="color:${C.linkOnWhite};text-decoration:underline;word-break:break-all;">${link}</a></p>

            <!-- Step-by-step guide -->
            <table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;margin-bottom:20px;">
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid ${C.border};">
                  <p class="gf-email-heading" style="margin:0;font-size:14px;font-weight:700;color:${C.primaryDark};">${escapeHtml(t.stepGuideTitle)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid ${C.border};">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${escapeHtml(t.step1)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid ${C.border};">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${escapeHtml(t.step2)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${escapeHtml(t.step3)}</p>
                </td>
              </tr>
            </table>

            <!-- Critical delivery/security notes -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding:0 0 10px 0;">
                  <p class="gf-email-critical" style="margin:0;font-size:14px;font-weight:800;color:#b91c1c;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(t.criticalNotes)}</p>
                </td>
              </tr>
              <tr>
                <td class="gf-email-callout-cyan" style="background-color:#ecfeff;border:1px solid #67e8f9;border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:#0e7490;">${escapeHtml(t.instantDeliveryTitle)}</strong> ${escapeHtml(t.instantDeliveryText)}</p>
                </td>
              </tr>
              <tr><td style="height:10px;line-height:10px;font-size:10px;">&nbsp;</td></tr>
              <tr>
                <td class="gf-email-callout-amber" style="background-color:#fff7ed;border:1px solid #fdba74;border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:#9a3412;">${escapeHtml(t.communicationProtocolTitle)}</strong> ${escapeHtml(t.communicationProtocolText)}</p>
                </td>
              </tr>
              <tr><td style="height:10px;line-height:10px;font-size:10px;">&nbsp;</td></tr>
              <tr>
                <td class="gf-email-callout-green" style="background-color:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:#166534;">${escapeHtml(t.supportTitle)}</strong> ${escapeHtml(t.supportText)}</p>
                </td>
              </tr>
            </table>
            <!-- Line item -->
            <table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;">
              <tr>
                <td colspan="2" style="padding:12px 18px;border-bottom:1px solid ${C.border};">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td class="gf-email-muted" style="font-size:11px;font-weight:600;letter-spacing:0.06em;color:${C.textGray};text-transform:uppercase;">${escapeHtml(t.lineItem)}</td>
                      <td class="gf-email-muted" align="right" style="font-size:11px;font-weight:600;letter-spacing:0.06em;color:${C.textGray};text-transform:uppercase;">${escapeHtml(t.amount)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 18px;font-size:15px;font-weight:700;color:${C.text};vertical-align:top;">${tier}</td>
                <td class="gf-email-price" align="right" style="padding:16px 18px;font-size:15px;font-weight:700;color:${C.primaryDark};white-space:nowrap;vertical-align:top;">${price}</td>
              </tr>
            </table>
            <p class="gf-email-muted" style="margin:24px 0 0 0;font-size:13px;line-height:1.5;color:${C.textGray};">${escapeHtml(t.spamReminder)}</p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td class="gf-email-footer" style="padding:8px 32px 28px 32px;border-top:1px solid ${C.border};">
            <p class="gf-email-muted" style="margin:0 0 16px 0;font-size:12px;color:${C.textGray};line-height:1.5;">${escapeHtml(t.ignoreNotice)}</p>
            <p style="margin:0;font-size:13px;">
              <a href="${refundUrl}" style="color:${C.linkOnWhite};text-decoration:none;font-weight:600;">${escapeHtml(t.refundPolicy)}</a>
              <span class="gf-email-sep" style="color:${C.border};"> · </span>
              <a href="${termsUrl}" style="color:${C.linkOnWhite};text-decoration:none;font-weight:600;">${escapeHtml(t.termsOfService)}</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function buildBuyerOrderEmailText(
  p: Pick<
    BuyerOrderEmailParams,
    "fullName" | "tierName" | "priceDisplay" | "sellAppLink" | "invoiceRef" | "locale"
  >,
): string {
  const t = COPY[p.locale];
  const planLine = p.priceDisplay
    ? `${t.plainPlan}: ${p.tierName} — ${p.priceDisplay}`
    : `${t.plainPlan}: ${p.tierName}`;

  return `${t.plainHello} ${p.fullName},

${t.plainSecureReady}

${t.plainCheckoutNote}

${t.plainInvoiceReference}: ${p.invoiceRef}

${t.plainOpenPayment}: ${p.sellAppLink}

${planLine}

${t.plainSpamCheck}

${t.plainIgnoreNotice}

— GiGa FliX`;
}

export function generateInvoiceRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return `INV-${s}`;
}

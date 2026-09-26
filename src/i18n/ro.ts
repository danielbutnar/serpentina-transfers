import type { Dictionary } from "./en";

// Romanian copy (informal "tu"). Draft from the Claude Design hand-off, for the owner's review.
export const ro: Dictionary = {
  meta: {
    title: "Serpentina Transfers: transferuri aeroport Brașov (concept)",
    description:
      "Site concept pentru o firmă fictivă de transferuri din Brașov: prețuri fixe de la Otopeni, Brașov-Ghimbav, Sibiu și Cluj, rezervare în mai puțin de un minut.",
  },
  skip: "Sari la formularul de rezervare",
  concept: "Proiect conceptual, nu o companie reală",
  portfolio: "Proiect de portofoliu",
  nav: { label: "Principal", routes: "Rute", fleet: "Flotă", faq: "Întrebări", contact: "Contact" },
  languageLabel: "Limba",
  airports: { OTP: "București Otopeni", GHV: "Brașov-Ghimbav", SBZ: "Sibiu", CLJ: "Cluj-Napoca" },
  hero: {
    title: "Transferuri de la aeroport spre Brașov și munte",
    sub: "Preț fix de la început. Rezervi în mai puțin de un minut de pe telefon. Șoferul te așteaptă la sosiri cu numele tău pe o pancartă.",
    destinationsLabel: "Destinații",
    signNote: "Aceasta este pancarta pe care o ține șoferul la sosiri.",
  },
  sign: { company: "Serpentina Transfers", yourName: "Numele tău", preview: "Previzualizarea pancartei pe care o ține șoferul" },
  form: {
    title: "Transferul tău",
    from: "De la",
    to: "Spre",
    date: "Data și ora",
    passengers: "Pasageri",
    fewer: "Mai puțini pasageri",
    more: "Mai mulți pasageri",
    signLabel: "Numele de pe pancartă",
    fixed: "preț fix",
    car: "Autoturism · max. 4 pasageri",
    minibus: "Microbuz · 5–8 pasageri",
    book: "Rezervă acest transfer",
    errName: "Adaugă numele pentru pancartă, ca șoferul să te găsească.",
    errDate: "Alege data și ora preluării.",
    booked: "Rezervat (demo). Referință",
    included: "Combustibil, bagaje și 60 min de așteptare incluse.",
  },
  routes: {
    title: "Rute și prețuri",
    note: "Preț pe vehicul: autoturism (1–4) / microbuz (5–8). Apasă pe un preț ca să-l încarci în formular.",
    noteMobile: "Preț autoturism / microbuz. Atinge o rută ca s-o încarci în formular.",
    matrixHead: "Spre ↓ / De la →",
    caption: "Prețul pe vehicul de la fiecare aeroport la fiecare destinație",
    airportsLabel: "Aeroport",
    destination: "Destinație",
    cell: "{from} – {to}: autoturism {car}, microbuz {minibus}. Încarcă în formular",
    loaded: "{from} – {to} a fost încărcat în formular.",
  },
  fleet: {
    title: "Flotă",
    items: [
      { name: "Sedan", spec: "1–3 pers. · 3 valize" },
      { name: "Break", spec: "1–4 pers. · 5 valize sau schiuri" },
      { name: "Microbuz", spec: "5–8 pers. · 8 valize" },
    ],
  },
  faq: {
    title: "Întrebări",
    items: [
      {
        q: "Unde mă întâlnește șoferul?",
        a: "În sala de sosiri, imediat după ridicarea bagajelor, cu o pancartă pe care scrie numele introdus la rezervare.",
      },
      {
        q: "Ce se întâmplă dacă zborul întârzie?",
        a: "Urmărim zborul și ajustăm ora de preluare. Până la 60 de minute de așteptare după aterizare sunt incluse în preț.",
      },
      {
        q: "Prețul e chiar fix?",
        a: "Da. Prețul afișat include combustibilul, bagajele și timpul de așteptare. Nu se schimbă din cauza traficului sau a întârzierilor.",
      },
      { q: "Aveți scaune pentru copii?", a: "Da, gratuit. Adaugă vârsta copilului în notițele rezervării." },
      { q: "Cum plătesc?", a: "Cu cardul online după rezervare, sau cu cardul ori numerar direct șoferului." },
    ],
  },
  contact: {
    title: "Întrebări înainte de rezervare?",
    sub: "Pe WhatsApp în engleză, română sau germană. Non-stop.",
    whatsapp: "Scrie-ne pe WhatsApp",
    demo: "Acesta este un proiect concept, deci WhatsApp nu e conectat. Numărul de telefon și adresa de e-mail sunt exemple.",
  },
};

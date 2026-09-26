import type { CaseDictionary } from "./case-en";

// Romanian copy for the case study page (informal "tu"). Draft for the owner's review.
export const caseRo: CaseDictionary = {
  metaTitle: "Studiu de caz · Serpentina Transfers (concept)",
  metaDescription:
    "Cum a fost proiectat și construit conceptul Serpentina Transfers: rezervare, panoul proprietarului, pagini de rută, accesibilitate și viteză.",
  eyebrow: "Studiu de caz",
  title: "Serpentina Transfers: un site de rezervări pentru transferuri de la aeroport",
  lead: "Un site concept pentru o firmă fictivă de transferuri din Brașov, proiectat și construit ca proiect de portofoliu. Arată ce poate avea o firmă mică de transferuri sau tururi: un preț fix în câteva secunde, o rezervare terminată pe telefon în mai puțin de un minut și un panou de administrare în spate.",
  tryBooking: "Încearcă rezervarea",
  openDashboard: "Deschide demo-ul pentru proprietar",
  briefTitle: "Cerința",
  brief:
    "Călătorii aterizează la București Otopeni, Brașov-Ghimbav, Sibiu sau Cluj și trebuie să ajungă la Brașov, Poiana Brașov, Bran, Predeal sau Sinaia. Mulți sunt germani sau austrieci și mulți rezervă noaptea târziu, de pe telefon. Site-ul trebuie să răspundă deodată la trei întrebări: cât costă, cum rezerv și cine mă ia.",
  doesTitle: "Ce face site-ul",
  does: [
    "Un preț fix pe primul ecran, pe vehicul, în euro sau în lei pe paginile în română.",
    "Pancarta șoferului cu numele călătorului, actualizată în timp ce scrie.",
    "Rezervare în trei pași: căutarea zborului, pasageri și bagaje, o mașină potrivită, retur, fișier pentru calendar.",
    "Gestionarea rezervării: schimbarea orei sau anularea, cu regula de rambursare explicată înainte de confirmare.",
    "Un panou pentru proprietar: cursele zilei cu stări care urmează ceasul, alocarea șoferilor și un editor de prețuri care schimbă tot site-ul.",
    "20 de pagini de rută cu o hartă desenată după coordonate reale, toate în engleză, română și germană.",
  ],
  shots: {
    home: "Prima pagină pe desktop: titlul, pancarta șoferului cu numele scris în formular și panoul galben de rezervare cu preț fix.",
    booking: "Pasul 1 al rezervării pe telefon: data, ora preluării și un zbor găsit după număr.",
    dashboard: "Panoul proprietarului: cifrele principale și cursele zilei, cu un zbor întârziat și curse care așteaptă un șofer.",
  },
  designTitle: "Decizii de design",
  design:
    "Aspectul vine din semnalistica aeroporturilor: indicatoare galbene și negre, secțiuni numerotate, o grilă strictă și colțuri drepte. Elementul memorabil este pancarta cu nume pe care o știe orice călător din sala de sosiri. Nu există fotografii: mașinile și harta sunt desenate în cod. Direcția a fost aleasă dintre două variante făcute în Claude Design, apoi construită de mână.",
  a11yTitle: "Accesibilitate",
  a11y: "axe verifică fiecare pagină la 375, 768 și 1440 px, iar rezervarea și anularea sunt testate doar cu tastatura: link de sărit la conținut, etichetă vizibilă pe fiecare câmp, erori scrise lângă câmp cu un rezumat care primește focusul, dialog nativ pentru anulare, focus vizibil și fără animații pentru cine le-a oprit.",
  speedTitle: "Viteză",
  speed:
    "Măsurători Lighthouse pe site-ul live (27 septembrie 2026): performanță 100 pe desktop; pe un telefon simulat mai lent scorul a variat între 73 și 94 de la o rulare la alta, pe un laptop modest. Accesibilitate 100 și bune practici 100 la fiecare rulare. Scorul SEO e mai mic intenționat: un concept nu trebuie să apară în rezultatele căutării.",
  builtTitle: "Construit cu",
  built: [
    "Next.js 16 ca site static pe GitHub Pages",
    "React 19, TypeScript, Tailwind CSS 4",
    "34 de teste unitare pentru prețuri, rezervări, rute și regulile panoului",
    "Formatare, tipuri, lint și teste verificate la fiecare push",
    "Fără cookie-uri, fără trackere, fără cereri către alte site-uri",
  ],
  demoTitle: "Ce este demo",
  demo: "Nu se încasează și nu se trimite nimic. Plata cu cardul este un loc marcat unde un site real ar deschide plata Stripe, rezervările rămân doar în browserul vizitatorului, iar prețurile, șoferii și zborurile sunt date de exemplu.",
  credit: "Design și dezvoltare: Daniel Butnar.",
};

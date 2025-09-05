import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---- Utility: fake PDF download ----
function downloadTextAs(name, text, mime = "application/pdf") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const sections = [
  { id: "agenda21", title: "La Agenda 21" },
  { id: "milenio", title: "La Declaración del Milenio" },
  { id: "desarrollo", title: "Desarrollo sustentable" },
  { id: "participacion", title: "Participación social e institucional" },
  { id: "economia", title: "Economía y ambiente" },
];

const linkStyle =
  "underline underline-offset-4 decoration-2 hover:decoration-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 rounded";

const card = "rounded-2xl shadow-lg p-6 bg-white/90 backdrop-blur";

export default function SustainableSite() {
  const [active, setActive] = useState(sections[0].id);
  const [uploads, setUploads] = useState([]);
  const fileRef = useRef(null);

  const ActivePage = useMemo(() => {
    switch (active) {
      case "agenda21":
        return <Agenda21 />;
      case "milenio":
        return <Milenio />;
      case "desarrollo":
        return <Desarrollo />;
      case "participacion":
        return <Participacion />;
      case "economia":
        return <Economia />;
      default:
        return <Agenda21 />;
    }
  }, [active]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-50 text-slate-800">
      {/* Background accent */}
      <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#A7F3D0" offset="0%" />
              <stop stopColor="#6EE7B7" offset="50%" />
              <stop stopColor="#D1FAE5" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#g)">
            <circle cx="120" cy="100" r="80" />
            <circle cx="680" cy="160" r="120" />
            <circle cx="200" cy="520" r="140" />
          </g>
        </svg>
      </div>

      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-600 text-white grid place-content-center rounded-2xl font-bold">DS</div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Desarrollo Sustentable</h1>
            <p className="text-sm text-slate-600">Sitio informativo académico – trabajo inédito</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                active === s.id
                  ? "bg-emerald-600 text-white shadow"
                  : "hover:bg-white/70"
              }`}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </header>

      {/* Mobile menu */}
      <div className="md:hidden max-w-6xl mx-auto px-4">
        <select
          className="w-full mb-4 p-3 rounded-xl bg-white/90"
          value={active}
          onChange={(e) => setActive(e.target.value)}
        >
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left column: tools */}
          <aside className="md:col-span-1 space-y-6">
            {/* Upload card */}
            <div className={card}>
              <h2 className="text-lg font-semibold mb-2">Subir archivo</h2>
              <p className="text-sm text-slate-600 mb-3">
                Carga evidencias, apuntes o presentaciones (PDF/Imágenes/Docs).
              </p>
              <input
                type="file"
                ref={fileRef}
                className="w-full mb-3"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setUploads((u) => [...u, ...files.map((f) => ({ name: f.name, size: f.size }))]);
                }}
              />
              <ul className="text-sm space-y-1 max-h-24 overflow-auto">
                {uploads.map((f, i) => (
                  <li key={i} className="flex justify-between gap-2">
                    <span className="truncate">{f.name}</span>
                    <span className="text-slate-500">{(f.size / 1024).toFixed(1)} KB</span>
                  </li>
                ))}
                {uploads.length === 0 && (
                  <li className="text-slate-500">Aún no hay archivos.</li>
                )}
              </ul>
            </div>

            {/* Download card */}
            <div className={card}>
              <h2 className="text-lg font-semibold mb-2">Descargas</h2>
              <p className="text-sm text-slate-600 mb-4">Obtén un dossier PDF con apuntes básicos.</p>
              <button
                onClick={() =>
                  downloadTextAs(
                    "dossier_sustentabilidad.pdf",
                    "Dossier de consulta – Desarrollo sustentable (resumen).\n\n1) Conceptos clave...\n2) Marco internacional...\n3) Buenas prácticas...\n\nEste material es de referencia educativa.",
                    "application/pdf"
                  )
                }
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium shadow hover:opacity-95"
              >
                Descargar PDF
              </button>
            </div>

            {/* Useful links */}
            <div className={card}>
              <h2 className="text-lg font-semibold mb-2">Hipervínculos útiles</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <a className={linkStyle} href="https://www.un.org/sustainabledevelopment/es/" target="_blank" rel="noreferrer">
                    ONU – Objetivos de Desarrollo Sostenible
                  </a>
                </li>
                <li>
                  <a className={linkStyle} href="https://www.un.org/spanish/esa/sustdev/agenda21/" target="_blank" rel="noreferrer">
                    Texto de Agenda 21 (ONU)
                  </a>
                </li>
                <li>
                  <a className={linkStyle} href="https://www.ohchr.org/es/instruments-mechanisms/instruments/united-nations-millennium-declaration" target="_blank" rel="noreferrer">
                    Declaración del Milenio (ACNUDH)
                  </a>
                </li>
              </ul>
            </div>

            {/* Media */}
            <div className={card}>
              <h2 className="text-lg font-semibold mb-2">Multimedia</h2>
              <div className="space-y-3">
                <video controls className="w-full rounded-xl">
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
                <audio controls className="w-full">
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
                  Tu navegador no soporta el audio.
                </audio>
              </div>
            </div>
          </aside>

          {/* Right column: page content */}
          <section className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={card}
              >
                <ActivePage />
              </motion.div>
            </AnimatePresence>

            {/* Image strip */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={i}
                  src={`https://images.unsplash.com/photo-15${i}000000-0000-0000-0000-000000000000?auto=format&fit=crop&w=800&q=60`}
                  alt="Imagen temática naturaleza"
                  className="w-full h-40 object-cover rounded-2xl shadow"
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-slate-600">&copy; {new Date().getFullYear()} Proyecto académico – Desarrollo Sustentable.</p>
          <div className="flex items-center gap-4">
            <a className={linkStyle} href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Volver arriba</a>
            <a className={linkStyle} href="mailto:contacto@example.com">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ====== CONTENT PAGES ======
function Section({ title, lead, bullets }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight mb-2">{title}</h2>
      <p className="text-slate-700 mb-4">{lead}</p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Agenda21() {
  return (
    <Section
      title="La Agenda 21"
      lead="Plan de acción adoptado en la Cumbre de la Tierra (Río 1992) con líneas estratégicas para desarrollo sostenible a nivel global, nacional y local."
      bullets={[
        "Ejes: dimensión social, económica, ambiental y fortalecimiento de actores.",
        "Capítulos sobre combate a la pobreza, patrones de consumo, biodiversidad, agua y residuos.",
        "Impulsa Agenda 21 local: planes municipales con participación ciudadana.",
      ]}
    />
  );
}

function Milenio() {
  return (
    <Section
      title="La Declaración del Milenio"
      lead="Compromiso de la Asamblea General de la ONU (2000) que enmarca valores y metas para la paz, el desarrollo y los derechos humanos."
      bullets={[
        "Base de los Objetivos de Desarrollo del Milenio (2000–2015).",
        "Pilares: libertad, igualdad, solidaridad, tolerancia, respeto a la naturaleza y responsabilidad común.",
        "Énfasis en reducción de pobreza extrema y cooperación internacional.",
      ]}
    />
  );
}

function Desarrollo() {
  return (
    <Section
      title="Desarrollo sustentable"
      lead="Modelo que satisface las necesidades presentes sin comprometer la capacidad de las futuras generaciones. Integra dimensiones ambiental, social y económica."
      bullets={[
        "Economía circular y eficiencia de recursos.",
        "Transición energética y descarbonización.",
        "Gestión integral del agua, suelos y biodiversidad.",
      ]}
    />
  );
}

function Participacion() {
  return (
    <Section
      title="Participación social e institucional"
      lead="Corresponsabilidad entre ciudadanía, gobierno, academia y empresas para diseñar, ejecutar y evaluar políticas públicas sustentables."
      bullets={[
        "Mecanismos: cabildos abiertos, presupuestos participativos, consejos consultivos.",
        "Transparencia, datos abiertos y evaluación de impacto.",
        "Educación ambiental y cultura de la legalidad.",
      ]}
    />
  );
}

function Economia() {
  return (
    <Section
      title="Economía y ambiente"
      lead="Interacción entre sistemas económicos y ecosistemas: internalizar costos ambientales y promover incentivos verdes."
      bullets={[
        "Instrumentos: impuestos verdes, mercados de carbono, pagos por servicios ambientales.",
        "Indicadores más allá del PIB: capital natural, huella ecológica.",
        "Innovación, eco-diseño y finanzas sostenibles.",
      ]}
    />
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// 1. Imports 3adiyin (Server-side friendly) bach n-fixiw l-error
import AboutPreview from '@/components/AboutPreview';
import ServicesPreview from '@/components/ServicesPreview';
import WhyUs from '@/components/WhyUs';
import TechStack from '@/components/TechStack';
import ContactSection from '@/components/ContactSection';
import ChevronDivider from '@/components/ChevronDivider';

const allowedCities = ['casablanca', 'rabat', 'marrakech', 'agadir', 'tanger', 'fes', 'meknes'];

type Props = {
  params: Promise<{ city: string }>;
};

// SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: cityParam } = await params;
  if (!allowedCities.includes(cityParam.toLowerCase())) return {};
  const city = cityParam.charAt(0).toUpperCase() + cityParam.slice(1);
  
  return {
    title: `Société de Développement à ${city} | C-DIGITAL Web Agency`,
    description: `Besoin d'une société de développement à ${city} ? Agence experte en création de sites web et solutions digitales à ${city}.`,
    alternates: { canonical: `https://cdigital.ma/agence/${cityParam}` },
  };
}

export default async function CityLandingPage({ params }: Props) {
  const { city: cityParam } = await params;

  if (!cityParam || !allowedCities.includes(cityParam.toLowerCase())) {
    return notFound();
  }

  const city = cityParam.charAt(0).toUpperCase() + cityParam.slice(1);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-[120px] font-black uppercase leading-[0.8] tracking-tighter mb-10">
            {city} <br />
            <span className="text-violet-500">DIGITAL</span> HUB
          </h1>
          
          <p className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-gray-400 mb-12">
            Votre <span className="text-white">Société de Développement</span> à {city}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/contact" 
              className="group relative bg-violet-500 text-black px-12 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Démarrer à {city} 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      <ChevronDivider />
      <AboutPreview />
      
      <div className="py-20 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black uppercase mb-12 border-l-4 border-violet-500 pl-6">
            Expertise Locale à {city}
          </h2>
          <ServicesPreview />
        </div>
      </div>

      <ChevronDivider />
      <WhyUs />
      <TechStack />
      
      {/* Final CTA */}
      <section className="py-32 px-6 bg-violet-500 text-black text-center">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
          Let's Build <br /> in {city}
        </h2>
        <Link href="/contact" className="inline-block border-4 border-black px-12 py-5 font-black uppercase text-xl hover:bg-black hover:text-white transition-all">
          Contactez l'agence
        </Link>
      </section>

      <ContactSection />
    </main>
  );
}

export async function generateStaticParams() {
  return allowedCities.map((city) => ({ city: city }));
}
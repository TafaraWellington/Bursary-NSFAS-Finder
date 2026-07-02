import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';

export default function HomePage() {
  const t = useTranslations('Index');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6 relative">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
      
      {/* Auth Controls */}
      <div className="absolute top-6 right-6 z-20 flex space-x-4 items-center">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-sm font-semibold hover:text-gray-300 transition-colors">Log in</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-sm font-bold bg-white text-indigo-900 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Sign up</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>

      <div className="z-10 flex flex-col items-center max-w-3xl text-center space-y-8 p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-sm">
          {t('title')}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
          {t('description')}
        </p>

        <Link
          href="/profile"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-emerald-500 font-pj rounded-xl hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 hover:scale-105 active:scale-95"
        >
          {t('getStarted')}
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </Link>
      </div>

      {/* Language Switcher Example */}
      <div className="z-10 mt-12 flex space-x-4 text-sm text-gray-400">
        <Link href="/" locale="en" className="hover:text-white transition-colors">English</Link>
        <Link href="/" locale="zu" className="hover:text-white transition-colors">isiZulu</Link>
        <Link href="/" locale="af" className="hover:text-white transition-colors">Afrikaans</Link>
        <Link href="/" locale="xh" className="hover:text-white transition-colors">isiXhosa</Link>
      </div>
    </main>
  );
}

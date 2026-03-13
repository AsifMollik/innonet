import { LanguageProvider } from '@/contexts/LanguageContext';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  );
}

import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setIsRouteTransitioning(true);
    const handleRouteChangeEnd = () => setIsRouteTransitioning(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <ClerkProvider {...pageProps}>
      <div className={`page-transition ${isRouteTransitioning ? 'page-transition--leaving' : 'page-transition--entering'}`}>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
}

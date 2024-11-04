import { HomeProvider } from '@/context/HomeContext';

import Home from './home/Home';
import Navigation from './navigation/Navigation';

export default function RootPage() {
  return (
    <HomeProvider>
      <Navigation />
      <Home />
    </HomeProvider>
  );
}

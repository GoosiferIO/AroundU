import { HomeProvider } from '@/context/HomeContext';

import Home from './home/Home';

export default function RootPage() {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
}

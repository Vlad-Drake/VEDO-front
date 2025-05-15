import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/features/header';
import { Providers } from './providers';

export function App() {
  return (
    <Providers>
      <div>
        <AppHeader />
        <Outlet />
      </div>
    </Providers>
    
  );
}

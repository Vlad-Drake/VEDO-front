import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/features/header';
import { Providers } from './providers';
import { Footer } from '@/features/footer';

export function App() {
  return (
    <Providers>
      <div className='min-h-screen flex flex-col justify-between'>
        <div className='justify-start'>
          <AppHeader />
          <Outlet />
        </div>
        
        <div className='justify-end'>
          <Footer />
        </div>
        
      </div>
    </Providers>
    
  );
}

import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SideNav } from '../components/SideNav';

const MainLayout = () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />      

      <div className="flex flex-1">
        {/* Sidebar */}
        <SideNav />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
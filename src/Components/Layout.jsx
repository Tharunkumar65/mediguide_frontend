import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const hideFooterOnPaths = ['/']; // Add more paths if needed

  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);

  return (
    <>
    
      <main className="main-content">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default Layout;

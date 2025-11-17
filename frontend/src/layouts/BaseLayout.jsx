import { Outlet} from 'react-router-dom';
import './BaseLayout.css';
import Header from "../components/Header"
import Footer from "../components/Footer"
const BaseLayout = () => {
  return (
    <div className="base-layout">
      <Header/>
      <main className="content">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default BaseLayout;

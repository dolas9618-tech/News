import { Link } from 'react-router-dom';
import navIcon from '../assets/images/menu-btn (3).png';

function Header() {
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/categories">
          <img src={navIcon} alt="menu" className="menu-btn" />
        </Link>
        <Link to="/" className="header-btn" style={{ fontSize: '20px', letterSpacing: '1px' }}>
          SPORT.NEWS
        </Link>
      </div>
      <Link to="/" className="header-btn">Все новости</Link>
    </header>
  );
}

export default Header;
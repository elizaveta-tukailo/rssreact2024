import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/uncontrolled-form">Uncontrolled form</Link>
          <Link to="/hook-form">Hook form</Link>
        </nav>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/uncontrolled-form">Uncontrolled form</Link>
      <Link to="/hook-form">Hook form</Link>
    </nav>
  );
}

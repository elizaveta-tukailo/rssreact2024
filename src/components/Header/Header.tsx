import ErrorButton from '../ErrorBoundary/Button';
import Search from '../Search';
const Header: React.FC = () => {
  return (
    <header>
      <ErrorButton />
      <Search />
    </header>
  );
};

export default Header;

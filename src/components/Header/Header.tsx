import ErrorButton from '../ErrorBoundary/Button';
import Search from '../Search';
const Header = () => {
  return (
    <header>
      <ErrorButton />
      <Search />
    </header>
  );
};

export default Header;

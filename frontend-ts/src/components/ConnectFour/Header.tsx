import { useConnectFourContext } from '../../contexts/ConnectFour';

const Header = () => {
  const { currentColor, myColor } = useConnectFourContext();

  return (
    <header>
      <h1 id="message">It is currently {currentColor}'s turn.</h1>
      <h2>My color is {myColor}</h2>
    </header>
  );
};

export default Header;

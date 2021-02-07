import Header from './Header';
import Board from './Board';
import Actions from './Actions';
import { ConnectFourContextProvider } from '../../contexts/ConnectFour';

const ConnectFour = () => {
  return (
    <ConnectFourContextProvider>
      <>
        <Header />
        <Board />
        <Actions />
      </>
    </ConnectFourContextProvider>
  );
};

export default ConnectFour;

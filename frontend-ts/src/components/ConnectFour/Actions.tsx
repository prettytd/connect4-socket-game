import { useConnectFourContext } from '../../contexts/ConnectFour';

const Actions = () => {
  const { reset } = useConnectFourContext();

  return (
    <div id="buttonContainer">
      <button onClick={reset}>Reset Game</button>
    </div>
  );
};

export default Actions;

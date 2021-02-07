import { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Color, ColorClass } from '../types/ConnectFour';
import { getElementIdFromRowCol } from '../utils/connectFour';

interface ConnectFourContextInterface {
  myColor: Color | null;
  currentColor: Color | null;
  addBallToColumn(col: number): void;
  reset(): void;
}

const ConnectFourContext = createContext<ConnectFourContextInterface>({
  myColor: null,
  currentColor: null,
  addBallToColumn(col) {},
  reset() {},
});

export const ConnectFourContextProvider = ({ children }: { children: JSX.Element }) => {
  const [myColor, setMyColor] = useState<Color | null>(null);
  const [currentColor, setCurrentColor] = useState<Color | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const skt = io('http://localhost:3001');
    setSocket(skt);

    skt.on('connect', () => console.log(`socket connected: ${skt.id}`));

    skt.on('connect_error', () => {
      setTimeout(() => skt.connect(), 2000);
    });

    skt.on(
      'role-color',
      ({
        myColor: mColor,
        currentColor: curColor,
      }: {
        myColor: Color | null;
        currentColor: Color;
      }) => {
        setMyColor(mColor);
        setCurrentColor(curColor);
      }
    );

    skt.on(
      'add-ball',
      ({
        addedPosition,
        addedColor,
        currentColor: curColor,
      }: {
        addedPosition: { row: number; col: number };
        addedColor: Color;
        currentColor: Color;
      }) => {
        setCurrentColor(curColor);

        const elementId = getElementIdFromRowCol(addedPosition);
        const element = document.getElementById(elementId);

        if (!element) {
          console.error(`error: ${elementId} not found`);
          return;
        }

        const newDiv = document.createElement('div');
        newDiv.classList.add('style4');
        newDiv.classList.add(ColorClass[addedColor]);

        element.appendChild(newDiv);
      }
    );

    skt.on('reset', () => {
      document.querySelectorAll('.style4').forEach((e) => e.remove());
    });

    skt.on('disconnect', () => console.log(`socket disconnected: ${skt.id}`));

    return () => {
      skt.disconnect();
    };
  }, []);

  const addBallToColumn = (col: number) => {
    socket?.emit('add-ball-to-column', col);
  };

  const reset = () => {
    socket?.emit('reset');
  };

  return (
    <ConnectFourContext.Provider value={{ myColor, currentColor, addBallToColumn, reset }}>
      {children}
    </ConnectFourContext.Provider>
  );
};

export const useConnectFourContext = () => useContext(ConnectFourContext);

export default ConnectFourContext;

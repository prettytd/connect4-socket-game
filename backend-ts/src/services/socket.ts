import { Socket } from 'socket.io';
import connectFour from '../models/ConnectFour';
import { Color } from '../types/ConnectFour';

export const connection = (socket: Socket) => {
  console.log(`socket client connected: ${socket.id}`);

  const myColor = emitRoleColor(socket);

  socket.on('reset', () => reset(socket));

  socket.on('add-ball-to-column', (col: number) => addBallToColumn(socket, col, myColor));

  socket.on('disconnect', (reason) => {
    console.log(`socket client disconnected: ${socket.id} - ${reason}`);
    myColor && connectFour.removePlayer(myColor);
  });
};

const emitRoleColor = (socket: Socket): Color | null => {
  const myColor = connectFour.addPlayer();
  socket.emit('role-color', { myColor, currentColor: connectFour.getCurrentColor() });
  return myColor;
};

const addBallToColumn = (socket: Socket, col: number, myColor: Color | null) => {
  if (!myColor || myColor !== connectFour.getCurrentColor()) {
    return;
  }
  const { addedPosition, addedColor, currentColor } = connectFour.addBallToColumn(col);
  socket.broadcast.emit('add-ball', { addedPosition, addedColor, currentColor });
  socket.emit('add-ball', { addedPosition, addedColor, currentColor });
};

const reset = (socket: Socket) => {
  connectFour.reset();
  socket.broadcast.emit('reset');
  socket.emit('reset');
};

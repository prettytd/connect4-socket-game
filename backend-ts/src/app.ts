import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';
import { connection } from './services/socket';

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', function (req, res) {
  console.log(`Request body: ${req.body}`);
  res.send('Hello World!');
});

io.on('connection', connection);

server.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

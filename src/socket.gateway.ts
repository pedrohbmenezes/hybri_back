import {
 SubscribeMessage,
 WebSocketGateway,
 OnGatewayInit,
 WebSocketServer,
 OnGatewayConnection,
 OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

const options = {
  cors: {
    origin: ["http://localhost:4200", "localhost:4200"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
}
@WebSocketGateway(3000, options)
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');
  users: number = 0;

 @SubscribeMessage('msgToServer')
 handleMessage(client: Socket, payload: string): void {
   this.server.emit('chat', payload);
   this.logger.log(payload);
 }

 afterInit(server: Server) {
  this.logger.log('Init');
 }

 handleDisconnect(client: Socket) {
  this.logger.log(`Client disconnected: ${client.id}`);
 }

  handleConnection(client: Socket, ...args: any[]) {
   this.server.emit('users', client.id);
   this.logger.log(`Client connected: ${client.id}`);
 }
}


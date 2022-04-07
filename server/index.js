import http from 'http';
import { Server } from "socket.io";
import registerMessageHandlers from './handlers/message.js';
import registerUserHandlers from './handlers/user.js';

const server = http.createServer()
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
const log = console.log

const onConnection = (socket) => {
    log('User online')
    const { roomId } = socket.handshake.query

    console.log(roomId)
    socket.roomId = roomId

    socket.join(roomId)

    registerMessageHandlers(io, socket)
    registerUserHandlers(io, socket)

    socket.on('disconnect', () => {
        log('User offline')
        socket.leave(roomId)
    })
}

io.on('connection', onConnection)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is ready. Port: ${PORT}`)
})
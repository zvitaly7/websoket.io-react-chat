import { nanoid } from 'nanoid'
import { Low, JSONFile } from 'lowdb'
const adapter = new JSONFile('db/messages.json')
const db = new Low(adapter)

db.data = db.data || {
    messages: [
        {
            messageId: '1',
            userId: '1',
            senderName: 'Mister',
            messageText: 'What are you doing here?',
            createdAt: '2022-03-14'
        },
        {
            messageId: '2',
            userId: '2',
            senderName: 'Twister',
            messageText: 'Go back to work!',
            createdAt: '2022-03-15'
        }
    ]
}
db.write()

function registerMessageHandlers(io, socket){
    const getMessages = () => {
        const messages = db.data.messages
        io.in(socket.roomId).emit('messages', messages)
    }

    const addMessage = (message) => {
        db.data.messages.push({
                messageId: nanoid(8),
                createdAt: new Date(),
                ...message
            })
        db.write()

        getMessages()
    }

    const removeMessage = (messageId) => {
        db.data.messages = db.data.messages.filter(message => message.messageId !== messageId);
        db.write();

        getMessages()
    }

    socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
    socket.on('message:remove', removeMessage)
}

export default registerMessageHandlers;

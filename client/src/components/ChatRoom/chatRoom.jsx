import {useChat, useLocalStorage} from "../../hooks";
import { useParams } from 'react-router-dom';
import { MessageForm } from './MessageForm/messageForm'
import { MessageList } from './MessageList/messageList'
import { UserList } from './UserList/userList'

export const ChatRoom = () => {
    let { roomId } = useParams();
    const [username] = useLocalStorage('username', 'John')
    const { users, messages, sendMessage, removeMessage } = useChat(roomId)
    console.log(users)

    return (
        <div className='container chat'>
            <UserList users={users}/>
            <div className='container message'>
                <MessageList
                    messages={messages}
                    removeMessage={removeMessage}
                />
                <MessageForm username={username} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
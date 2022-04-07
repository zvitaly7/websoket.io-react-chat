import TimeAgo from 'react-timeago'
import { ListGroup, Card, Button } from 'react-bootstrap'
import { AiOutlineDelete } from 'react-icons/ai'

export const MessageListItem = ({ msg, removeMessage }) => {
    const handleRemoveMessage = (id) => {
        debugger
        removeMessage(id)
    }

    const { messageId, messageText, senderName, createdAt, currentUser } = msg
    return (
        <ListGroup.Item
            className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
        >
            <Card
                bg={`${currentUser ? 'success' : 'secondary'}`}
                text='light'
                style={{ width: '55%' }}
            >
                <Card.Header className='d-flex justify-content-between align-items-center'>
                    <Card.Text as={TimeAgo} date={createdAt} className='small' />
                    <Card.Text>{senderName}</Card.Text>
                </Card.Header>
                <Card.Body className='d-flex justify-content-between align-items-center'>
                    <Card.Text>{messageText}</Card.Text>
                    {/* удалять сообщения может только отправивший их пользователь */}
                    {currentUser && (
                        <Button
                            variant='none'
                            className='text-warning'
                            onClick={() => handleRemoveMessage(messageId)}
                        >
                            <AiOutlineDelete />
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </ListGroup.Item>
    )
}
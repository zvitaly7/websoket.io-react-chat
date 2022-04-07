import { Accordion, Card, Badge } from 'react-bootstrap'
import { RiRadioButtonLine } from 'react-icons/ri'

export const UserList = ({ users }) => {
    const usersArr = Object.entries(users)
    const activeUsers = Object.values(users)
        .filter((u) => u.online).length

    return (
        <Accordion className="m-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                        Active users{' '}
                        <Badge variant='light' className='ml-1'>
                            {activeUsers}
                        </Badge>
                </Accordion.Header>
                <Accordion.Body>
                        {usersArr.map(([userId, obj]) => (
                            <Card.Body key={userId}>
                                <RiRadioButtonLine
                                    className={`mb-1 ${
                                        obj.online ? 'text-success' : 'text-secondary'
                                    }`}
                                    size='0.8em'
                                />{' '}
                                {obj.username}
                            </Card.Body>
                        ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
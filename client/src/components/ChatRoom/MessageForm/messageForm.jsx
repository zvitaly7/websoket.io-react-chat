import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Picker } from 'emoji-mart'
import { FiSend } from 'react-icons/fi'
import { GrEmoji } from 'react-icons/gr'

export const MessageForm = ({ username, sendMessage }) => {
    const [text, setText] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)

    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    const handleEmojiShow = () => {
        setShowEmoji((v) => !v)
    }

    const handleEmojiSelect = (e) => {
        setText((text) => (text += e.native))
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        const trimmed = text.trim()
        if (trimmed) {
            sendMessage({ messageText: text, senderName: username })
            setText('')
        }
    }

    return (
        <>
            <Form onSubmit={handleSendMessage}>
                <Form.Group className='d-flex'>
                    <Button variant='primary' type='button' onClick={handleEmojiShow}>
                        <GrEmoji />
                    </Button>
                    <Form.Control
                        value={text}
                        onChange={handleChangeText}
                        type='text'
                        placeholder='Message...'
                    />
                    <Button variant='success' type='submit'>
                        <FiSend />
                    </Button>
                </Form.Group>
            </Form>
            {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={20} />}
        </>
    )
}
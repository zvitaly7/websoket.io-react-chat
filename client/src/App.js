import {
    BrowserRouter as Router,
    Route, Routes
} from "react-router-dom";
import { Container } from 'react-bootstrap'
import { Home, ChatRoom } from './components'

export const App = () => (
    <Router>
      <Container style={{ maxWidth: '512px' }}>
        <h1 className='mt-2 text-center'>React Chat App</h1>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/:roomId" element={<ChatRoom/>}/>
        </Routes>
      </Container>
    </Router>
)
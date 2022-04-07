const users = {
    1: { username: 'Mister', online: false },
    2: { username: 'Twister', online: false }
}

function registerUserHandlers(io, socket) {
    const getUsers = () => {
        io.in(socket.roomId).emit('users', users)
    }

    const addUser = ({ username, userId }) => {
        console.log('username, userId')
        if (!users[userId]) {
            users[userId] = { username, online: true }
        } else {
            users[userId].online = true
        }
        getUsers()
    }

    const removeUser = (userId) => {
        users[userId].online = false
        getUsers()
    }

    socket.on('user:get', getUsers)
    socket.on('user:add', addUser)
    socket.on('user:leave', removeUser)
}
export default registerUserHandlers;
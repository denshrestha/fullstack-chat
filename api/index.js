const db = require('./services/db')
const server = require('./app')
const io = require('./soketIO')
const {setMessage} = require('./controllers/messages/messageController')

db().then(() => {
  console.log('DB connection!~')
})

const hub = []

io.on('connection', socket => {
  socket.on('userEnter', (data) => {
    const {id} = data
    socket.join(id)
    socket.broadcast.emit('enterSuccess', {text: `User entered to App ${id}`})
  })
  socket.on('createMessage', async (data) => {
    const newData = await setMessage(data)
    io.to(newData.id).emit('message', newData)
  })
  socket.on('notifyFriendRequest', async (data) => {
    console.log('Client emit data', data)
  })
})

export default {
  path: '/api',
  handler: server
}

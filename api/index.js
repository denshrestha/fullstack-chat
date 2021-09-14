const db = require('./services/db')
const server = require('./app')
const io = require('./soketIO')
const {setMessage} = require('./controllers/messages/messageController')

db().then(() => {
  console.log('DB connection!~')
})

io.on('connection', socket => {
  socket.on('userEnter', (data) => {
    const {id} = data
    socket.join(id)
    socket.broadcast.emit('enterSuccess', {text: `User entered to room ${id}`})
    // socket.emit('enterSuccess',  `User entered to room ${id}`)
  })
  socket.on('createMessage', async (data) => {
    const newData = await setMessage(data)
    io.to(newData.id).emit('message', newData)
  })
})

export default {
  path: '/api',
  handler: server
}

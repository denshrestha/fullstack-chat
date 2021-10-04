
const db = require('./services/db')
const server = require('./app')
const io = require('./soketIO')
const Connect = require('./resources/connect')
const {setMessage} = require('./controllers/messages')
const {createFriendsNotification} = require('./controllers/notifications')

db().then(() => {
  console.log('DB connection!~')
})



io.sockets.on('connection',socket => {
  console.log('User Connected', socket.id)

  socket.on('user entered App', async (id) => {
    console.log(11111111)
    console.log('ID', id)
    await Connect.create({
      socketId: socket.id,
      userId: id
    })
  })

  socket.on('user entered chat room', (data) => {
    const {id} = data
    socket.join(id)
    socket.broadcast.emit('enterSuccess', {text: `User entered to App ${id}`})
  })

  socket.on('createMessage', async (data) => {
    console.log('createMessage', data)
    const newData = await setMessage(data)
    io.to(newData.id).emit('message', newData)
  })

  socket.on('notifyFriendRequest', async (data) => {
    const payload = {
      currSocketId: socket.id,
      userId: data
    }
    const {socketID, userFrom} = await createFriendsNotification(payload)
    const a = io.sockets.sockets.get(socketID)
    io.to(a.id).emit(
      'newFriendNotification',
      {
        color: 'success',
        message: `User ${userFrom.fullName} want's to add you to Friends!`
      })
  })

  socket.on('notify other user', async (id) => {
    const socketTo = await Connect.findOne({userId: id})
    if(socketTo){
      const a = io.sockets.sockets.get(socketTo.socketId)
      io.to(a.id).emit('friendshipRequestAccepted', id)
    }
  })

  socket.on('disconnect', async () => {
    console.log(socket.id)
    const socketInDb = await Connect.findOne({socketId: socket.id})
    console.log(socketInDb)
    if(socketInDb){
      await Connect.deleteOne({socketId: socket.id})
      console.log('User Disconnected')
    } else {
      console.log('Socket not found')
    }
  })
})

export default {
  path: '/api',
  handler: server
}

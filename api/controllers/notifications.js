const User = require('../resources/user')
// const Chat = require('../resources/chat')
// const Message = require('../resources/message')
// const setResponse = require('../responces/setReponse')
const Connect = require("../resources/connect")

module.exports = {
  createFriendsNotification: async ({currSocketId, userId}) => {
    const socketFromId = await Connect.findOne({socketId: currSocketId})
    const currUser = await User.findOne({_id: socketFromId.userId})

    const socketTo = await Connect.findOne({userId: userId})
    const user = await User.findOne({_id: socketTo.userId})

    if(socketTo && user && user.online) {
      const {socketId} = socketTo
      return {
        socketID: socketId,
        userFrom: currUser
      }
    } else {
      console.log('Wrong ID or socket ID no found')
    }
  }
}

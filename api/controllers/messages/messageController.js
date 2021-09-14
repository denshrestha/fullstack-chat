const User = require('../../resources/user')
const Chat = require('../../resources/chat')
const Message = require('../../resources/message')
const setResponse = require('../../responces/setReponse')

async function createUsersChat(userID, friendID) {
  return  await Chat.create({
    peers: [userID,friendID]
  })
}

async function updateUsersChat(userID, friendID, chat) {
  await User.updateOne({_id: userID}, {conversations: chat})
  await User.updateOne({_id: friendID}, {conversations: chat})
}

module.exports = {
  setMessage: async ({text, time, from, to, chatId}) => {
    let fromUser = await User.findOne({_id: from})
    let toUser = await User.findOne({_id: to})
    let chat = await Chat.findOne({_id: chatId})
    let chatMessages = [...chat.message]

    const message = await Message.create({
      text: text,
      ChatID: chat.id,
      userID: fromUser.id,
      createdAt: time,
      updatedAt: time,
      isRead: false
    })
    chatMessages.push(message)
    await Chat.updateOne({_id: chatId}, {message: chatMessages})

    return await Chat.findOne({_id: chatId})
  },
  findChatHistory: async (req, res, next) => {
    const user = await User.findOne({_id: req.verifyedUser})
    let userChat = [...user.conversations]
    if(!userChat.length) {
      const newChat = await createUsersChat(req.verifyedUser, req.params.id)
      userChat.push(newChat._id)
      await updateUsersChat(req.verifyedUser, req.params.id, userChat)
      setResponse(res, newChat)
    } else {
      let conversationList = []
      for (let id of userChat){
        const chat = await Chat.findOne({_id: id})
        if(chat) {
          conversationList.push(chat)
        }
      }
      const neededChat = conversationList.filter((chat) => {
        return chat.peers.includes(req.verifyedUser) && chat.peers.includes(req.params.id)
      })
      setResponse(res, neededChat[0])
    }
  }
}

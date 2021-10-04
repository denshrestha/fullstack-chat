const User = require('../resources/user')
const Chat = require('../resources/chat')
const Message = require('../resources/message')
const setResponse = require('../responces/setReponse')

module.exports = {
  setMessage: async ({text, time, from, to, chatId}) => {
    const message = await Message.create({
      text: text,
      ChatID: chatId,
      owner: from,
      createdAt: time,
      updatedAt: time,
      isRead: false
    })
    message.to = to
    return message
  },
  findChatHistory: async (req, res, next) => {
    const {id} = req.params
    console.log(id)
    const chat = await Chat.findOne({_id: id})
    console.log(chat)
    if(chat) {
      console.log('chat found')
      const messages = await Message.find({ChatID: chat.id})
      const data = {
        messages: messages,
        peers: chat.peers,
        id: chat.id
      }
      console.log('messages', data)
      setResponse(res, {...data})
    }
  },
  findChatId: async (req, res, next) => {
    console.log(1)
    const {uId, fId} = req.params
    const chatID = await Chat.findOne({peers: {$all: [uId, fId]}})
    console.log(chatID)
    if(chatID){
      setResponse(res, chatID.id)
    }
  }
}
